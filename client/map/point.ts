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

    static center(points: Point[]) {
        let minX = Math.min(...points.map(point => point.x));
        let maxX = Math.max(...points.map(point => point.x));

        let minY = Math.min(...points.map(point => point.y));
        let maxY = Math.max(...points.map(point => point.y));
              
        return new Point(minX + (maxX - minX) * 0.5, minY + (maxY - minY) * 0.5);
    }
}