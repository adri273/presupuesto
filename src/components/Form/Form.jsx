import React, {useState, useEffect} from "react";
import "./Form.css";
import {Grid, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { useForm } from "react-hook-form";
import Field from "../Field/Field"
import getUserData from "../../services/getUserData";
import {formData, defaultData} from "../../data/FormData"


function Form({ params }) {
  const { id } = params;
  console.log(id);

  
  

  

  const [userData, setUserData] = useState({});

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: { ...defaultData },
  });

  useEffect(() => {
    getUserData(id).then(data => setUserData(data))
  }, [id]);

  useEffect(() => {
      reset({ ...defaultData, ...userData });
  }, [userData])

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="paper">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {formData.map(({ title, inputs }, i) => (
            <div key={i}>
              <h3>{title}</h3>
              <Grid container spacing={2}>
                {inputs.map((input, idx) => (
                  <Field
                    key={idx}
                    props={{ ...input }}
                    form={{ register, errors, control, setValue }}
                  />
                ))}
              </Grid>
            </div>
          ))}
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
