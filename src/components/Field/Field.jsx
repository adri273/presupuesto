import React from 'react';
import './Field.css';
import {
  TextField,
  Grid,
} from "@mui/material";


function Field(params) {
  const {props, register, errors} = params;
  const {field, name, label, type, validation, xs, sm} = props;

  const components = {
    TextField
  }
  const Field = components[field || "TextField"];

  return (
    <Grid item xs={xs} sm={sm}>
      <Field
        name={name}
        label={label}
        type={type}
        {...register(name, validation)}
        error={!!errors[name]}
        helperText={errors[name]?.message}
        fullWidth
      />
    </Grid>
  );
}

export default Field
