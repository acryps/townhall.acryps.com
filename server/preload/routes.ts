import { Preload } from ".";
import { Article, Borough, DbContext, Property, Resident, TrainRoute } from "../managed/database";

export const registerPreload = (manager: Preload, database: DbContext) => {
	manager.route('/home');

	manager.route<Article>(
		(id) => `/news/article/${id}`,
		() => database.article
			.where(article => article.published != null)
			.toArray(),
		article => [article.id]
	);

	manager.route<Resident>(
		(tag) => `/resident/${tag}`,
		() => database.resident.toArray(),
		resident => [resident.tag]
	);

	manager.route<Property>(
		(id) => `/property/${id}`,
		() => database.property
			.where(property => property.deactivated == null)
			.toArray(),
		property => [property.id]
	);

	manager.route<Borough>(
		(tag) => `/borough/${tag}`,
		() => database.borough.toArray(),
		property => [property.tag]
	);

	manager.route<TrainRoute>(
		(code) => `/train/route/${code}`,
		() => database.trainRoute
			.where(property => property.opened != null)
			.toArray(),
		property => [property.code]
	);
};
