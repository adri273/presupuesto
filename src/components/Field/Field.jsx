import React, {useState, useEffect} from 'react';
import './Field.css';
import {
  TextField,
  Grid,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";


function Field(params) {
  const {props, register, errors, onChange} = params;
  const {field, fieldProps, validation, xs, sm} = props;
  const name = fieldProps.name;

  const components = {
    TextField,
    DatePicker,
  };
  const Field = components[field || "TextField"];

  //const [selectedDate, handleDateChange] = useState(fieldProps.minDate);


  return (
    <Grid item xs={xs} sm={sm}>
      {field === "DatePicker" ? (
        <Field
          {...fieldProps}
          name={name}              
          renderInput={(params) => (
            <TextField
              {...params}
              {...register(name, validation)}
              error={!!errors[name]}
              helperText={errors[name]?.message}
              fullWidth
            />
          )}
          fullWidth
        />
      ) : (
        <Field
          {...fieldProps}
          {...register(name, validation)}
          error={!!errors[name]}
          helperText={errors[name]?.message}
          fullWidth
        />
      )}
    </Grid>
  );
}

export default Field
