export interface MapElement {
    append(element: SVGElement);
    update();
    
    resize?(zoom: number);
}