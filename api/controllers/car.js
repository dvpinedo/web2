import { db } from "../db.js";

export const getCars = (_, res) => {
  const q = "SELECT * FROM carrera";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addCar = (req, res) => {
  const q =
    "INSERT INTO carrera(`profesion`, `semestre`) VALUES(?)";

  const values = [
    req.body.profesion,
    req.body.semestre,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Registro de usuario");
  });
};

export const updateCar = (req, res) => {
  const q =
    "UPDATE carrera SET `profesion` = ?, `semestre` = ? WHERE `id` = ?";

  const values = [
    req.body.profesion,
    req.body.semestre,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuario actualizado");
  });
};

export const deleteCar = (req, res) => {
  const q = "DELETE FROM carrera WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuario eliminado");
  });
};