import React, { useState, useEffect } from "react";
import "./Form.css";
import { TextField, FormControlLabel, FormControl, Checkbox, Grid, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { format } from 'date-fns';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import InputMask from "react-input-mask";

import { useForm } from "react-hook-form";
import Field from "../Field/Field"


function Form({ params }) {
  const { id } = params;
  console.log(id);

  const dateFormat = 'Y-MM-dd';
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [selectedDate, handleDateChange] = useState(tomorrow);


  useEffect(() => {
    setValue("loan_date",format(selectedDate, dateFormat));
    
  }, [selectedDate])
  

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue  
    } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  const formData = [
    {
      title: "Información del préstamo",
      inputs: [
        {
          fieldProps: {
            name: "loan_amount",
            label: "Importe del préstamo (€)",
            type: "number",
          },
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
          sm: 6,
        },
        {
          fieldProps: {
            name: "loan_week",
            label: "Tiempo a devoler (años)",
            type: "number",
          },
          field: "TextField",
          validation: {
            required: {
              value: true,
              message: "¿En cuantos años quieres devolver el préstamo?",
            },
            min: {
              value: 1,
              message: "Mínimo 1 año",
            },
            max: {
              value: 20,
              message: "Máximo 20 años",
            },
          },
          xs: 12,
          sm: 6,
        },
        {
          fieldProps: {
            name: "loan_date",
            label: "Fecha a conseguir el préstamo",
            inputFormat: dateFormat,
            mask: "____-__-__",
            minDate: tomorrow,
            value: selectedDate,
            onChange: (date) => handleDateChange(date),
          },
          field: "DatePicker",
          validation: {
            required: {
              value: true,
              message: "Obligatorio",
            }
          },
          xs: 12,
          sm: 12,
        },
      ]
    },
    {
      title: "Información personal",
      inputs: [
        {
          fieldProps: {
            name: "name",
            label: "Nombre",
            disabled: true,
            value:"Adri"
          },
          field: "TextField",
          validation: {
            required: {
              value: true,
              message: "Introduce tu nombre",
            },
          },
          xs: 12,
          sm: 6,
        },
        {
          fieldProps: {
            name: "surname",
            label: "Apellidos",
            disabled: true,
            value:"Avellaneda"
          },
          field: "TextField",
          validation: {
            required: {
              value: true,
              message: "Introduce tus apellidos",
            },
          },
          xs: 12,
          sm: 6,
        },
        {
          fieldProps: {
            name: "email",
            label: "Email",
            disabled: true,
            value:"adriavellanedamartinez@gmail.com",
            type: "email"
          },
          field: "TextField",
          validation: {
            required: {
              value: true,
              message: "Introduce tu email",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "El email no es válido"
            }
          },
          xs: 12,
          sm: 12,
        },
        /*{
          fieldProps: {
            name: "email",
            label: "Email",
            disabled: true,
            value:"adriavellanedamartinez@gmail.com",
            type: "email"
          },
          field: "MuiPhoneNumber",
          validation: {
            required: {
              value: true,
              message: "Introduce tu email",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "El email no es válido"
            }
          },
          xs: 12,
          sm: 6,
        },
        <InputMask
                mask="(+34) 999 999 999"
                maskChar=" "
                label="Teléfono"
                name="phone"
                value={values.phone}
                error={errors.phone}
                required
                fullWidth
              >
                {(params) => <TextField {...params} />}
              </InputMask>*/
        
      ]
    },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="paper">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {formData.map(({title, inputs}, i) => 
          <div key={i}>
            <h3>{title}</h3>
            <Grid container spacing={2}>
              {inputs.map((input, idx) => <Field key={idx} props={{...input}} register={register} errors={errors} /> ) }
            </Grid>
          </div>
          ) }
          

          {/*
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
