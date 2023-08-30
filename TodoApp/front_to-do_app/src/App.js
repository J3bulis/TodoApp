// Tuodaan tarvittavat kirjastot ja komponentit
import React, { useEffect, useState } from "react";
import axios from "axios";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { DataGrid, GridSelectionModel } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import AddTask from "./components/AddTask";

// Pääkomponentti
function App() {
  // Tilamuuttujat
  const [tasks, setTasks] = useState([]); // Säilöö tehtävät
  const [selectedRows, setSelectedRows] = useState([]); // Säilöö valitut rivit

  // Haetaan tehtävät palvelimelta
  useEffect(() => {
    try {
      axios
        .get("http://localhost:3001/task")
        .then((response) => {
          console.log(response);
          setTasks(response.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  // Sarakkeet datagridiin
  const columns = [
    { title: "ID", field: "id", width: 150 },
    { title: "TyönNimi", field: "Nimi", width: 150 },
    { title: "Tehtävän kuvaus", field: "Kuvaus", width: 150 },
    { title: "Tehtävän AloitusAika", field: "AloitusAika", width: 150 },
    { title: "Tehtävän LopetusAika", field: "LopetusAika", width: 150 },
    { title: "Tehtävä luotu", field: "createdAt", width: 150 },
    { title: "Tehtävää muokattu", field: "updatedAt", width: 150 },
  ];

  // Käsittelee valittujen rivien poiston
  const handleDeleteSelected = (selectedIDs) => {
    if (!Array.isArray(selectedIDs)) {
      selectedIDs = [selectedIDs]; // Muutetaan yksittäinen ID taulukoksi
    }

    console.log("Deleting tasks with IDs:", selectedIDs);
    console.log("Selected rows before deletion:", selectedRows);

    // Käydään läpi valitut ID:t ja poistetaan tehtävät
    selectedIDs.forEach(async (id) => {
      try {
        await axios.delete(`http://localhost:3001/task/${id}`);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        console.log(selectedIDs);
        console.log(`Task with ID ${id} deleted successfully`);
      } catch (error) {
        console.error(`Error deleting task with ID ${id}:`, error);
      }
    });
  };

  // Palauttaa käyttöliittymän
  return (
    <>
      <AddTask />
      <Typography align="center" variant="h4">
        Tasks
      </Typography>
      <Button
        onClick={() => {
          if (selectedRows.length > 0) {
            handleDeleteSelected(selectedRows);
            console.log("Valitut" + selectedRows);
          } else {
            console.log("No rows selected to delete.");
            console.log("Nappulasta painettu + " + selectedRows);
          }
        }}
        variant="outlined"
      >
        Poista valitut rivit
      </Button>
      <DataGrid
        key={tasks.length > 0 ? tasks.length : 0}
        rows={tasks}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20]}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => {
          console.log("valitut: " + newSelection);
          if (newSelection.SelectionModel) {
            setSelectedRows(newSelection.selectionModel);
            console.log("valitut rivit: ", selectedRows);
          }
          console.log("valitut: " + newSelection);
        }}
      />
    </>
  );
}

export default App;
