import { Component } from "@acryps/page";
import { BannerComponent } from ".";
import { deleteIcon } from "../assets/icons/managed";

export class CreateBannerComponent extends Component {
	declare parameters: { code };

	async onload() {
		if (!this.parameters.code) {
			this.navigate(BannerComponent.emptyBanner.pack());
		}
	}

	render() {
		const banner = BannerComponent.unpack(this.parameters.code);

		return <ui-create-banner>
			{banner}

			<ui-field>
				<ui-label>
					Base Color
				</ui-label>

				<select $ui-value={banner.baseColor} ui-change={() => this.save(banner)}>
					{Object.keys(BannerComponent.colors).map(color => <option ui-value={color}>
						{color}
					</option>)}
				</select>
			</ui-field>

			<ui-layers>
				{banner.layers.map((layer, index) => <ui-layer>
					{this.preview(layer.offset)}

					<select $ui-value={layer.color} ui-change={() => this.save(banner)}>
						{Object.keys(BannerComponent.colors).map(color => <option ui-value={color}>
							{color}
						</option>)}
					</select>

					<ui-actions>
						<ui-action ui-delete ui-click={() => {
							banner.layers.splice(index, 1);
							this.save(banner);
						}}>
							{deleteIcon()}
						</ui-action>
					</ui-actions>
				</ui-layer>)}

				{banner.layers.length < BannerComponent.maxLayerCount && <ui-create>
					{banner.layerTypes.map(type => <ui-type ui-click={() => {
						type.add(Object.keys(BannerComponent.colors)[banner.layers.length + 1]);

						this.save(banner);
					}}>
						{this.preview(type.offset)}
					</ui-type>)}
				</ui-create>}
			</ui-layers>
		</ui-create-banner>;
	}

	preview(offset: number) {
		const banner = new BannerComponent('white');
		banner.layers.push({ offset, color: 'black' });

		return banner;
	}

	save(banner: BannerComponent) {
		this.parameters.code = banner.pack();
		this.update();
	}
}
