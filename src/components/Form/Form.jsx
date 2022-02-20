import React, {useState, useEffect} from "react";
import "./Form.css";
import {Grid, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { useForm } from "react-hook-form";
import Field from "../Field/Field"
import getUserData from "../../services/getUserData";
import {formData, defaultData} from "../../data/FormData"
import { useLocation } from "wouter";


function Form({ params }) {
  //initialData
  const { id } = params;
  const [userData, setUserData] = useState({});
  const [location, setLocation] = useLocation();


  //useForm methods
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
    const fetchData = async () => {
      const initialData = await getUserData(id);  //get user data from API
      if (Object.keys(initialData).length){
        setUserData(initialData);
      }else{
        setLocation("/"); //redirect to home (404 message)
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    if(userData){
        reset({ ...defaultData, ...userData }); //update form data with userData
      }
  }, [userData, reset])
  
  
  const onSubmit = (data) => {
    console.log(data);
    //TODO: POST api form data
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="paper">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {formData.map(({ title, inputs }, i) => (
            <div key={i} className="form__section">
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
