import { Point } from "../point";

export class Map {
    constructor(
        public size: number,
        public offset: Point,
        public center: Point
    ) {}
}

export const world = new Map(4000, new Point(-2000, -2000), new Point(0, 0));