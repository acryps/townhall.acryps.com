import { Life } from "..";
import { Time } from "../../../interface/time";
import { BillHonestium, Company, DbContext, District, LawHouseSession, Property, Resident, Vote } from "../../managed/database";
import { Language } from "../language";
import { LawHouseSessionManager } from "./session";

export class LawHouse {
	active = false;

	interval = 4 * 60 * 60 * 1000;

	constructor(
		private database: DbContext,
		private language: Language,
		private life: Life
	) { }

	schedule() {
		const next = async () => {
			const hour = new Date().getHours();

			// sessions can only take place in the work day
			if (hour >= 8 && hour <= 18) {
				this.active = true;

				for (let district of await this.database.district.toArray()) {
					const lastSession = await district.lawHouseSessions.orderByDescending(session => session.started).first();

					if (!lastSession || +new Date() - +lastSession.ended > this.interval) {
						await new LawHouseSessionManager(this.database, this.language, this.life, district, this).execute();
					}
				}

				this.active = false;
			}

			// check every minute
			setTimeout(() => {
				next();
			}, 1000 * 60);
		};

		// check for the first time within the first 30 minutes from launch
		// prevents multiple instances from messing with eachother
		setTimeout(async () => {
			await this.completeOpen();

			next();
		}, 1000 * 30 * Math.random());
	}

	async completeOpen() {
		const openSessions = await this.database.lawHouseSession
			.where(session => session.ended == null)
			.orderByAscending(session => session.started)
			.toArray();

		for (let session of openSessions) {
			await new LawHouseSessionManager(this.database, this.language, this.life, await session.scope.fetch(), this).resume(session);
		}
	}

	// only people who are responsible in a legal sense
	// no children
	async collectLegallyCompetentResidents(district: District) {
		return (await this.collectResidents(district))
			.filter(resident => new Time(resident.birthday).age() > 18)
	}

	private async collectResidents(district: District) {
		// find people who need to vote on this bill
		const boroughs = await this.collectBoroughs(district);

		// find residents
		const residents: Resident[] = [];

		for (let borough of boroughs) {
			for (let resident of await this.database.resident
				.where(resident => resident.mainTenancy.dwelling.property.boroughId == borough.id)
				.include(resident => resident.votes)
				.toArray()
			) {
				residents.push(resident);
			}
		}

		return residents;
	}

	async collectCompanies(district: District) {
		// find people who need to vote on this bill
		const boroughs = await this.collectBoroughs(district);

		// find residents
		const companies: Company[] = [];

		for (let borough of boroughs) {
			for (let property of await borough.properties.toArray()) {
				for (let office of await property.offices.toArray()) {
					const company = await office.company.fetch();

					if (!companies.some(existing => existing.id == company.id)) {
						companies.push(company);
					}
				}
			}
		}

		return companies;
	}

	private async collectBoroughs(district: District) {
		const boroughs = await district.boroughs.toArray();

		for (let child of await district.children.toArray()) {
			boroughs.push(...await this.collectBoroughs(child));
		}

		return boroughs;
	}
}
