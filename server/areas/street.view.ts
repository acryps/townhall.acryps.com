import { ViewModel } from "vlserver";
import { Street } from "../managed/database";
import { BridgeViewModel } from "./bridge.view";

export class StreetViewModel extends ViewModel<Street> {
    id;

    name;
    shortName;

    path;
    size;

    bridges: BridgeViewModel[];
}