const db = require("../../../db/dbConfig");

const readTable = () => db("prisonerSkills");
const clearTestTable = () => db("prisonerSkills").truncate();

const findBy = filter => db("prisonerSkills").where(filter);

const createSkill = async skill => {
  const [id] = await db("prisonerSkills").insert(skill);

  return findBy({
    id
  }).first();
};

const readSkills = () => db("prisonerSkills");

const readSkill = id =>
  db("prisonerSkills")
    .where({
      id
    })
    .first();

const updateSkill = async (id, updates) => {
  await db("prisonerSkills")
    .where({
      id
    })
    .update(updates);

  return findBy({
    id
  }).first();
};

const destroySkill = id =>
  db("prisonerSkills")
    .where({
      id
    })
    .del();

module.exports = {
  readTable,
  clearTestTable,
  findBy,
  createSkill,
  readSkills,
  readSkill,
  updateSkill,
  destroySkill
};
