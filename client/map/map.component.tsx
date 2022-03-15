import { Application } from "main";
import { HistoryEntryViewModel, MapService, PropertyViewModel } from "managed/services";
import { Component } from "node_modules/vldom/component";
import { Label } from "./label";
import { Layer } from "./layer";
import { Map } from "./map";
import { MapImageComponent } from "./map-image.component";
import { Point } from "./point";

export class MapComponent extends Component {
    onScroll: (() => void)[] = [];
    onZoom: (() => void)[] = [];

    params: { x, y, zoom };
    rootNode: HTMLElement;

    image: MapImageComponent;
    layerImages: SVGElement[] = [];
    mapInner: HTMLElement;
    locationTracker: HTMLElement;
    cursor: HTMLElement;

    map = new Map(4000, new Point(-2000, -2000), new Point(0, 0));

    loading = {
        layers: true
    };

    layers: Layer[] = [];
    labels: Label[] = [];

    lastRenderedZoom = 8;

    mapStyle: 'normal' | 'gray' | 'hidden' = 'normal';
    showBoroughs = false;
    showProperties = false;
    showStreets = true;

    draw: Layer;
    labelContainer: Layer;

    selectedHistoryEntry: HistoryEntryViewModel;
    history: HistoryEntryViewModel[];

    constructor() {
        super();

        this.labelContainer = new Layer('.', [], '#fff', '#0000', false, 0, 1);
        this.labelContainer.render(this.map);
        this.labelContainer.svg.setAttributeNS(null, 'ui-labels', '');
    }

    async onload() {
        this.history = await new MapService().getHistory();
        
        for (let layer of this.layers) {
            layer.svg?.remove();
        }

        for (let label of this.labels) {
            label.element?.remove();
        }

        this.layers = [];
        this.labels = [];

        if (this.draw) {
            this.layers.push(this.draw);
        }

        this.loading.layers = true;

        if (this.mapInner) {
            this.mapInner.onscroll = null;
        }

        requestAnimationFrame(async () => {
            if (this.showBoroughs) {
                for (let borough of await new MapService().getBoroughs()) {
                    if (borough.bounds) {
                        this.layers.push(new Layer(borough.id, Point.unpack(borough.bounds), `${borough.color}30`, borough.color, true, 0.5, 1));
                    }
                }
            }

            if (this.showStreets) {
                for (let street of await new MapService().getStreets()) {
                    const points = Point.unpack(street.path);
                    const layer = new Layer(street.id, points, '#0000', `#eee`, false, street.size - 0.5, 1);

                    for (let i = 1; i < points.length; i++) {
                        const first = points[i - 1];
                        const last = points[i];

                        const length = Math.sqrt((first.x - last.x) ** 2 + (first.y - last.y) ** 2);
                        const step = 30;

                        for (let d = (length % step) * 0.5; d < length; d += step) {
                            const label = this.addLabel(
                                street.name,
                                new Point(first.x + (last.x - first.x) * (1 / length * d), first.y + (last.y - first.y) * (1 / length * d)),
                                street.size * 0.5, 
                                Math.atan2(first.y - last.y, first.x - last.x), 
                            );

                            label.maxSize = {
                                x: Math.abs(first.x - last.x) || Infinity,
                                y: Math.abs(first.y - last.y) || Infinity
                            };
                        }
                    }

                    this.layers.push(layer);
                }
            }

            if (this.showProperties) {
                for (let property of await new MapService().getProperties()) {
                    if (property.bounds) {
                        const points = Point.unpack(property.bounds);
                        
                        this.layers.push(new Layer(property.id, points, property.owner ? "#fff" : "#0f0", "#000", true, 0.75, 0.8, () => {
                            this.navigate(`property/${property.id}`);
                        }));

                        this.addLabel(property.borough ? `${property.borough.propertyPrefix}${property.code}` : `#${property.id.substring(0, 3)}`, Point.center(points), 1, 0);
                    }
                }
            }

            this.loading.layers = false;
            this.update();
        });
    }

    render(child) {
        if (this.loading.layers) {
            return <ui-loading>
                <ui-spinner></ui-spinner>
            </ui-loading>;
        }

        if (!this.mapInner) {
            this.mapInner = <ui-map-inner>
                {this.image = new MapImageComponent()}

                {this.cursor = <ui-cursor></ui-cursor>}
            </ui-map-inner>;

            this.updateMapImage();

            this.mapInner.appendChild(this.labelContainer.svg);
        }

        requestAnimationFrame(() => {
            this.updateZoom();

            for (let layer of this.layers) {
                this.mapInner.insertBefore(layer.render(this.map), this.labelContainer.svg);
            }

            for (let label of this.labels) {
                label.update();
            }

            const map = this.rootNode as HTMLElement;
            map.setAttribute('ui-style', this.mapStyle);

            map.onmousemove = event => {
                const position = this.translateMouse(event);
                this.locationTracker.textContent = position.toString();

                this.cursor.style.left = `${(position.x - this.map.offset.x) * this.zoom}px`;
                this.cursor.style.top = `${(position.y - this.map.offset.y) * this.zoom}px`;
            };

            map.onmousedown = event => {
                let parent = event.target as HTMLElement;

                while (parent = parent.parentElement) {
                    if (parent.tagName.toLowerCase() == 'ui-controls') {
                        return;
                    }
                }

                const point = this.translateMouse(event);

                if (this.draw) {
                    this.draw.points.push(point);

                    this.draw.update();
                }
            };

            requestAnimationFrame(() => {
                this.focus(new Point(this.x, this.y));

                this.mapInner.onscroll = () => {
                    const box = this.rootNode.getBoundingClientRect();
                    const point = this.translate(box.width / 2 + box.left, box.height / 2);
    
                    if (this.x != point.x) {
                        this.x = point.x;
                    }
    
                    if (this.y != point.y) {
                        this.y = point.y;
                    }
    
                    for (let listener of this.onScroll) {
                        listener();
                    }
                };
            });
        });

        return <ui-map>
            {this.mapInner}

            <ui-controls>
                <ui-control ui-click={() => {
                    this.focus(Application.center);
                }}>C</ui-control>

                <ui-control ui-click={() => {
                    this.zoom++;

                    this.updateZoom();
                }}>+</ui-control>

                <ui-control ui-click={() => {
                    this.zoom = Math.max(1, this.zoom - 1);

                    this.updateZoom();
                }}>-</ui-control>

                <ui-control>
                    M

                    <ui-control-extend>
                        <ui-control ui-click={() => {
                            this.mapStyle = 'normal';

                            this.reload();
                        }}>
                            CO
                        </ui-control>

                        <ui-control ui-click={() => {
                            this.mapStyle = 'gray';

                            this.reload();
                        }}>
                            BW
                        </ui-control>

                        <ui-control ui-click={() => {
                            this.mapStyle = 'hidden';

                            this.reload();
                        }}>
                            ✗
                        </ui-control>
                    </ui-control-extend>
                </ui-control>

                <ui-control ui-click={() => {
                    this.showStreets = !this.showStreets;

                    this.reload();
                }}>S{this.showStreets ? "✓" : "✗"}</ui-control>

                <ui-control ui-click={() => {
                    this.showBoroughs = !this.showBoroughs;

                    this.reload();
                }}>B{this.showBoroughs ? "✓" : "✗"}</ui-control>

                <ui-control ui-click={() => {
                    this.showProperties = !this.showProperties;

                    this.reload();
                }}>P{this.showProperties ? "✓" : "✗"}</ui-control>


                <ui-control ui-active={this.draw ? '' : null} ui-click={() => {
                    if (this.draw) {
                        alert(Point.pack(this.draw.points));
                        console.log(Point.pack(this.draw.points));

                        this.draw = null;
                    } else {
                        this.draw = new Layer(null, [], '#fff', '#000', true, 1, 60, null);
                    }

                    this.reload();
                }}>DW</ui-control>

                {this.draw && <ui-control ui-click={() => {
                    const property = new PropertyViewModel();
                    property.bounds = Point.pack(this.draw.points);
                    
                    new MapService().createProperty(property).then(() => {
                        this.draw = new Layer(null, [], '#fff', '#000', true, 1, 60, null);

                        this.reload();
                    });
                }}>+P</ui-control>}
            </ui-controls>

            {child}

            <ui-location-tracker id=".locationTracker"></ui-location-tracker>
        </ui-map>;
    }

    updateZoom() {
        const rect = this.mapInner.getBoundingClientRect();
        const position = this.translate(rect.x + rect.width / 2, rect.y + rect.height / 2, this.lastRenderedZoom);

        this.cursor.style.setProperty('--size', `${this.zoom}px`);
        this.image.canvas.style.width = `${this.map.size * this.zoom}px`;

        this.focus(position);

        this.lastRenderedZoom = this.zoom;

        for (let listener of this.onZoom) {
            listener();
        }
    }

    updateHighlight() {
        if (this.child?.params.id) {
            for (let layer of this.mapInner.querySelectorAll("svg")) {
                if (layer.id == this.child?.params.id) {
                    layer.setAttribute("ui-active", "");
                } else {
                    layer.removeAttribute("ui-active");
                }
            }
        }
    }

    updateMapImage() {
        if (this.selectedHistoryEntry) {
            this.image.load(`/images/map/${this.selectedHistoryEntry.name}`);
        } else {
            this.image.load(`/images/map`);
        }
    }

    focus(position: Point) {
        const rect = this.mapInner.getBoundingClientRect();

        this.mapInner.scrollTo(
            (position.x - this.map.offset.x) * this.zoom - rect.width / 2,
            (position.y - this.map.offset.y) * this.zoom - rect.height / 2
        );
    }

    addLabel(content: string, position: Point, size = 2, rotation = 0) {
        const label = new Label(this, content, position, size, rotation);
        this.labelContainer.svg.appendChild(label.element);
        this.labels.push(label);

        label.update();

        return label;
    }

    translate(x, y, zoom = this.zoom) {
        const rect = this.mapInner.getBoundingClientRect();

        return new Point(
            Math.round(this.map.size / (this.map.size * zoom) * (x - rect.left + this.mapInner.scrollLeft) + this.map.offset.x),
            Math.round(this.map.size / (this.map.size * zoom) * (y - rect.top + this.mapInner.scrollTop) + this.map.offset.y)
        );
    }

    translateMouse(event: MouseEvent) {
        const source = this.translate(event.x, event.y);

        return new Point(source.x - 1, source.y - 1);
    }

    get x() {
        return +this.params.x;
    }

    set x(value) {
        this.updateParameters({ x: value });
    }

    get y() {
        return +this.params.y;
    }

    set y(value) {
        this.updateParameters({ y: value });
    }

    get zoom() {
        return +this.params.zoom;
    }

    set zoom(value) {
        this.updateParameters({ zoom: value });
    }
}