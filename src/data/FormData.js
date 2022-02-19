import { TextField, Checkbox, InputAdornment } from "@mui/material";
import { format } from 'date-fns';

export const dateFormat = 'Y-MM-dd';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export const defaultData = {
    loan_date: format(tomorrow, dateFormat),
    check: false,
  }

export const formData = [
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
            /*onChange: (date) =>
              date instanceof Date
                ? setValue("loan_date", format(date, dateFormat))
                : setValue("loan_date", date),*/
            inputProps: { onKeyDown: (e) => e.preventDefault() },
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
            inputProps: { readOnly: true },
            InputLabelProps: {
              shrink: true,
            },
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
            inputProps: { readOnly: true },
            InputLabelProps: {
              shrink: true,
            },
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
            inputProps: { readOnly: true },
            InputLabelProps: {
              shrink: true,
            },
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
            type: "number",
            variant: "outlined",
            InputProps: {
              startAdornment: (
                <InputAdornment position="start" style={{marginRight:"0"}}>+</InputAdornment>
              ),
            },
            InputLabelProps: {
              shrink: true,
            },
          },
          field: "TextField",
          validation: {
            required: {
              value: true,
              message: "Introduce tu número de teléfono",
            },
            minLength: {
              value: 9,
              message: "El número de teléfono no es válido",
            },
            maxLength: {
              value: 15,
              message: "El número de teléfono no es válido",
            },
          },
          xs: 12,
          sm: 6,
        },
        /* Input preparado para cuando se pueda diferenciar el código de país
          {
          fieldProps: {
            name: "phone",
            label: "Teléfono",
            defaultCountry: "es",
            variant: "outlined",
            InputLabelProps: {
              shrink: true,
            },
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
        },*/
        {
          fieldProps: {
            name: "age",
            label: "Edad",
            type: "number",
            InputLabelProps: {
              shrink: true,
            },
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