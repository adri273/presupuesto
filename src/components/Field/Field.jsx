import React from 'react';
import './Field.css';
import { TextField, Grid, FormControlLabel } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import {Controller} from "react-hook-form";
import MuiPhoneNumber from "material-ui-phone-number";
import InputMask from "react-input-mask";
import { format } from "date-fns";
import {dateFormat} from "../../data/FormData"

function Field(params) {
  const {props, form} = params;
  const {register, errors, control, setValue} = form;
  const { field, fieldProps, validation, xs, sm, subField, linkTerms } = props;
  const name = fieldProps.name;

  const components = {
    TextField,
    DatePicker,
    MuiPhoneNumber,
    FormControlLabel,
    InputMask,
  };
  const Field = components[field || "TextField"];
  const SubField = components[subField];

  const errorProps = (name === "check") ? {} : {
    error: !!errors[name],
    helperText: errors[name]?.message
  }; 

  const onChangeDate = subField === "DatePicker" ? (date) =>
              date instanceof Date
                ? setValue(name, format(date, dateFormat))
                : setValue(name, date)
                : null;

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
                onChange={
                  fieldProps.onChange || onChangeDate || onChange
                }
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
