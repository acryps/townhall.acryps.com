const fetch = require('node-fetch');
const sharp = require('sharp');

export class TileSet {
    size = 250;

    loader?: Promise<void>;

    image: Buffer;
    
    cache = new Map<string, Buffer>();

    constructor(public source: string) {
        this.loader = fetch(source).then(res => res.buffer()).then(res => this.image = res);
    }

    async read(x: number, y: number) {
        await this.loader;

        if (this.cache[[x, y].join()]) {
            return this.cache[[x, y].join()];
        }

        try {
            // crop image
            const data = await sharp(this.image).extract({
                width: this.size,
                height: this.size,
                top: y * this.size,
                left: x * this.size
            }).toBuffer();

            setTimeout(() => {
                delete this.cache[[x, y].join()];
            }, 1000 * 60 * 5);

            return this.cache[[x, y].join()] = data;
        } catch {
            console.log('invalid tile', x, y);
        }
    }
}