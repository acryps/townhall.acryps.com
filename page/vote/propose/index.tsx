import { Component } from "@acryps/page";
import { DistrictViewModel, VoteService } from "../../managed/services";
import { child } from "@acryps/style";

export class ProposeBillPage extends Component {
	title = localStorage.getItem('bill-title') ?? '';
	description = localStorage.getItem('bill-description') ?? '';

	scope: DistrictViewModel;
	scopes: DistrictViewModel[];

	async onload() {
		this.scopes = await new VoteService().getScopes();
		this.scope = this.scopes.find(scope => scope.id == localStorage.getItem('bill-scope')) ?? this.scopes[0];
	}

	render() {
		return <ui-propose-bill>
			<ui-field>
				<label>
					Title
				</label>

				<input
					$ui-value={this.title}
					ui-change={() => localStorage.setItem('bill-title', this.title)}
				/>
			</ui-field>

			<ui-field>
				<label>
					Proposal
				</label>

				<textarea
					$ui-value={this.description}
					ui-change={() => localStorage.setItem('bill-description', this.description)}
					rows="20"
				/>
			</ui-field>

			<ui-field>
				<label>
					Scope
				</label>

				<select $ui-value={this.scope} ui-change={() => localStorage.setItem('bill-scope', this.scope.id)}>
					{this.scopes.filter(scope => !scope.parentId).map(root => this.renderScopeOption(root))}
				</select>
			</ui-field>

			<ui-process>
				Anyone can propose a bill, this is direct democracy!
				After a bill has been proposed, the team at law house will collect 3 pro and 3 contra questions, which the commitee must answer honestly.
				When all "Honestium" questions are answered, the voters of the bills scope district will have to cast their vote, this might take some time.
				When all votes are cast, the election result will be certified by law house.
				If passed, the team at law house will write a legal representation of the bill, which is then added to passed law.

				Beware, law house goes into session every four hours round day. They only work when they are in session.
			</ui-process>

			<ui-actions>
				<ui-action ui-click={async () => {
					await new VoteService().propse(this.title, this.description, this.scope.id);

					this.navigate('..');
				}}>
					Submit
				</ui-action>
			</ui-actions>
		</ui-propose-bill>;
	}

	renderScopeOption(scope: DistrictViewModel, level = 0) {
		const option = <option ui-value={scope}>
			{' '.repeat(level * 4)}{scope.name}
		</option>;

		const children = this.scopes.filter(child => child.parentId == scope.id);

		if (children.length) {
			return [
				option,
				...children.map(child => this.renderScopeOption(child, level + 1))
			];
		}

		return [option];
	}
}
