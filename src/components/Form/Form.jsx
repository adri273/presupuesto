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



  

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    control,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "Adri",
      surname: "Avellaneda",
      email: "adriavellanedamartinez@gmail.com",
      phone: "34696524301",
      age: 21,
      loan_date: format(tomorrow, dateFormat),
      check: false
    },
  });


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
            dateFormat: dateFormat,
            mask: "____-__-__",
            minDate: tomorrow,
            onChange: (date) =>
              date instanceof Date
                ? setValue("loan_date", format(date, dateFormat))
                : setValue("loan_date", date),
            inputProps: {onKeyDown: (e) => e.preventDefault()},
            renderInput: (params) => <TextField {...params} fullWidth />,
          },
          field: "Controller",
          subField: "DatePicker",
          validation: {
            required: {
              value: true,
              message: "¿Cuándo quieres recibir el préstamo?",
            },
            minLength: {
              value: 5,
              message: "Fecha incorrecta",
            },
          },
          xs: 12,
          sm: 12,
        },
      ],
    },
    {
      title: "Información personal",
      inputs: [
        {
          fieldProps: {
            name: "name",
            label: "Nombre",
            readOnly: true,
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
            readOnly: true,
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
            readOnly: true,
            type: "email",
          },
          field: "TextField",
          validation: {
            required: {
              value: true,
              message: "Introduce tu email",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "El email no es válido",
            },
          },
          xs: 12,
          sm: 12,
        },
        {
          fieldProps: {
            name: "phone",
            label: "Teléfono",
            defaultCountry: "es",
            variant: "outlined",
          },
          field: "Controller",
          subField: "MuiPhoneNumber",
          validation: {
            required: {
              value: true,
              message: "Introduce tu número de teléfono",
            },
            minLength: {
              value: 11,
              message: "El número de teléfono no es válido",
            },
          },
          xs: 12,
          sm: 6,
        },
        {
          fieldProps: {
            name: "age",
            label: "Edad",
            type: "number",
          },
          field: "TextField",
          validation: {
            required: {
              value: true,
              message: "¿Cuántos años tienes?",
            },
            min: {
              value: 18,
              message: "Tienes que ser mayor de edad",
            },
            max: {
              value: 120,
              message: "¿Enserio?",
            },
          },
          xs: 12,
          sm: 6,
        },
        {
          fieldProps: {
            name: "check",
            label: "He leído y acepto los ",
            control: <Checkbox color="primary" required />,
          },
          linkTerms: (
            <a
              className="form__terms"
              href="https://cloudframework.io/terminos-y-condiciones/"
              target="_blank"
              rel="noreferrer"
            >
              términos y condiciones.
            </a>
          ),
          field: "Controller",
          subField: "FormControlLabel",
          xs: 12,
          sm: 12,
        },
      ],
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
              {inputs.map((input, idx) => <Field key={idx} props={{...input}} register={register} errors={errors} control={control} /> ) }
            </Grid>
          </div>
          ) }
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
