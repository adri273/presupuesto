import React, {useState, useEffect} from 'react';
import './Field.css';
import { TextField, Grid, FormControlLabel } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import {Controller} from "react-hook-form";
import MuiPhoneNumber from "material-ui-phone-number";


function Field(params) {
  const {props, register, errors, control} = params;
  const { field, fieldProps, validation, xs, sm, subField, linkTerms } = props;
  const name = fieldProps.name;

  const components = {
    TextField,
    DatePicker,
    MuiPhoneNumber,
    FormControlLabel,
  };
  const Field = components[field || "TextField"];
  const SubField = components[subField];

  const errorProps = (name === "check") ? {} : {
    error: !!errors[name],
    helperText: errors[name]?.message
  }; 

  return (
    <Grid item xs={xs} sm={sm}>
      {field === "Controller" ? (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <SubField
                {...fieldProps}
                value={value}
                onChange={fieldProps.onChange || onChange}
                ref-setter={register(name, validation)}
                {...errorProps}
              />
              {linkTerms}
            </>
          )}
        />
      ) : (
        <Field
          {...fieldProps}
          {...register(name, validation)}
          {...errorProps}
          fullWidth
        />
      )}
    </Grid>
  );
}

export default Field
