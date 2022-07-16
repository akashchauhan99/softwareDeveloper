const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    // `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank FROM programming_languages LIMIT ${offset}, ${config.listPerPage}`
    `SELECT * FROM programming_languages LIMIT ${offset}, ${config.listPerPage}`
  );

  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(programmingLanguage) {
  console.log(programmingLanguage);
  const name = programmingLanguage.name;
  const released_year = programmingLanguage.released_year;
  const githut_rank = programmingLanguage.githut_rank;
  const pypl_rank = programmingLanguage.pypl_rank;
  const tiobe_rank = programmingLanguage.tiobe_rank;
  const query = `INSERT INTO programming_languages 
  (name, released_year, githut_rank, pypl_rank, tiobe_rank) 
  VALUES (?, ?, ?, ?, ?)`;

  const result = await db.query(query, [name, released_year, githut_rank, pypl_rank, tiobe_rank]
    // `INSERT INTO programming_languages 
    //     (name, released_year, githut_rank, pypl_rank, tiobe_rank) 
    //     VALUES 
    //     (${programmingLanguage.name}, ${programmingLanguage.released_year}, ${programmingLanguage.githut_rank}, ${programmingLanguage.pypl_rank}, ${programmingLanguage.tiobe_rank})`
  );
  console.log("===============>>>>>>>>>>>", result);

  let message = "Error in creating programming language";
  if (result.affectedRows) {
    message = "Programming language created successfully";
  }
  return { message };
}

async function update(id, programmingLanguage) {
  const result = await db.query(
    `UPDATE programming_languages
    SET name="${programmingLanguage.name}", released_year=${programmingLanguage.released_year}, githut_rank=${programmingLanguage.githut_rank}, 
    pypl_rank=${programmingLanguage.pypl_rank}, tiobe_rank=${programmingLanguage.tiobe_rank} 
    WHERE id=${id}`
  );

  let message = "Error in updating programming language";

  if (result.affectedRows) {
    message = "Programming language updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM programming_languages WHERE id=${id}`
  );

  let message = "Error in deleting programming language";

  if (result.affectedRows) {
    message = "Programming language deleted successfully";
  }

  return { message };
}

async function getOne(id) {
    const result = await db.query(
        `SELECT * FROM programming_languages where id=${id}`
    );

  return { result };

}
module.exports = {
  getMultiple,
  create,
  update,
  remove,
  getOne
};
