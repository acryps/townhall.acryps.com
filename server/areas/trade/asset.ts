import { ViewModel } from "vlserver";

export class Asset {
	id: string;
	name: string;
	value: number;
}

export class AssetViewModel extends ViewModel<Asset> {
	id;
	name;
	value;
}
