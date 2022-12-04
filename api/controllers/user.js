import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM estudiante";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO estudiante(`nombre`, `apellido`, `email`) VALUES(?)";

  const values = [
    req.body.nombre,
    req.body.apellido,
    req.body.email,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Registro de usuario");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE estudiante SET `nombre` = ?, `apellido` = ?, `email` = ? WHERE `id` = ?";

  const values = [
    req.body.nombre,
    req.body.apellido,
    req.body.email,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuario actualizado");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM estudiante WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuario eliminado");
  });
};
