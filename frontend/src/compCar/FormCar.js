import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label`
text-align: center;
font-weight: bold;`
;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const FormCar = ({ getCars, carEdit, setCarEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (carEdit) {
      const car = ref.current;

      car.profesion.value = carEdit.profesion;
      car.semestre.value = carEdit.semestre;
    }
  }, [carEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const car = ref.current;

    if (
      !car.profesion.value ||
      !car.semestre.value 
    ) {
      return toast.warn("Llene todos los campos");
    }

    if (carEdit) {
      await axios
        .put("http://localhost:8800/carrera/" + carEdit.id, {
          profesion: car.profesion.value,
          semestre: car.semestre.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/carrera/", {
          profesion: car.profesion.value,
          semestre: car.semestre.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    car.profesion.value = "";
    car.semestre.value = "";

    setCarEdit(null);
    getCars();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Profesion</Label>
        <Input name="profesion" />
      </InputArea>
      <InputArea>
        <Label>Semestre</Label>
        <Input name="semestre" type="integer"/>
      </InputArea>

      <Button type="submit">Guardar</Button>
    </FormContainer>
  );
};

export default FormCar;