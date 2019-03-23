const db = require("../../../db/dbConfig");

const readTable = () => db("prisons");
const clearTestTable = () => db("prisons").truncate();

const findBy = filter => db("prisons").where(filter);

const create = async prison => {
	const [id] = await db("prisons").insert(prison);

	return findBy({
		id
	}).first();
};

const readAll = () =>
	db("prisons").select("id", "location", "population", "zipcode");

const readOne = id =>
	db("prisons")
		.select("id", "location", "population", "zipcode")
		.where({
			id
		})
		.first();

const readOneUnsafe = id =>
	db("prisons")
		.where({
			id
		})
		.first();

const readPrisoners = id =>
	db("prisoners").where({
		prison_id: id
	});

const updatePrison = async (id, updates) => {
	await db("prisons")
		.where({
			id
		})
		.update(updates);

	return findBy({
		id
	}).first();
};

const destroyPrison = async id => {
	await db("prisoners")
		.where({
			prison_id: id
		})
		.del();

	await db("prisons")
		.where({
			id
		})
		.del();
};

module.exports = {
	readTable,
	clearTestTable,
	findBy,
	create,
	readAll,
	readOne,
	readOneUnsafe,
	readPrisoners,
	updatePrison,
	destroyPrison
};
