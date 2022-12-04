import { db } from "../db.js";

export const getMats = (_, res) => {
  const q = "SELECT * FROM materias";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addMat = (req, res) => {
  const q =
    "INSERT INTO materias(`nombre`, `codigo`) VALUES(?)";

  const values = [
    req.body.nombre,
    req.body.codigo,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Registro de usuario");
  });
};

export const updateMat = (req, res) => {
  const q =
    "UPDATE materias SET `nombre` = ?, `codigo` = ? WHERE `id` = ?";

  const values = [
    req.body.nombre,
    req.body.codigo,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuario actualizado");
  });
};

export const deleteMat = (req, res) => {
  const q = "DELETE FROM materias WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuario eliminado");
  });
};