import express from "express";
import Connection from "../database";
const router = express.Router();

// Rota para criar um novo usuario
router.post("/", async (req, res) => {
  const { nome, email, senha  } = req.body;
  try {
    Connection.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha],
      function (error) {
        if (error === undefined || error === null) {
          return res.status(200).send({
            message: "Usuário cadastrada com sucesso!",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    Connection.query("SELECT id, nome, email FROM usuarios", function (error, results) {
      console.log(error);
      if (error === null) {
        return res.status(200).send(results);
      } else {
        return res.status(400).send(error);
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      Connection.query(
        "SELECT FROM usuarios WHERE id = ?", [id],
        function (error, results) {
      if (error === null) {
        return res.status(200).send(results);
      } else {
        return res.status(400).send(error);
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put("/", async (req, res) => {
  const { id,  nome, email, senha } = req.body;

  try {
    Connection.query(
        'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?', [nome, email, senha, id],
      function (error, results) {
        console.log(error);
        if (error === null) {
          return res.status(200).send({
            message: "Usuario atualizado com sucesso!"
          });
        } else {
          return res.status(400).send(error);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    Connection.query(
      "DELETE FROM usuarios WHERE id = ?", [id],
      function (error) {
        console.log(error);
        if (error === null) {
          return res.status(200).send({
            message:"Usuário removido com sucesso!"
          });
        } else {
          return res.status(400).send(error);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = (app: any) => app.use("/usuarios", router);
