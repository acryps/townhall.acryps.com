import { ViewModel } from "vlserver";
import { Street } from "../managed/database";

export class StreetViewModel extends ViewModel<Street> {
    id;

    name;
    shortName;

    path;
    size;
}