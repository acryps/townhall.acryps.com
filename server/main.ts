import { DbClient, RunContext } from "vlquery";
import { Inject, StaticFileRoute, ViewModel } from "vlserver";
import { ManagedServer } from "./managed/server";
import { Borough, DbContext, Player, Property } from "./managed/database";
import { writeFileSync } from 'fs';

const openai = new (require('openai'))();

console.log("connecting to database...");
DbClient.connectedClient = new DbClient({ max: 2 });

DbClient.connectedClient.connect().then(async () => {
	console.log("connected to database!");

	const app = new ManagedServer();
	const db = new DbContext(new RunContext());

	const boroughs = await db.borough.where(s => s.ttsDescription != null)
		.orderByAscending(borough => borough.name)
		.toArray();

	for (let borough of boroughs) {
		if (!borough.aiSummary) {
			console.log(`AI SUMMARY FOR ${borough.name}`);

			try {
				borough.aiSummary = await ai(`i am writing description summaries of boroughs in my fictional city. i have recorded the descriptions using text to speech software, which might have introduced some issues. please make a short, summary highlighting the most important things about the description. the text to speech software made a lot of issues, so no matter what, only call this district ${JSON.stringify(borough.name)}, even if the following text has the name written wrong. we are in 1890 europe, a bit like london. but beware, just because some of the names might sound familiar, they must not represent what has been built in real life. do not say anything about that this is a fictional city, or london or europe. the city is called "City of Pilegron". the river is called "Pilger River". there are no countries yet, nor continents.`, borough.ttsDescription);

				await borough.update();
			} catch (error) {
				console.error(error);
			}
		}
	}

	for (let borough of boroughs) {
		const points = parsePoints(borough.bounds);

		borough['points'] = points;
		borough['size'] = calculatePolygonArea(points);

		borough['center'] = calculatePolygonCentroid(points);

		const outline = [];

		for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
			const start = points[pointIndex];
			const end = points[pointIndex + 1] ?? points[0];

			const dx = Math.abs(end.x - start.x);
			const dy = Math.abs(end.y - start.y);

			if (Math.hypot(dx, dy) > 3) {
				let x = start.x;
				let y = start.y;

				const direction = Math.atan2(end.x - start.x, end.y - start.y);

				const mx = Math.sin(direction);
				const my = Math.cos(direction);

				while (Math.hypot(x - end.x, y - end.y) > 1) {
					outline.push({ x: Math.round(x), y: Math.round(y) });

					x += mx;
					y += my;
				}
			}
		}

		borough['outline'] = outline;
	}

	for (let borough of boroughs) {
		const neighbors = [];
		const otherBoroughs = [...boroughs].filter(peer => peer != borough);

		for (let point of borough['outline']) {
			const peers = otherBoroughs.filter(peer => peer['outline'].find(peerPoint => Math.hypot(peerPoint.x - point.x, peerPoint.y - point.y) < 3));

			for (let peer of peers) {
				neighbors.push(peer);
				otherBoroughs.splice(otherBoroughs.indexOf(peer), 1);
			}
		}

		borough['neighbors'] = neighbors;
	}

	let totalPopulation = 0;

	for (let borough of boroughs) {
		let population = 0;

		for (let [type, factor] of new Map().set('H1', 2).set('H2', 3.5).set('H3', 5).set('H4', 3).set('HAPX', 3)) {
			const properties = await borough.properties.where(property => property.type.code.valueOf() == type).toArray();

			for (let property of properties) {
				const size = calculatePolygonArea(parsePoints(property.bounds));

				population += size * factor;
			}
		}

		// factor to fix size influx
		//
		// l211: 20ppl, 250m2 => 12.5m2 / person
		// bourbaki: 2870m2 => 230 people
		population = Math.floor(population / 50);

		borough['population'] = population;
		borough['populationDensity'] = population / borough['size'];

		totalPopulation += population;
	}

	for (let borough of boroughs) {
		let jobFactor = 0;

		for (let type of ['C', 'CF', 'CG', 'CM', 'CO', 'EDU', 'M', 'PA', 'PE', 'PH', 'PM', 'PP', 'PR', 'PS', 'PW', 'TF', 'TSS', 'TT', 'TW']) {
			const properties = await borough.properties.where(property => property.type.code.valueOf() == type).toArray();

			for (let property of properties) {
				jobFactor += calculatePolygonArea(parsePoints(property.bounds));
			}
		}

		borough['work'] = jobFactor;
	}

	const biggest = boroughs.toSorted((a, b) => b['size'] - a['size']);
	console.debug('rank size:', biggest.map(b => b.name));

	const center = boroughs.find(borough => borough.name == 'City of Pilegron');
	const central = boroughs.toSorted((a, b) => distance(center, a) - distance(center, b));
	console.debug('rank center:', central.map(b => b.name));

	const populated = boroughs.toSorted((a, b) => b['population'] - a['population']);
	console.debug('rank population:', populated.map(b => b.name));
	console.debug('!!! total population: ', totalPopulation);

	const populationDensities = boroughs.toSorted((a, b) => b['populationDensity'] - a['populationDensity']);
	console.debug('rank population density:', populationDensities.map(b => b.name));

	const jobs = boroughs.toSorted((a, b) => b['work'] - a['work']);
	console.debug('rank work:', jobs.map(b => b.name));

	for (let borough of boroughs) {
		if (!borough.aiDescription) {
			// rank
			const size = biggest.indexOf(borough) + 1;
			const centrality = central.indexOf(borough) + 1;
			const population = populated.indexOf(borough) + 1;
			const populationDensity = populationDensities.indexOf(borough) + 1;
			const job = jobs.indexOf(borough) + 1;

			console.debug(borough.name, `${borough['size']}m2 ${borough['population']}ppl ${borough['populationDensity']}ppl/m2`);

			const rankSheet = `#${size} in size, #${centrality} closest to center, #${population} in population, #${populationDensity} in population density, #${job} in work offering`;

			const neighborTexts = `also to consider are the boroughs neibors. here a list and a short description of them: ${borough['neighbors'].map((neibor: Borough) => `\n- ${neibor.name}: ${neibor.aiSummary}`)}`;

			try {
				const src = await db.borough.find(borough.id);

				const prompt = `i am writing descriptions of boroughs in my fictional city. i have recorded the descriptions using text to speech software, which might have introduced some issues. the text to speech software made a lot of issues, so no matter what, only call this district ${JSON.stringify(borough.name)}, even if the following text has the name written wrong. we are in 1890 europe, a bit like london. but beware, just because some of the names might sound familiar, they must not represent what has been built in real life. some general info about this district, which might help you. there are ${boroughs.length} boroughs in total: ${rankSheet}. write about 3 paragraphs. do not just repeat the rankings as text, use it to form a pretty text. do not say anything about that this is a fictional city, or london or europe. the city is called "City of Pilegron". the river is called "Pilger River". there are no countries yet, nor continents. do not invent stuff only use the data i provided.\n\n` + neighborTexts;

				writeFileSync(`${borough.name}.txt`, prompt);

				src.aiDescription = await ai(prompt, borough.ttsDescription);

				await src.update();
			} catch (error) {
				console.error(error);
			}
		}
	}
});

function parsePoints(bounds: string) {
	return bounds.split(';').map(point => point.split(',')).map(point => ({ x: +point[0], y: +point[1] }))
}

async function ai(request: string, data: string) {
	const completion = await openai.chat.completions.create({
	    model: "gpt-4o",
	    messages: [
			{role: 'system', content: request},
	        {role: 'user', content: data}
	    ]
	});

	return completion.choices[0].message.content;
}

function distance(a, b) {
	return Math.hypot(a.center.x - b.center.x, a.center.y - b.center.y);
}

function calculatePolygonArea(points) {
  const n = points.length;
  let area = 0;

  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += points[i].x * points[j].y;
    area -= points[j].x * points[i].y;
  }

  return Math.abs(area / 2);
}

function calculatePolygonCentroid(points) {
  const n = points.length;
  let signedArea = 0;
  let cx = 0;
  let cy = 0;

  for (let i = 0; i < n; i++) {
    const x0 = points[i].x;
    const y0 = points[i].y;
    const x1 = points[(i + 1) % n].x;
    const y1 = points[(i + 1) % n].y;

    const a = x0 * y1 - x1 * y0;
    signedArea += a;
    cx += (x0 + x1) * a;
    cy += (y0 + y1) * a;
  }

  signedArea *= 0.5;
  cx /= (6 * signedArea);
  cy /= (6 * signedArea);

  return { x: cx, y: cy };
}
