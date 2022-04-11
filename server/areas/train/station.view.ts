import { ViewModel } from "vlserver";
import { TrainStation, TrainStop } from "../../managed/database";

export class TrainStationViewModel extends ViewModel<TrainStation> {
    id;
    name;
    position;
}