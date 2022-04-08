import { ViewModel } from "vlserver";
import { Property } from "../managed/database";
import { PropertyTypeViewModel } from "./property-type.view";

export class PropertySummaryModel extends ViewModel<Property> {
    id;
    
    name;
    bounds;

    type: PropertyTypeViewModel;
}