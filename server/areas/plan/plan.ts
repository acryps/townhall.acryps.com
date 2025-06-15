import { ViewModel } from "vlserver";
import { Plan, PlanShape } from "../../managed/database";
import { LegalEntityViewModel } from "../legal-entity";

export class PlanSummaryModel extends ViewModel<Plan> {
	id;
	tag;

	author: LegalEntityViewModel;

	name;
}

export class PlanViewModel extends PlanSummaryModel {
	description;

	shapes: PlanShapeViewModel[];
}

export class PlanShapeViewModel extends ViewModel<PlanShape> {
	id;

	path;
	closed;
	stroke;
	fill;

	label;
}
