import { Proxy } from "../proxy";
import { Block } from "./block";

export class Chunk {
    x: number;
    y: number;

    blocks: Block[] = [];

    static async fetch(x: number, y: number) {
        const data = await Proxy.readChunk(x, y);

        if (!data) {
            return;
        } 
        
        const chunk = new Chunk();
        chunk.x = data.x;
        chunk.y = data.y;
        
        for (let blockData of data.blocks) {
            const block = new Block();
            block.x = blockData[0];
            block.y = blockData[1];
            block.z = blockData[2];
            block.type = blockData[3];

            chunk.blocks.push(block);
        }

        chunk.blocks = chunk.blocks.sort((a, b) => (b.z - a.z) * 0xffff || (a.x - b.x) * 0xff || (a.x - b.y));

        return chunk;
    }

    get surface(): Block[] {
        const surface = [];

        for (let y = 0; y < 16; y++) {
            for (let x = 0; x < 16; x++) {
                const block = this.blocks.find(block => block.x == x && block.y == y);

                if (block) {
                    surface.push(block);
                }
            }
        }

        return surface;
    }

    toJSON() {
        const palette = [];

        for (let block of this.blocks) {
            if (!palette.includes(block.type)) {
                palette.push(block.type);
            }
        }

        return {
            x: this.x,
            y: this.y,

            palette,
            blocks: this.blocks.map(block => block.toJSON(palette))
        };
    }
}