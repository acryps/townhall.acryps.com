import { ViewModel } from "vlserver";
import { PropertyType } from "../managed/database";

export class PropertyTypeViewModel extends ViewModel<PropertyType> {
    id;

    name;
    code;
    
    color;
}