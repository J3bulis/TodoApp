const { Sequelize, DataTypes } = require("sequelize");

// Tämä tiedosto muodostaa pohjan task oliolle jonka perusteella kasataan yksittäinen työ

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("tasks", {
    Nimi: {
      type: Sequelize.STRING,
    },
    Kuvaus: {
      type: Sequelize.STRING,
    },
    AloitusAika: {
      type: Sequelize.STRING, // Tähän pitäisi miettiä parempi muuttuja kuin String
    },
    LopetusAika: {
      type: Sequelize.STRING, // Tähän pitäisi miettiä parempi muuttuja kuin String
    },
  });
};
