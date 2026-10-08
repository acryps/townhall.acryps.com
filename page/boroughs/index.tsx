import { Component } from "@acryps/page";
import { Application } from "..";
import { BannerComponent } from "../banner";
import { Banner } from "../../interface/banner";
import { MapComponent } from "../shared/map";
import { Point } from "../../interface/point";
import { BoroughSummaryModel, BoroughViewModel, DistrictSummaryModel, MetricListValueViewModel, MetricService, MetricValueViewModel } from "../managed/services";

export class BoroughsPage extends Component {
	metrics: MetricListValueViewModel[];

	async onload() {
		this.metrics = await new MetricService().listBoroughMetrics();
	}

	render() {
		const districts: DistrictSummaryModel[] = [undefined];

		for (let borough of Application.boroughs) {
			if (borough.district) {
				if (!districts.find(peer => peer?.id == borough.district.id)) {
					districts.push(borough.district);
				}
			}
		}

		districts.sort((a, b) => a?.name.localeCompare(b?.name));

		return <ui-boroughs>
			<ui-districts>
				{districts.map(district => {
					const boroughs = Application.boroughs.filter(borough => borough.district?.id == district?.id);
					let rendered: HTMLElement;

					const element: HTMLElement = <ui-district>
						<ui-header ui-click={() => {
							if (!rendered) {
								rendered = this.renderBoroughs(boroughs);
							}

							element.toggleAttribute('ui-open');

							if (element.hasAttribute('ui-open')) {
								element.appendChild(rendered);
							} else {
								rendered.remove();
							}
						}}>
							<ui-name>
								{district?.name ?? 'Outside any'} Legal District
							</ui-name>

							<ui-detail>
								{boroughs.map(borough => borough.name).join(', ')}
							</ui-detail>
						</ui-header>
					</ui-district>;

					return element;
				})}
			</ui-districts>
		</ui-boroughs>
	}

	renderBoroughs(boroughs: BoroughSummaryModel[]) {
		const unrenderedPreviews = new Map<Element, BoroughSummaryModel>();

		const observer = new IntersectionObserver(watchers => {
			for (let watcher of watchers) {
				if (watcher.isIntersecting) {
					const borough = unrenderedPreviews.get(watcher.target);

					if (borough) {
						const boundary = Point.unpack(borough.activeBoundary.shape);

						const map = new MapComponent();
						map.highlight(boundary);
						map.host(watcher.target);
					}
				}
			}
		});

		return <ui-boroughs>
			{boroughs.map(borough => {
				const boundary = Point.unpack(borough.activeBoundary.shape);
				const center = Point.center(boundary);

				const preview = <ui-preview ui-href={`/map/${center.x}/${center.y}/5`}>
					{borough.banner && new BannerComponent(Banner.unpack(borough.banner))}
				</ui-preview>;

				unrenderedPreviews.set(preview, borough);
				requestAnimationFrame(() => observer.observe(preview));

				const renderMetricValue = (name: string, value: string) => <ui-metric>
					<ui-name>
						{name}
					</ui-name>

					<ui-value>
						{value}
					</ui-value>
				</ui-metric>;

				const readMetric = (tag: string) => {
					const value = this.metrics.find(value => value.metric.tag == `borough-${borough.tag}-${tag}`);

					if (!value) {
						return;
					}

					return value;
				}

				const renderMetric = (name: string, tag: string) => {
					const value = readMetric(tag);

					if (value) {
						return renderMetricValue(name, value.formatted);
					}
				};

				const area = Point.area(boundary);
				const allocatedArea = readMetric('allocated-area')?.value ?? 0;

				return <ui-borough>
					{preview}

					<ui-detail ui-href={`/borough/${borough.tag}`}>
						<ui-name>
							{borough.name}
						</ui-name>

						{borough.district && <ui-district>
							{borough.district.name}
						</ui-district>}

						<ui-metrics>
							{renderMetricValue('Area', `${area.toLocaleString()} b²`)}
							{renderMetricValue('Allocation', `${(100 / area * allocatedArea).toFixed(0)}%`)}
							{renderMetric('Residents', 'resident-count')}
							{renderMetric('Jobs', 'job-count')}
							{renderMetric('Job Capacity', 'job-capacity')}
						</ui-metrics>
					</ui-detail>
				</ui-borough>;
			})}
		</ui-boroughs>;
	}
}
