import { Point } from "./point";

export class Layer {
    constructor(
        public id: string,
        public points: Point[], 
        public color: string,
        public stroke: string,
        public strokeWidth: number,
        public opacity: number,
        public clickAction?: Function
    ) {}
}