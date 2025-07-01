import { Time } from "../../../interface/time";
import { Company, Office, WorkOffer } from "../../managed/database";
import { Interpreter, SystemMessage, UserMessage } from "../interpreter";

export const adjustRoleList = async (office: Office, roles: WorkOffer[], target: number) => {
	if (target == sumRoleCount(roles)) {
		return {
			roles,
			changed: false,

			addedRoles: [],
			resizedRoles: [],
			removedRoles: []
		};
	}

	const company = await office.company.fetch();

	const addedRoles: WorkOffer[] = [];
	let resizedRoles: WorkOffer[] = [];
	const removedRoles: WorkOffer[] = [];

	const interpreter = new Interpreter('smart');

	const minimumRoleCount = Math.min(Math.ceil(target / 25 + 2.5), target);

	interpreter.addTool('add', [
		{ name: 'name', type: String },
		{ name: 'count', type: Number }
	], (name: string, count: number) => {
		name = cleanName(name);
		count = randomizeDelta(count);

		console.log('+', name, count);

		let role = roles.find(role => role.title == name);

		if (role) {
			role.count += count;
		} else {
			role = new WorkOffer();
			role.count = count;
			role.title = name;

			addedRoles.push(role);
			roles.push(role);
		}

		resizedRoles.push(role);
	});

	interpreter.addTool('drop', [
		{ name: 'name', type: String },
		{ name: 'count', type: Number }
	], (name, count) => {
		count = Math.abs(count);

		const role = roles.find(role => role.title == name);

		if (!role) {
			console.warn(`role '${name}' not found`);

			return;
		}

		role.count -= count;
		console.log('-', name, count);

		resizedRoles.push(role);

		if (role.count <= 0) {
			removedRoles.push(role);
			roles.splice(roles.indexOf(role), 1);
		}
	});

	let management = [
		'directors',
		'owners'
	];

	if (target > 100) {
		management.push('management');
	}

	interpreter.remember([
		new SystemMessage(`
			The main goal is to make a list of all people working at ${company.name}.
			We are interested in the roles / jobs that the company offers.
			Always use the singular form for the jobs name, not the plural.
			Distribute the people according to how many people would work in a real company, even if this means creating big groups of similar workers.
			Beware that some activities might be outsourced and are not part of this companies offices.
			We are currently in the year ${Time.now().year}, beware that many jobs that exist now did not back in the day.
			Make a list of at least ${minimumRoleCount} different roles.

			I will provide a list of the current role distribution, you need to adjust it to reach ${target} people.
			You can adjust the list by calling 'add' or 'drop'.

			Use 'add' if you would like to create a new role or add people to an existing role.
			For example, there are 3 Engineers, you'd like to add two, call 'add' with name Engineer and count 2.

			When you'd like to remove a role or reduce the number of workers in it, call 'drop'.
			For example, if you'd like to get rid of one of the Engineers, call 'drop' with name Engineer and count 1.
			Do not use the total count, just use the difference!

			Don't forget the people working in ${management.join(', ')}.
		`),
		new UserMessage(`
			The company "${company.name}" has provided a short description about them:
			${company.description}
		`)
	]);

	while (sumRoleCount(roles) != target || roles.length < minimumRoleCount) {
		const offset = sumRoleCount(roles) - target;
		console.log('~', sumRoleCount(roles), target, roles.length);

		let prompt = [];

		if (roles.length) {
			prompt.push(`
				The following roles are currently assigned:
				${roles.map(role => `- ${role.count}x ${role.title}`).join('\n')}

				Currently there are ${Math.abs(offset)} too ${offset > 0 ? 'many' : 'few'} people assigned.
				Try to ${offset > 0 ? 'make some roles smaller, or get rid of them' : 'add more roles or add more people to the roles'}.
			`);

			if (roles.length < minimumRoleCount) {
				prompt.push(`
					Try to add more roles, you should have at least ${minimumRoleCount} roles.
					Maybe split a role into two more specific roles.
				`);
			}
		} else {
			prompt.push(`
				You have to make up the whole company structure!
				Try to distribute the ${target} people among roles in a realistic way.
			`);
		}

		if (Math.abs(offset) > 10) {
			prompt.push(`
				Feel free if you'd like to make small adjustments (max 3 people) to the other roles - but you don't have to, only if you think that the current distribution is odd!
				Just use the same 'add' / 'drop' methods!
			`);
		}

		await interpreter.execute(new UserMessage(prompt.join('\n')));
	}

	console.group(`${company.name} role list created`);

	roles.sort((a, b) => b.count - a.count);

	for (let role of roles) {
		console.log(`${role.count}x ${role.title}`);
	}

	console.log(`= ${sumRoleCount(roles)} roles`);

	console.groupEnd();

	resizedRoles = resizedRoles
		.filter((role, index) => resizedRoles.indexOf(role) == index)
		.filter(resized => !addedRoles.includes(resized));

	return {
		roles,
		changed: true,

		addedRoles,
		resizedRoles,
		removedRoles
	};
};

const cleanName = (name: string) => name.replace(/[A-Z]/g, match => ` ${match}`).trim().replace(/\s+/g, ' ');

const sumRoleCount = (roles: WorkOffer[]) => {
	let sum = 0;

	for (let role of roles) {
		sum += role.count;
	}

	return sum;
};

const randomizeDelta = (count: number) => Math.ceil((Math.random() - 0.5) * 0.1 * count) + count;
