export class MarketCycleConfiguration {
	basePrivateDemandIterations = 5;
	innovatedPrivateDemandIterations = 2;

	demandSetSize = 20;
	demandReplicationSetSize = 10;

	demandReplicationPoolSize = 2000;
	demandReplicationSize = 100;

	innovationIterations = 2;

	stockSeedingIterations = 5;
	stockSeedingSize = 50;

	consumptionIterations = 7;

	liqudationIterations = 3;

	static load(serialized: string) {
		const object = JSON.parse(serialized ?? '{}');
		const defaults = new MarketCycleConfiguration();
		const configuration = new MarketCycleConfiguration();

		for (let key in defaults) {
			if (key in object && typeof object[key] == typeof defaults[key]) {
				configuration[key] = object[key];
			} else {
				configuration[key] = defaults[key];
			}
		}

		return configuration;
	}

	static save(configuration: MarketCycleConfiguration) {
		return JSON.stringify(configuration);
	}
}
