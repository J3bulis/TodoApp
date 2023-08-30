// Ladataan ympäristömuuttujat .env-tiedostosta
require("dotenv").config();
// Otetaan käyttöön tarvittavat kirjastot
const express = require("express");
const { Sequelize } = require("sequelize");
const app = express();
const path = require("path");
const db = require("./models"); // Tietokantamallit
const cors = require("cors");
const task = require("./models/task")(db.sequelize); // Tehtävä-malli
const TaskController = require("./controllers/task"); // Kontrolleri tehtävien käsittelyä varten

// Käytetään CORS-middlewarea sallimaan HTTP-pyynnöt eri alkuperistä
app.use(cors());
// Sallitaan JSON-muotoisten pyyntöjen käsittely
app.use(express.json());
// Sallitaan URL-koodattujen tietojen käsittely
app.use(express.urlencoded({ extended: true }));

// Synkronisoidaan tietokanta (luodaan taulut, jos niitä ei vielä ole)
(async () => {
  await db.sequelize.sync();
})();

// Määritetään CORS-asetukset
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Content-type", "application/json");

  // Pass to next layer of middleware
  next();
});

// Redirect requests to endpoint starting with /posts to postRoutes.js
//app.use("/task", require("./routes/postRoutes"));

// Reitittää pyynnöt polkuihin, jotka alkavat /task, kontrollerin avulla
app.get("/task", TaskController.getAll);
app.post("/task", TaskController.create);
app.delete("/task/:id", TaskController.delete);
app.get("/task/:id", TaskController.findOne);

/* TestData
app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});
*/

// Tulostaa tietokannasta löytyvät tehtävät konsoliin
task.findAll().then((task) => {
  console.log(task);
  db.sequelize.close;
});

// Luo testitehtävän ja tulostaa sen konsoliin
task.create().then((task) => {
  console.log(task);
  db.sequelize.close;
});

// Määritetään sovelluksen kuuntelemat portit
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
