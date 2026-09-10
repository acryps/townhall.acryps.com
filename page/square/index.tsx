import { Component } from "@acryps/page";
import { SquareBoundarySummaryModel, SquareService, SquareViewModel } from "../managed/services";
import { MapComponent } from "../shared/map";
import { streetLayer } from "../shared/map/layers";
import { Point } from "../../interface/point";
import { BoundaryComponent } from "../properties/property/boundary";
import { deleteIcon, drawIcon } from "../assets/icons/managed";

export class SquarePage extends Component {
	declare parameters: { tag };

	square: SquareViewModel;
	currentBoundary: SquareBoundarySummaryModel;

	async onload() {
		this.square = await new SquareService().getSquare(this.parameters.tag);
		this.currentBoundary = this.square.boundaries.find(boundary => boundary.id == this.square.activeBoundaryId);
	}

	render(child) {
		const shape = Point.unpack(this.currentBoundary.shape);
		const center = Point.center(shape).floor();

		const map = new MapComponent();
		map.layers.push(streetLayer);
		map.highlight(shape);

		return <ui-square>
			<ui-field>
				<input
					placeholder='Name'
					$ui-value={this.square.name}
					ui-change={() => new SquareService().rename(this.square.id, this.square.name)}
				/>
			</ui-field>

			{child ?? <ui-content>
				{map}

				<ui-boundaries>
					<ui-hint>
						The squares boundary defines the general area of the square.
						The plot will automatically be generated based on the boundary, minus any properties already placed inside it - shown filled in on the map above.
						Squares take priority over streets and water bodies.
					</ui-hint>

					{this.square.boundaries.map((boundary, index) => <ui-boundary ui-active={boundary.id == this.currentBoundary.id}>
						<ui-name>
							{boundary.changeComment ?? `Boundary #${boundary.id.split('-')[0]}`}
						</ui-name>

						{new BoundaryComponent(boundary.shape, this.square.boundaries[index - 1]?.shape)}
					</ui-boundary>)}

					<ui-action ui-href={`/map/${center.x}/${center.y}/5/edit-square-boundary/${this.square.tag}`}>
						{drawIcon()} Edit Boundary
					</ui-action>
				</ui-boundaries>

				<ui-actions>
					<ui-action ui-click={async () => {
						await new SquareService().archive(this.square.id);

						history.back();
					}}>
						{deleteIcon()} Archive Square
					</ui-action>
				</ui-actions>
			</ui-content>}
		</ui-square>
	}
}
