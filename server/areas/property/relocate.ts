import { ViewModel } from "vlserver";
import { Dwelling, Property, PropertyOwner } from "../../managed/database";
import { PropertySummaryModel } from "../property.summary";
import { PropertyOwnerViewModel } from "../property.view";

export class EmptyDwellingCandidateModel {
	id: string;
	distance: number;

	property: PropertySummaryModel;
	owners: PropertyOwnerViewModel[];

	static async from(dwelling: Dwelling, distance: number, property: Property, owners: PropertyOwner[]) {
		const model = new EmptyDwellingCandidateModel();
		model.id = dwelling.id;
		model.distance = distance;
		model.property = new PropertySummaryModel(property);
		model.owners = await PropertyOwnerViewModel.from(owners) as PropertyOwnerViewModel[];

		return model;
	}
}

export class EmptyDwellingCandidateViewModel extends ViewModel<EmptyDwellingCandidateModel> {
	id;
	distance;

	property: PropertySummaryModel;
	owners: PropertyOwnerViewModel[];
}
