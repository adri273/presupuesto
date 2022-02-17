import React, { useState } from "react";
import "./Form.css";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import InputMask from "react-input-mask";


function Form({ params }) {
  const { id } = params;
  console.log(id);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [selectedDate, handleDateChange] = useState(tomorrow);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                inputFormat="Y-MM-dd"
                mask="____-__-__"
                minDate={tomorrow}
                label="Fecha a conseguir el préstamo"
                name="loan_date"
                value={selectedDate}
                onChange={(date) => handleDateChange(date)}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" fullWidth />
                )}
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
              <InputMask
                mask="(+34) 999 99 99 99"
                maskChar=" "
                label="Teléfono"
                name="phone"
                required
                fullWidth
              >
                {(params) => <TextField {...params} />}
              </InputMask>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="age"
                label="Edad"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 16, max: 120 } }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  name="check"
                  label="He leído y acepto los " //TODO: VALIDAR + ADD LINK: https://cloudframework.io/terminos-y-condiciones/
                  required
                />
                <a
                  className="form__terms"
                  href="https://cloudframework.io/terminos-y-condiciones/"
                  target="_blank" rel="noreferrer"
                >
                  términos y condiciones.
                </a>
              </div>
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
    </LocalizationProvider>
  );
}

export default Form;
