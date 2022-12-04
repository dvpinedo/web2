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

const Form = ({ getUsers, userEdit, setUserEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (userEdit) {
      const user = ref.current;

      user.nombre.value = userEdit.nombre;
      user.apellido.value = userEdit.apellido;
      user.email.value = userEdit.email;
    }
  }, [userEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nombre.value ||
      !user.apellido.value ||
      !user.email.value 
    ) {
      return toast.warn("Llene todos los campos");
    }

    if (userEdit) {
      await axios
        .put("http://localhost:8800/usuario/" + userEdit.id, {
          nombre: user.nombre.value,
          apellido: user.apellido.value,
          email: user.email.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/usuario/", {
          nombre: user.nombre.value,
          apellido: user.apellido.value,
          email: user.email.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nombre.value = "";
    user.apellido.value = "";
    user.email.value = "";

    setUserEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nombre</Label>
        <Input name="nombre" />
      </InputArea>
      <InputArea>
        <Label>Apellido</Label>
        <Input name="apellido" />
      </InputArea>
      <InputArea>
        <Label>Correo</Label>
        <Input name="email" type="email" />
      </InputArea>

      <Button type="submit">Guardar</Button>
    </FormContainer>
  );
};


export default Form;
