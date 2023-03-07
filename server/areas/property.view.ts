import { ViewModel } from "vlserver";
import { Property } from "../managed/database";
import { BoroughSummaryModel } from "./borough.summary";
import { HistoricListingGradeViewModel } from "./history-listing/grade.view";
import { PropertyHistoricListingModifierViewModel } from "./history-listing/link.view";
import { PlayerViewModel } from "./player.view";
import { PropertyTypeViewModel } from "./property-type.view";

export class PropertyViewModel extends ViewModel<Property> {
    id;

    name;
    code;

    bounds;

    historicListingRegisteredAt;
    historicListingGrade: HistoricListingGradeViewModel;
    historicListingModifiers: PropertyHistoricListingModifierViewModel[];

    owner: PlayerViewModel;
    borough: BoroughSummaryModel;
    type: PropertyTypeViewModel;
}