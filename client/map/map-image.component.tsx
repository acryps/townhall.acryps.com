import { Component } from "node_modules/vldom/component"
import { blocks } from "./blocks";
import { MapComponent } from "./map.component"

export class MapImageComponent extends Component {
    parent: MapComponent;

    source: string;

    size = 16;
    preload = 1;

    perspective = 2;

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

    loadTile(tx: number, ty: number) {
        const source = this.source;

        if (this.tiles[[tx, ty].join()]) {
            return;
        }

        const x = tx + this.parent.map.offset.x / 16;
        const y = ty + this.parent.map.offset.y / 16;

        console.log('->', tx, ty, x, y);

        return this.tiles[[tx, ty].join()] = fetch(`/chunk/${x}.${y}`).then(res => res.json()).then(async chunk => {
            if (!chunk) {
                return;
            }

            const length = chunk.blocks.length;

            for (let i = 0; i < length; i++) {
                const block = chunk.blocks[length - i - 1];
                const type = chunk.palette[block[3]];

                const color = [...(blocks[type] || [0xff, 0, 0xff, 0xff])];

                this.context.fillStyle = `rgba(${Math.min(color[0], 0xff)}, ${Math.min(color[1], 0xff)}, ${Math.min(color[2], 0xff)}, ${Math.min(color[3], 0xff) / 0xff})`;

                const bx = block[0] + x * 16;
                const by = block[1] + y * 16;
                const bz = block[2];

                const mx = bx - by;
                const my = (bx + by) / this.perspective - bz;

                this.context.fillRect(mx - this.parent.map.offset.x, my - this.parent.map.offset.x, 1, 1);

                if (i == 0) {
                    console.log(x, y, mx, my)
                }

                if (i % 0xff == 0) {
                    await new Promise(done => requestAnimationFrame(done));
                }
            }
        });
    }
}