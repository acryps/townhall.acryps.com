import { ViewModel } from "vlserver";
import { WaterBody } from "../managed/database";

export class WaterBodyViewModel extends ViewModel<WaterBody> {
    id;

    name;
    bounds;
    namePath;
}