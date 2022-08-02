import * as React from "react";
import { DataGrid, renderActionsCell } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Snackbar, Alert, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ComboBox from "./ComboBox";

export default function DataTable() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = React.useState(false);
  let url = "https://62d16f46d4eb6c69e7dd5d81.mockapi.io/customers/";
  async function fetchData() {
    try {
      let response = await axios.get(url);
      let tempCustomers = await response.data;
      setCustomers(tempCustomers);
    } catch (err) {
      console.log("Error: ", err.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    { field: "id", headerName: "id", width: 70 },
    { field: "address", headerName: "address", width: 200 },
    { field: "email", headerName: "Email", width: 500 },
    {
      field: "postCode",
      headerName: "Post Code",
      width: 150,
    },
  ];
  const deleteData = (id) => {
    axios
      .delete(url + id)
      .then(function (response) {
        setOpen(true);
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Toast message
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={customers}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
