// Importataan tarvittavat jutut
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const AddTask = ({ onAdd }) => {
  // State-muuttujat tekstikenttien tietojen tallentamiseen
  const [Nimi, setNimi] = useState("");
  const [Kuvaus, setKuvaus] = useState("");
  const [AloitusAika, setAloitusAika] = useState("");
  const [LopetusAika, setLopetusAika] = useState("");

  // Käsittelee lomakkeen lähettämisen
  const onSubmit = (e) => {
    e.preventDefault();

    // Tarkistaa, ovatko kaikki kentät täytetty
    if (!Nimi) {
      alert("Lisää nimi");
      return;
    }

    if (!Kuvaus) {
      alert("Lisää kuvaus");
      return;
    }

    if (!AloitusAika) {
      alert("Lisää Aloitus aika");
      return;
    }

    if (!LopetusAika) {
      alert("Lisää Lopetus aika");
      return;
    }
    // Lähettää POST-pyynnön palvelimelle tehtävän lisäämiseksi
    axios
      .post("http://localhost:3001/task", {
        Nimi,
        Kuvaus,
        AloitusAika,
        LopetusAika,
      })
      .then((res) => {
        const palautus = res.data;

        console.log(palautus);
      });
  };

  return (
    <>
      <Typography align="center" variant="h4">
        Lisää tehtävä
      </Typography>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          value={Nimi}
          onChange={(e) => setNimi(e.target.value)}
          id="standard-basic"
          placeholder="Tehtävän nimi"
          variant="standard"
        />
        <TextField
          value={Kuvaus}
          onChange={(e) => setKuvaus(e.target.value)}
          id="standard-basic"
          placeholder="Kuvaus"
          variant="standard"
        />
        <TextField
          value={AloitusAika}
          onChange={(e) => setAloitusAika(e.target.value)}
          id="standard-basic"
          placeholder="Aloitus aika"
          variant="standard"
        />
        <TextField
          value={LopetusAika}
          onChange={(e) => setLopetusAika(e.target.value)}
          id="standard-basic"
          placeholder="Lopetus aika"
          variant="standard"
        />
        <Button type="submit" variant="outlined">
          Lisää
        </Button>
      </Box>
    </>
  );
};

export default AddTask;
