function App() {
    const [users, setUsers] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
  
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
  
    return (
      <>
        <Container>
          <Title>USUARIOS</Title>
          <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
          <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
        </Container>
        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
        <GlobalStyle />
      </>
    );
  }