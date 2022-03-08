import { Application } from "main";
import { HistoryEntryViewModel, MapService } from "managed/services";
import { Component } from "node_modules/vldom/component";
import { Layer } from "./layer";
import { Map } from "./map";
import { MapImageComponent } from "./map-image.component";
import { Point } from "./point";

export class MapComponent extends Component {
    onScroll: (() => void)[] = [];

    params: { x, y, zoom };
    rootNode: HTMLElement;

    image: MapImageComponent;
    layerImages: SVGElement[] = [];
    mapInner: HTMLElement;
    locationTracker: HTMLElement;

    map = new Map(4000, new Point(-2000, -2000), new Point(0, 0));

    loading = {
        layers: true
    };

    layers: Layer[] = [];

    lastRenderedZoom = 8;

    showBoroughs = false;
    showProperties = false;

    draw: Layer;

    selectedHistoryEntry: HistoryEntryViewModel;
    history: HistoryEntryViewModel[];

    constructor() {
        super();
    }

    async onload() {
        this.history = await new MapService().getHistory();
        
        for (let layer of this.layers) {
            layer.svg?.remove();
        }

        this.layers = [];

        if (this.draw) {
            this.layers.push(this.draw);
        }

        this.loading.layers = true;

        requestAnimationFrame(async () => {
            if (this.showBoroughs) {
                for (let borough of await new MapService().getBoroughs()) {
                    if (borough.bounds) {
                        this.layers.push(
                            new Layer(borough.id, Point.unpack(borough.bounds), `${borough.color}80`, '#000', 0.5, 1)
                        );
                    }
                }
            }

            if (this.showProperties) {
                for (let property of await new MapService().getProperties()) {
                    if (property.bounds) {
                        this.layers.push(
                            new Layer(property.id, Point.unpack(property.bounds), property.owner ? "#fff" : "#0f0", "#000", 0.75, 0.8, () => {
                                this.navigate(`property/${property.id}`);
                            })
                        );
                    }
                }
            }

            this.loading.layers = false;
            this.update();
        });
    }

    render(child) {
        console.log('render', this.params, child);

        if (this.loading.layers) {
            return <ui-loading>
                <ui-spinner></ui-spinner>
            </ui-loading>;
        }

        if (!this.mapInner) {
            this.mapInner = <ui-map-inner>
                {this.image = new MapImageComponent()}
            </ui-map-inner>;

            this.updateMapImage();

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
        }

        requestAnimationFrame(() => {
            this.updateZoom();

            for (let layer of this.layers) {
                this.mapInner.appendChild(layer.render(this.map));
            }

            const map = this.rootNode as HTMLElement;

            map.onmousemove = event => {
                this.locationTracker.textContent = this.translate(event.x, event.y).toString();
            };

            map.onmousedown = event => {
                let parent = event.target as HTMLElement;

                while (parent = parent.parentElement) {
                    if (parent.tagName.toLowerCase() == 'ui-controls') {
                        return;
                    }
                }

                const point = this.translate(event.x, event.y);

                if (this.draw) {
                    this.draw.points.push(point);

                    this.draw.update();
                }
            };

            requestAnimationFrame(() => {
                this.focus(new Point(this.x, this.y));
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

                        this.draw = null;
                    } else {
                        this.draw = new Layer(null, [], '#ffffff', '#000000', 1, 60, null);
                    }

                    this.reload();
                }}>DW</ui-control>
            </ui-controls>

            {child}

            <ui-location-tracker id=".locationTracker"></ui-location-tracker>
        </ui-map>;
    }

    updateZoom() {
        const rect = this.mapInner.getBoundingClientRect();
        const position = this.translate(rect.x + rect.width / 2, rect.y + rect.height / 2, this.lastRenderedZoom);

        this.image.canvas.style.width = `${this.map.size * this.zoom}px`;

        this.focus(position);

        this.lastRenderedZoom = this.zoom;
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

    translate(x, y, zoom = this.zoom) {
        const rect = this.mapInner.getBoundingClientRect();

        return new Point(
            Math.round(this.map.size / (this.map.size * zoom) * (x - rect.left + this.mapInner.scrollLeft) + this.map.offset.x),
            Math.round(this.map.size / (this.map.size * zoom) * (y - rect.top + this.mapInner.scrollTop) + this.map.offset.y)
        );
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