import { Application } from "main";
import { BoroughViewModel, HistoryEntryViewModel, MapService, PropertyViewModel } from "managed/services";
import { Component } from "node_modules/vldom/component";
import { MapLabel } from "./elements/label";
import { Layer } from "./layers/layer";
import { Map } from "./elements/map";
import { MapPolygon } from "./elements/polygon";
import { MapImageComponent } from "./map-image.component";
import { Point } from "./point";
import { DrawLayer } from "./layers/draw.layer";
import { BoroughLayer } from "./layers/borough.layer";
import { StreetLayer } from "./layers/street.layer";
import { PropertyLayer } from "./layers/property.layer";

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

    layers: Layer[] = [];
    draw: DrawLayer;

    lastRenderedZoom = 8;

    mapStyle: 'normal' | 'gray' | 'hidden' = 'normal';

    tube?: number;
    tubes: number[];

    selectedHistoryEntry: HistoryEntryViewModel;
    history: HistoryEntryViewModel[];

    async onload() {
        this.history = await new MapService().getHistory();
        this.tubes = await new MapService().getTubes();
    }

    update(child?: Node) {
        this.mapInner.onscroll = null;

        return super.update(child);
    }

    render(child) {
        if (!this.mapInner) {
            this.mapInner = <ui-map-inner>
                {this.image = new MapImageComponent()}

                {this.cursor = <ui-cursor></ui-cursor>}
            </ui-map-inner>;

            requestAnimationFrame(() => this.updateMapImage());
        }

        requestAnimationFrame(() => {
            this.updateZoom();

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

                if (this.draw) {
                    const point = this.translateMouse(event);
                    
                    this.draw.append(point);
                }
            };

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

                <ui-control ui-active={this.tube ? '' : null}>
                    XR

                    <ui-control-extend>
                        <ui-control ui-active={!this.tube ? '' : null} ui-click={() => {
                            delete this.tube;

                            this.update();
                            this.updateMapImage();
                        }}>
                            ✗
                        </ui-control>

                        {this.tubes.map(tube => <ui-control ui-active={this.tube == tube ? '' : null} ui-click={() => {
                            this.tube = tube;

                            this.update();
                            this.updateMapImage();
                        }}>
                            {tube}
                        </ui-control>)}
                    </ui-control-extend>
                </ui-control>

                <ui-control ui-active={this.findLayer(BoroughLayer) ? '' : null} ui-click={() => this.toggleLayer(new BoroughLayer(this.map))}>
                    B
                </ui-control>

                <ui-control ui-active={this.findLayer(StreetLayer) ? '' : null} ui-click={() => this.toggleLayer(new StreetLayer(this.map))}>
                    S
                </ui-control>

                <ui-control ui-active={this.findLayer(PropertyLayer) ? '' : null} ui-click={() => this.toggleLayer(new PropertyLayer(this.map))}>
                    P
                </ui-control>


                <ui-control ui-active={this.draw ? '' : null} ui-click={() => {
                    if (this.draw) {
                        console.log(Point.pack(this.draw.points));

                        this.removeLayer(this.draw);
                        this.draw = null;
                    } else {
                        this.draw = new DrawLayer(this.map);
                        this.addLayer(this.draw);
                    }

                    this.update();
                }}>DW</ui-control>

                {this.draw && this.findLayer(PropertyLayer) && <ui-control ui-click={() => {
                    if (this.draw.points.length >= 3) {
                        const property = new PropertyViewModel();
                        property.bounds = Point.pack(this.draw.points);

                        this.findLayer(PropertyLayer).add(new MapPolygon(this.draw.points, '#0f09', '#0f0', true, 1, 0.8));
                            
                        new MapService().createProperty(property).then(() => {
                            this.draw.reset();

                            this.reload();
                        });
                    }
                }}>+P</ui-control>}

                {this.draw && this.findLayer(BoroughLayer) && <ui-control ui-click={() => {
                    if (this.draw.points.length >= 3) {
                        const borough = new BoroughViewModel();
                        borough.name = prompt('Borough name');
                        borough.color = `#${Math.random().toString(16).substring(2, 4)}${Math.random().toString(16).substring(2, 4)}${Math.random().toString(16).substring(2, 4)}`;

                        if (borough.name) {
                            borough.bounds = Point.pack(this.draw.points);
                            
                            new MapService().createBorough(borough).then(() => {
                                this.draw.reset();

                                this.reload();
                            });
                        }
                    }
                }}>+B</ui-control>}
            </ui-controls>

            {child}

            {this.locationTracker = <ui-location-tracker></ui-location-tracker>}
        </ui-map>;
    }

    findLayer(layer: typeof Layer) {
        return this.layers.find(existing => existing.constructor == layer);
    }

    toggleLayer(layer: Layer) {
        const existing = this.findLayer(layer.constructor as typeof Layer);

        if (existing) {
            this.removeLayer(existing);
        } else {
            this.addLayer(layer);
        }

        this.update();
    }

    addLayer(layer: Layer) {
        this.layers = [...this.layers, layer].sort((a, b) => a.order - b.order);

        this.mapInner.appendChild(layer.container);

        layer.load().then(() => {
            layer.update();

            layer.resize(this.zoom);
        });
    }

    removeLayer(layer: Layer) {
        this.layers.splice(this.layers.indexOf(layer), 1);

        layer.container.remove();
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

        for (let layer of this.layers) {
            layer.resize(this.zoom);
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
        let source = '/images/map';

        if (this.selectedHistoryEntry) {
            source = `/images/map/${this.selectedHistoryEntry.name}`;
        }
        
        if (this.tube) {
            source = `/images/tube/${this.tube}`;
        }
            
        this.image.load(source);
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