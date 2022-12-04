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


const FormMat = ({ getMats, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const mat = ref.current;

      mat.nombre.value = onEdit.nombre;
      mat.codigo.value = onEdit.codigo;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mat = ref.current;

    if (
      !mat.nombre.value ||
      !mat.codigo.value 
    ) {
      return toast.warn("Llene todos los campos");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/materias/" + onEdit.id, {
          nombre: mat.nombre.value,
          codigo: mat.codigo.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/materias/", {
          nombre: mat.nombre.value,
          codigo: mat.codigo.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    mat.nombre.value = "";
    mat.codigo.value = "";

    setOnEdit(null);
    getMats();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nombre</Label>
        <Input name="nombre" />
      </InputArea>
      <InputArea>
        <Label>Codigo</Label>
        <Input name="codigo" />
      </InputArea>

      <Button type="submit">Guardar</Button>
    </FormContainer>
  );
};



export default FormMat;