import { Component } from "@acryps/page";
import { CompanyOfficeService } from '../managed/services';

export class CompanyOfficeRegisterComponent extends Component {
	type: string;
	name: string;

	render() {
		return <ui-company-register>
			<ui-title>
				Register Company
			</ui-title>

			<ui-field>
				<label>Name</label>

				<input $ui-value={this.name}></input>
			</ui-field>

			<ui-field>
				<label>Type</label>

				<select $ui-value={this.type}>
					<option ui-value='company'>
						Private Company
					</option>

					<option ui-value='government-company'>
						Government Company (Govcom)
					</option>
				</select>
			</ui-field>

			<ui-button ui-danger-outline ui-click={async () => {
				if (confirm('delete property?')) {
					await new CompanyOfficeService().register(this.name, this.type);

					history.back();
				}
			}}>
				Register Company
			</ui-button>
		</ui-company-register>
	}
}