import { Point } from "../point";

export class Map {
    constructor(
        public size: number,
        public offset: Point,
        public center: Point
    ) {}
}