import express from "express";
import Connection from "../database";
import jwt from "jsonwebtoken";
const router = express.Router();

export function generateToken(params = {}) {
  return jwt.sign(params, "chaveprivada", {
    expiresIn: 43200,
  });
}

router.post("/", async (req, res) => {
  const { email, senha } = req.body;
  try {
    Connection.query(
      "SELECT id, nome, email FROM usuarios WHERE email = ? AND senha = ?",
      [email, senha],
      function (error, results: any[]) {
        if (error === undefined || error === null) {
          if (results.length > 0) {
            return res.status(200).send({
              token: generateToken(results[0]),
            });
          } else {
            return res
              .status(400)
              .send({ message: "Senha ou usuário incorreto!" });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = (app: any) => app.use("/auth", router);
