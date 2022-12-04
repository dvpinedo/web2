import GlobalStyle from "./styles/global";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import FormMat from "./compMat/FormMat.js";
import GridMat from "./compMat/GridMat.js";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js"
import FormCar from "./compCar/FormCar";
import GridCar from "./compCar/GridCar";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [mats, setMats] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const [users, setUsers] = useState([]);
  const [userEdit, setUserEdit]= useState(null)

  const [cars, setCars]=useState([]);
  const [carEdit, setCarEdit] = useState(null)
  

  const getCars = async () => {
    try {
      const res = await axios.get("http://localhost:8800/carrera/");
      setCars(res.data.sort((a, b) => (a.profesion > b.profesion ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getCars();
  }, [setCars]);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800/usuario/");
      setUsers(res.data.sort((a, b) => (a.nombre > b.nombre ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, [setUsers]);

  const getMats = async () => {
    try {
      const res = await axios.get("http://localhost:8800/materias/");
      setMats(res.data.sort((a, b) => (a.nombre > b.nombre ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getMats();
  }, [setMats]);

  return (
    <>
      <Container>
        <Title>Materia</Title>
        <FormMat onEdit={onEdit} setOnEdit={setOnEdit} getMats={getMats} />
        <GridMat setOnEdit={setOnEdit} mats={mats} setMats={setMats} />

        <Title>Usuario</Title>
        <Form userEdit={userEdit} setOnEdit={setOnEdit} getMats={getMats}/>
        <Grid setUserEdit={setUserEdit} users={users} setUsers={setUsers}/>

        <Title>Carrera</Title>
        <FormCar carEdit={carEdit} setCarEdit={setCarEdit} getCars={getCars}/>
        <GridCar setCarEdit={setCarEdit} cars={cars} setCars={setCars} />
        
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
