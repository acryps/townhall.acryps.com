import { Component } from "node_modules/vldom/component"
import { MapComponent } from "./map.component"

export class MapImageComponent extends Component {
    parent: MapComponent;

    source: string;

    size = 250;
    preload = 1;

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    tiles = new Map<string, Promise<void>>();

    render() {
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.width = this.parent.map.size;
            this.canvas.height = this.parent.map.size;

            this.context = this.canvas.getContext('2d');
            this.context.fillStyle = '#eee';

            for (let y = 0; y < this.parent.map.size / this.size; y++) {
                for (let x = 0; x < this.parent.map.size / this.size; x++) {
                    if ((x + y) % 2) {
                        this.context.rect(x * this.size, y * this.size, this.size, this.size);
                    }
                }
            }

            this.context.fill();
        }

        this.parent.onScroll.push(() => {
            this.loadMissingTiles();
        });

        return this.canvas;
    }

    load(source: string) {
        this.source = source;

        if (this.context) {
            const border = 2;

            this.context.beginPath();
            this.context.strokeStyle = '#fff';
            this.context.lineWidth = border;

            for (let key in this.tiles) {
                const [ x, y ] = key.split(',');

                this.context.rect(+x * this.size + border, +y * this.size + border, this.size - border * 2, this.size - border * 2);
            }

            this.context.stroke();
        }

        this.tiles = new Map<string, Promise<void>>();
        this.loadMissingTiles();
    }

    async loadMissingTiles() {
        const box = this.parent.rootNode.getBoundingClientRect();

        const left = ((this.parent.x - this.parent.map.offset.x - box.width / 2 / this.parent.zoom) / this.size) - this.preload;
        const top = ((this.parent.y - this.parent.map.offset.y - box.height / 2 / this.parent.zoom) / this.size) - this.preload;

        const x = ((this.parent.x - this.parent.map.offset.x) / this.size) - this.preload;
        const y = ((this.parent.y - this.parent.map.offset.y) / this.size) - this.preload;        

        const tiles = this.findMissingTiles(Math.max(left, 0), Math.max(top, 0), true, true);
        let unique: { x, y, distance }[] = [];

        for (let tile of tiles) {
            let exists = false;

            for (let existing of unique) {
                if (existing.x == tile.x && existing.y == tile.y) {
                    exists = true;
                }
            }

            if (!exists) {
                unique.push({
                    ...tile,
                    distance: Math.sqrt((x - tile.x) ** 2 + (y - tile.y) ** 2)
                });
            }
        }

        unique = unique.sort((a, b) => a.distance - b.distance);

        for (let tile of unique) {
            await this.loadTile(tile.x, tile.y);
        }
    }

    findMissingTiles(x: number, y: number, moveX: boolean, moveY: boolean) {
        if (x < 0 || y < 0 || x > this.parent.map.size / this.size || y > this.parent.map.size / this.size) {
            return [];
        }

        const box = this.parent.rootNode.getBoundingClientRect();

        // left
        if (x + this.preload + 1 < (this.parent.x - this.parent.map.offset.x - box.width / 2 / this.parent.zoom) / this.size) {
            return [];
        }

        // right
        if (x - this.preload - 1 > (this.parent.x - this.parent.map.offset.x + box.width / 2 / this.parent.zoom) / this.size) {
            return [];
        }
        
        // top
        if (y + this.preload + 1 < (this.parent.y - this.parent.map.offset.y - box.height / 2 / this.parent.zoom) / this.size) {
            return [];
        }

        // bottom
        if (y - this.preload - 1 > (this.parent.y - this.parent.map.offset.y + box.height / 2 / this.parent.zoom) / this.size) {
            return [];
        }

        const tiles = [{ 
            x: Math.round(x), 
            y: Math.round(y)
        }];

        if (moveX) {
            tiles.push(...this.findMissingTiles(x + 1, y, true, false));
        }

        if (moveY) {
            tiles.push(...this.findMissingTiles(x, y + 1, false, true));
        }

        if (moveX && moveY) {
            tiles.push(...this.findMissingTiles(x + 1, y + 1, true, true));
        }

        return tiles;
    }

    loadTile(x: number, y: number) {
        const source = this.source;

        if (this.tiles[[x, y].join()]) {
            return;
        }

        return this.tiles[[x, y].join()] = fetch(`${this.source}/${x}/${y}`).then(res => res.blob()).then(res => {
            if (source == this.source) {
                const image = new Image();

                image.onload = () => {
                    if (source == this.source) {
                        this.context.drawImage(image, x * this.size, y * this.size);
                    }
                };

                image.src = URL.createObjectURL(res);
            }
        });
    }
}