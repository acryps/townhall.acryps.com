import { BoroughViewModel, MapService, PropertyViewModel } from "managed/services";
import { Component } from "node_modules/vldom/component";
import { Layer } from "./layer";
import { Point } from "./point";
import { PropertyComponent } from "./property.component";

export class MapComponent extends Component {
    map = {
        x: -2000,
        y: -2000,
        width: 4000,
        height: 4000,

        center: new Point(35, 184)
    };

    layers: Layer[] = [];

    zoom = 8;
    lastRenderedZoom = 8;

    center: { x, y };

    image: HTMLImageElement;
    mapInner: HTMLElement;
    locationTracker: HTMLElement;

    selectedPoints: Point[] = [];

    showBoroughs = false;
    showProperties = true;

    constructor() {
        super();

        this.center = {
            x: this.map.width / 2,
            y: this.map.width / 2
        }
    }

    async onload() {
        this.layers = [];

        if (this.showBoroughs) {
            for (let borough of await new MapService().getBoroughs()) {
                if (borough.bounds) {
                    this.layers.push(
                        new Layer(borough.id, Point.unpack(borough.bounds), borough.color, borough.color, 1, 0.3)
                    );
                }
            }
        }

        if (this.showProperties) {
            for (let property of await new MapService().getProperties()) {
                if (property.bounds) {
                    this.layers.push(
                        new Layer(property.id, Point.unpack(property.bounds), property.owner ? "#fff" : "#0f0", "#000", 0.25, 0.8, () => {
                            this.navigate(`property/${property.id}`);
                        })
                    );
                }
            }
        }
    }

    async onchildchange() {
        requestAnimationFrame(() => {
            this.updateHighlight();
        });
    }

    render(child) {
        if (!this.mapInner) {
            this.mapInner = <ui-map-inner>
                <img id=".image" />
            </ui-map-inner>;
        }

        requestAnimationFrame(() => {
            this.image.onload = () => {
                this.updateZoom();

                for (let layer of this.layers) {
                    const svg = <svg id={layer.id} viewBox={`${this.map.x - 0.5} ${this.map.y - 0.5} ${this.map.width} ${this.map.height}`}>
                        <path stroke={layer.stroke} stroke-width={layer.strokeWidth} opacity={layer.opacity} fill={layer.color} d={`${layer.points.map((point, index) => `${index ? "L" : "M"}${point.x} ${point.y}`)} Z`}></path>
                    </svg>;

                    const proxy = <div></div>;
                    proxy.innerHTML = svg.outerHTML;

                    if (layer.clickAction) {
                        proxy.firstChild.firstChild.onclick = () => {
                            layer.clickAction();
                        };

                        proxy.firstChild.firstChild.setAttribute("ui-clickable", "");
                    }

                    this.mapInner.appendChild(proxy.firstChild);
                }

                const map = this.rootNode as HTMLElement;

                map.onmousemove = event => {
                    this.locationTracker.textContent = this.translate(event.x, event.y).toString();
                };

                document.body.onkeydown = event => {
                    if (event.key == " ") {
                        this.selectedPoints = []; 

                        event.preventDefault();
                    }
                }

                map.onmousedown = event => {
                    this.selectedPoints.push(this.translate(event.x, event.y));

                    console.log(Point.pack(this.selectedPoints));
                };

                requestAnimationFrame(() => {
                    this.focus(this.map.center);
                });
            }

            this.image.src = `/images/map?v${Math.random()}`;
        });

        return <ui-map>
            {this.mapInner}

            <ui-controls>
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
            </ui-controls>

            {child}

            <ui-location-tracker id=".locationTracker"></ui-location-tracker>
        </ui-map>;
    }

    updateZoom() {
        const rect = this.mapInner.getBoundingClientRect();
        const position = this.translate(rect.x + rect.width / 2, rect.y + rect.height / 2, this.lastRenderedZoom);

        this.image.width = this.map.width * this.zoom;

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

    focus(position: Point) {
        const rect = this.mapInner.getBoundingClientRect();

        this.mapInner.scrollTo(
            (position.x - this.map.x) * this.zoom - rect.width / 2,
            (position.y - this.map.y) * this.zoom - rect.height / 2
        );
    }

    translate(x, y, zoom = this.zoom) {
        const rect = this.mapInner.getBoundingClientRect();

        return new Point(
            Math.floor(this.map.width / (this.map.width * zoom) * (x - rect.left + this.mapInner.scrollLeft) + this.map.x),
            Math.floor(this.map.height / (this.map.height * zoom) * (y - rect.top + this.mapInner.scrollTop) + this.map.y)
        );
    }
}