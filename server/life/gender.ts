// not very modern...
export class Gender {
	constructor(
		public name: string,
		public pronoun: string
	) { }
}

export const female = new Gender('female', 'she');
export const male = new Gender('male', 'he');

export const genders = [female, male];
