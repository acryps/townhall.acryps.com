import { ViewModel } from "vlserver";
import { Property } from "../managed/database";
import { BoroughSummaryModel } from "./borough.summary";
import { PlayerViewModel } from "./player.view";

export class PropertyViewModel extends ViewModel<Property> {
    id;

    name;
    code;

    bounds;

    owner: PlayerViewModel;
    borough: BoroughSummaryModel;
}