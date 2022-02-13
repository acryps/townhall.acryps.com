export class Point {
    constructor(
        public x,
        public y
    ) {}

    toString() {
        return `(${this.x}, ${this.y})`;
    }

    static unpack(source: string) {
        return source.split(";").map(source => new Point(+source.split(",")[0], +source.split(",")[1]))
    }

    static pack(points: Point[]) {
        return points.map(point => `${point.x},${point.y}`).join(";");
    }
}