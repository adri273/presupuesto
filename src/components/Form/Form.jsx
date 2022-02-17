import React, { useState } from "react";
import "./Form.css";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function Form({ params }) {
  const { id } = params;
  console.log(id);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [selectedDate, handleDateChange] = useState(tomorrow);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="paper">
        <form className="form">
          <h3>Información del préstamo</h3>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="loan_amount"
                label="Importe del préstamo (€)"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 11, max: 1000 } }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="loan_week"
                label="Tiempo a devoler (años)"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 1, max: 20 } }}
                prefix="€"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <KeyboardDatePicker
                name="loan_date"
                label="Fecha a conseguir el préstamo"
                inputVariant="outlined"
                format="Y-MM-dd"
                minDate={tomorrow}
                value={selectedDate}
                onChange={(date) => handleDateChange(date)}
                fullWidth
                required
              />
            </Grid>
          </Grid>

          <h3>Información personal</h3>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Nombre"
                variant="outlined"
                fullWidth
                required
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="surname"
                label="Apellidos"
                variant="outlined"
                fullWidth
                required
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                required
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="phone"
                label="Teléfono"
                variant="outlined"
                type="text" //TODO: VALIDATE PHONE FORMAT
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="age"
                label="Edad"
                variant="outlined"
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                name="check"
                label="Aceptar térnimos y condiciones." //TODO: ADD LINK: https://cloudframework.io/terminos-y-condiciones/
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="form__submit"
          >
            Enviar solicitud
          </Button>
        </form>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default Form;
