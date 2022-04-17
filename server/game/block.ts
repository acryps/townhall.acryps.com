export class Block {
    x: number;
    y: number;
    z: number;

    type: string;

    toJSON(palette: string[]) {
        return [this.x, this.y, this.z, palette.indexOf(this.type)];
    }
}