// Tuodaan tietokantakonfiguraatio
const dbConfig = require("../config/db-config");
// Tuodaan Sequalize-kirjasto
const Sequalize = require("sequelize");

// Luodaan tietokantayhteys Sequalize-olion avulla
const sequelize = new Sequalize(
  dbConfig.DATABASE, // Tietokannan nimi
  dbConfig.USER, // Käyttäjänimi
  dbConfig.PASSWORD, // Salasana
  {
    host: dbConfig.HOST, // Tietokantapalvelimen osoite
    dialect: dbConfig.DIALECT, // Käytetty tietokantajärjestelmä
  }
);

const db = {}; // Luodaan objekti 'db', joka sisältää tietokantayhteyden ja mallit
db.sequelize = sequelize; // Tallennetaan tietokantayhteys 'sequelize'-muuttujaan
db.models = {}; // Luodaan 'models'-objekti tietokantamalleille
db.models.Task = require("./task")(sequelize, Sequalize); // Tuodaan tehtävien tietokantamalli ja tallennetaan se 'Task'-nimellä

// Viedään 'db'-objekti, joka sisältää tietokantayhteyden ja mallit
module.exports = db;
