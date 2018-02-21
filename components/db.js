const fs = require('fs');
const Sequelize = require('sequelize');
const debug = require('debug')('bootstrap');
const config = require('../configs/config');
const { mysql } = config.dbConfig;
const dbEnv = mysql[global.env];
const db = {};
let sequelize = null;

// Connect and Sync DB
try {
  sequelize = new Sequelize(dbEnv.database, dbEnv.username, dbEnv.password, mysql);
  sequelize.sync().then(async () => {
    if (global.env !== 'test') {
      debug('Sequelize DB Sync complete with Models');
    }
  });
} catch (err) {
  console.log('Sequelize Connection Error');
  console.log(err);
}

/**
 * Each model must has '~~Model.js' file which contains Sequelize model Definition,
 * And 'index.js' file which contains model path.
 */
fs.readdirSync(__dirname)
  .filter(file => file.slice(-3) !== '.js')
  .forEach((file) => {
    const model = sequelize.import(`${__dirname}/${file}/${file}Model.js`);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
