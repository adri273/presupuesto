import React from 'react';
import './Error404.css';
import { Button } from "@mui/material";
import { Link } from "wouter";


function Error404() {
  return (
    <div className="error404">
      <h1 style={{ marginBottom: "1rem" }}>Oopss...</h1>
      <h2>No podemos encontrar lo que buscas</h2>
      <Link to="/partner_test/1"> {/* Vamos a dar por hecho que accede el usuario 1, al no haber más información */}
        <Button type="submit" variant="contained" className="form__submit">
          Solicitar un préstamo
        </Button>
      </Link>
    </div>
  );
}

export default Error404
