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
import postUserData from "../../services/postUserData";
import Thanks from '../Thanks/Thanks'




function Form({ params }) {
  //initialData
  const { id } = params;
  const [userData, setUserData] = useState({});
  const [location, setLocation] = useLocation();
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [thanks, setThanks] = useState(false);

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
  
  
  const onSubmit = async (data) => {
    setErrorSubmit(false);
    const response = await postUserData(id, data); //Petición POST API
    if(response?.ok){
      //Recogemos los datos enviados para mostrarlos al usuario
      let aux = formData.flatMap((section) => {
        return section.inputs.map((el) => {
          return {
            label: el.fieldProps?.label,
            key: el.fieldProps?.name,
            value: data[el.fieldProps?.name],
          };
        });
      });
      setThanks(aux);
    }else{
      setErrorSubmit(true); //mostramos mensaje de error
    }
    
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="page">
        {thanks ? (
          <Thanks data={thanks} />
        ) : (
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
            {errorSubmit && (
              <p style={{ textAlign: "center" }}>
                Algo ha salido mal. Vuelve a intentarlo más tarde.
              </p>
            )}
          </form>
        )}
      </div>
    </LocalizationProvider>
  );
}

export default Form;
