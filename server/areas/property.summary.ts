import { ViewModel } from "vlserver";
import { Property } from "../managed/database";

export class PropertySummaryModel extends ViewModel<Property> {
    id;
    
    name;
    bounds;
}