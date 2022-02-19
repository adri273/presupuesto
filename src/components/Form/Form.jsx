import React, { useState, useEffect } from "react";
import "./Form.css";
import { TextField, FormControlLabel, FormControl, Checkbox, Grid, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import InputMask from "react-input-mask";

import { useForm } from "react-hook-form";
import Field from "../Field/Field"


function Form({ params }) {
  const { id } = params;
  console.log(id);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [selectedDate, handleDateChange] = useState(tomorrow);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  const inputs = [
    {
      name: "loan_amount",
      label: "Importe del préstamo (€)",
      type: "number",
      field: "TextField",
      validation: {
        required: {
          value: true,
          message: "¿Que cantidad necesitas?",
        },
        min: {
          value: 11,
          message: "Cantidad mínima: 11",
        },
        max: {
          value: 1000,
          message: "Cantidad máxima: 1000",
        },
      },
      xs: 12,
      sm: 6
    }
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="paper">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h3>Información del préstamo</h3>
          <Grid container spacing={2}>
            {inputs.map((input, i) => <Field key={i} props={{...input}} register={register} errors={errors} /> ) }
            {/*<Grid item xs={12} sm={6}>
              <TextField
                name="loan_amount"
                label="Importe del préstamo (€)"
                variant="outlined"
                type="number"
                {...register("loan_amount", {
                  required: {
                    value: true,
                    message: "¿Que cantidad necesitas?",
                  },
                  min: {
                    value: 11,
                    message: "Cantidad mínima: 11",
                  },
                  max: {
                    value: 1000,
                    message: "Cantidad máxima: 1000",
                  },
                })}
                error={errors?.loan_amount}
                helperText={errors?.loan_amount?.message}
                fullWidth
              />
              </Grid>*/}
            {/*<Grid item xs={12} sm={6}>
              <TextField
              name="loan_week"
                label="Tiempo a devoler (años)"
                variant="outlined"
                type="number"
                {...register("loan_week", { required: true, min: 1, max: 20 })}
                fullWidth
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
                </Grid>*/}
          </Grid>

          {/*<h3>Información personal</h3>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Nombre"
                variant="outlined"
                value={values.name}
                error={errors.name}
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
                value={values.surname}
                error={errors.surname}
                fullWidth
                required
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                {...register("email", {
                    required: {
                      value: true,
                      message: "Necesitas este campo"
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "El formato no es correcto"
                    }
                  })}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputMask
                mask="(+34) 999 99 99 99"
                maskChar=" "
                label="Teléfono"
                name="phone"
                value={values.phone}
                error={errors.phone}
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
                  control={<Checkbox color="primary" required />}
                  name="check"
                  value={values.check}
                  error={errors.check}
                  label="He leído y acepto los " //TODO: VALIDAR + ADD LINK: https://cloudframework.io/terminos-y-condiciones/
                />
                <a
                  className="form__terms"
                  href="https://cloudframework.io/terminos-y-condiciones/"
                  target="_blank"
                  rel="noreferrer"
                >
                  términos y condiciones.
                </a>
              </div>
            </Grid>
          </Grid>*/}
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
