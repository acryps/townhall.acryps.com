import { ViewModel } from "vlserver";
import { TrainStationExit, TrainStop } from "../../managed/database";
import { TrainStationViewModel } from "./station.view";

export class TrainStationExitViewModel extends ViewModel<TrainStationExit> {
    id;
    
    inbound;
    position;

    station: TrainStationViewModel;
}