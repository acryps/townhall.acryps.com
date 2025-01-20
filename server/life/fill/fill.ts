import { toSimulatedAge } from "../../../interface/time";
import { Life } from "../../../life";
import { Borough, DbContext, Dwelling, Property, Resident, ResidentRelationship, Tenancy } from "../../managed/database";
import { female, genders, male } from "../gender";
import { NameGenerator } from "../name";

export class FillLife {
	oldestPersonBirthday = +new Date('2021-06-01');
	youngestParentBirthday = +new Date('2024-01-01');
	now = +new Date();

	constructor(
		private life: Life,
		private database: DbContext
	) {}

	async fillEmptyDwellings() {
		for (let property of await this.database.property.include(property => property.borough).include(property => property.dwellings).toArray()) {
			const dwellings = await property.dwellings.toArray();
			const borough = await property.borough.fetch();

			for (let dwelling of dwellings) {
				if (await dwelling.tenants.count() == 0) {
					await this.fillDwelling(borough, dwelling);
				}
			}
		}
	}

	async fillDwelling(borough: Borough, dwelling: Dwelling) {
		const standing = Math.random();

		if (Math.random() > 0.2) {
			await this.createFamily(dwelling, borough, standing);
		} else {
			await this.createSinglePersonHome(dwelling, borough, standing);
		}
	}

	async createSinglePersonHome(dwelling: Dwelling, borough: Borough, standing: number) {
		const birthday = new Date(this.oldestPersonBirthday + Math.random() * (this.youngestParentBirthday - this.oldestPersonBirthday));
		const person = await this.life.spawn(borough, standing, birthday);

		const tenancy = new Tenancy();
		tenancy.inhabitant = person;
		tenancy.dwelling = dwelling;
		tenancy.start = birthday;

		await tenancy.create();

		person.mainTenancyId = tenancy.id;
		await person.update();
	}

	async createFamily(dwelling: Dwelling, borough: Borough, standing: number) {
		const fatherBirthday = new Date(this.oldestPersonBirthday + Math.random() * (this.youngestParentBirthday - this.oldestPersonBirthday));

		// usually younger, but not required
		const motherBirthday = new Date(
			+fatherBirthday + ((Math.random() * 15 - 2) / 20) * 365 * 24 * 60 * 60 * 1000
		);

		const father = await this.life.spawn(borough, standing, fatherBirthday, male);
		const mother = await this.life.spawn(borough, standing, motherBirthday, female);

		// bond parents
		const familyName = Math.random() > 0.8 ? mother.familyName : father.familyName;

		const relationship = new ResidentRelationship();
		relationship.initiator = father;
		relationship.peer = mother;
		relationship.purpose = 'Romantic'

		const family = [father, mother];

		const youngestParent = Math.max(+fatherBirthday, +motherBirthday);

		let birthday = new Date(
			youngestParent + ((Math.random() * 20 + 17) / 20) * 365 * 24 * 60 * 60 * 1000
		);

		relationship.connection = `${familyName} Family`;
		relationship.bonded = +birthday > this.now ? new Date(this.now) : birthday;

		await relationship.create();

		// create children
		while (Math.random() > 0.45 && +birthday < this.now) {
			const child = await this.life.merge(father, mother, familyName, birthday, borough);
			birthday = new Date(+birthday + ((Math.random() * 3 + 0.9) / 20) * 365 * 24 * 60 * 60 * 1000);

			console.log('next birthday', toSimulatedAge(birthday));

			family.push(child);
		}

		// move family into home
		const moveIn = new Date(this.now - ((Math.random() * 100) / 20) * 365 * 24 * 60 * 60 * 1000);

		for (let peer of family) {
			const tenancy = new Tenancy();
			tenancy.inhabitant = peer;
			tenancy.dwelling = dwelling;
			tenancy.start = new Date(Math.max(+peer.birthday, +moveIn));

			await tenancy.create();

			peer.mainTenancyId = tenancy.id;
			await peer.update();
		}
	}
}
