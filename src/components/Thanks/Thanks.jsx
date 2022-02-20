import React from 'react';
import './Thanks.css';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";


function Thanks({data}) {
  return (
    <div className="thanks">
      <p>Hemos recibido su solicitud con los siguientes datos:</p>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {data.map((el, i) =>
            el.key !== "check" ? (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {el.label}
                </TableCell>
                <TableCell align="right">{el.value}</TableCell>
              </TableRow>
            ) : null
          )}
        </TableBody>
      </Table>
      <p>En breve le contactará uno de nuestros agentes.</p>
      <a href="https://helloteca.com">
        <Button type="submit" variant="contained" className="form__submit">
          Ir a la página principal
        </Button>
      </a>
    </div>
  );
}

export default Thanks
