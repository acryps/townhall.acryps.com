import { Component } from "@acryps/page";
import { PropertyPage } from "..";
import { EmptyDwellingCandidateViewModel, PropertyService } from "../../../managed/services";
import { MapComponent } from "../../../shared/map";
import { Point } from "../../../../interface/point";
import { LegalEntityComponent } from "../../../shared/legal-entity";

export class RelocateDwellingPage extends Component {
	declare parent: PropertyPage;
	declare parameters: { dwellingId: string };

	candidates: EmptyDwellingCandidateViewModel[] = [];

	page = 0;
	loadingNextPage = false;
	relocating = false;

	async onload() {
		this.candidates = await new PropertyService().findNearestEmptyDwellings(this.parameters.dwellingId, this.page);
	}

	async loadNextPage() {
		if (this.loadingNextPage) {
			return;
		}

		this.loadingNextPage = true;
		this.page++;

		this.candidates.push(...await new PropertyService().findNearestEmptyDwellings(this.parameters.dwellingId, this.page));

		this.loadingNextPage = false;
		this.update();
	}

	async relocate(candidate: EmptyDwellingCandidateViewModel) {
		if (this.relocating) {
			return;
		}

		this.relocating = true;
		this.update();

		await new PropertyService().relocateTenancy(this.parameters.dwellingId, candidate.id);

		this.navigate(`/property/${this.parent.property.id}`);
	}

	render() {
		return <ui-relocate-dwelling>
			<ui-guide>
				Choose a vacant dwelling for the current tenants to move into. This ends their tenancy here and starts a new one there.
			</ui-guide>

			<ui-candidates>
				{this.candidates.map(candidate => <ui-candidate ui-disabled={this.relocating} ui-click={() => this.relocate(candidate)}>
					{new MapComponent().highlight(Point.unpack(candidate.property.activePlotBoundary.shape))}

					<ui-details>
						<ui-name>
							{candidate.property.name ?? `Property #${candidate.property.id.split('-')[0]}`}
						</ui-name>

						<ui-tagline>
							<ui-borough>
								{candidate.property.borough?.name}
							</ui-borough>

							<ui-type>
								{candidate.property.type?.name}
							</ui-type>
						</ui-tagline>

						<ui-distance>
							{Math.round(candidate.distance)}b away
						</ui-distance>

						<ui-owners>
							{candidate.owners.length ? candidate.owners.map(owner => new LegalEntityComponent(owner.owner)) : <ui-unowned>
								Unowned
							</ui-unowned>}
						</ui-owners>
					</ui-details>
				</ui-candidate>)}
			</ui-candidates>

			<ui-action ui-disabled={this.loadingNextPage} ui-click={() => this.loadNextPage()}>
				Load More
			</ui-action>
		</ui-relocate-dwelling>;
	}
}
