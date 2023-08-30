// Tuodaan tietokantamallit ja tietokantayhteys
const db = require("../models");
// Haetaan 'Task' -malli 'db.models.Task' -muuttujasta
const Task = db.models.Task;

// Viedään controller-funktiot ulos moduulista
module.exports = {
  // Funktio, joka hakee kaikki tehtävät tietokannasta
  getAll: async (req, res) => {
    Task.findAll() //Tämä etsii kaikki tiedot tietokannasta ja yrittää lähettää ne eteenpäin. Jos ei onnistu niin antaa virhe ilmoituksen 500
      .then((data) => {
        res.send(data); // Lähetetään vastauksena tietokannasta haetut tiedot
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving tasks.",
        });
      });
  },

  // Funktio, joka luo uuden tehtävän tietokantaan
  create: async (req, res) => {
    const post = {
      Nimi: req.body.Nimi,
      Kuvaus: req.body.Kuvaus,
      AloitusAika: req.body.AloitusAika,
      LopetusAika: req.body.LopetusAika,
    };

    Task.create(post) // Luo uuden tehtävän tietokantaan
      .then((data) => {
        res.send(data); // Lähetetään vastauksena luotu tehtävä
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving tasks.",
        });
      });
  },

  // Funktio, joka hakee yhden tehtävän tietokannasta
  findOne: async (req, res) => {
    const id = req.params.id;

    Task.findByPk(id) // Etsitään yksi tehtävä tietokannasta
      .then((data) => {
        res.send(data); // Lähetetään vastauksena haettu tehtävä
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error retvieving Tutorial with id=" + id,
        });
      });
  },

  // Funktio, joka poistaa tehtävän tietokannasta
  delete: async (req, res) => {
    const id = req.params.id;

    try {
      await Task.destroy({
        where: { id: id }, // Poistetaan tehtävä annetun id:n perusteella
      });

      res.send({ message: "Task deleted successfully!" });
    } catch (error) {
      res.status(500).send({
        message: error.message || "Could not delete Task with id=" + id,
      });
    }
  },
};
