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
  const { field, fieldProps, validation, xs, sm, md, subField, linkTerms } = props;
  const name = fieldProps.name;

  //Valid components to display
  const components = {
    TextField,
    DatePicker,
    MuiPhoneNumber,
    FormControlLabel,
    InputMask,
  };
  const Field = components[field || "TextField"];
  const SubField = components[subField];

  //If field == check (terms of use). Disable errors props.
  //html5 validation for this input
  const errorProps = (name === "check") ? {} : {
    error: !!errors[name],
    helperText: errors[name]?.message
  }; 

  //Apply dateFormat when selected new date
  const onChangeDate = subField === "DatePicker" ? (date) =>
              date instanceof Date
                ? setValue(name, format(date, dateFormat))
                : setValue(name, date)
                : null;

  return (
    <Grid item xs={xs} sm={sm} md={md}>
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
