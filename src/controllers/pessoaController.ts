import express from "express";
import Connection from "../database";
import createAuthMiddleware, { IMyRequest } from "../middlewares/auth";
import { formatarData } from "../utils/formatarData";
const router = express.Router();

// Rota para criar uma nova pessoa
router.use(createAuthMiddleware);

//criar pessoa
router.post("/", async (req: IMyRequest, res) => {
  const { nome, idade, data_nascimento, telefone, email, cpf } = req.body;

  // Formata a data de nascimento se não for nula
  const dataFormatada = data_nascimento ? formatarData(data_nascimento) : null;

  try {
    console.log(`usuario de criação ${req.nome}`);
    Connection.query(
      "INSERT INTO pessoas (nome, idade, data_nascimento, telefone, email, cpf) VALUES (?, ?, ?, ?, ?, ?)",
      [nome, idade, dataFormatada, telefone, email, cpf],
      function (error) {
        if (error === undefined || error === null) {
          return res.status(200).send({
            message: "Pessoa cadastrada com sucesso!",
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

//Obter todas as pessoas
router.get("/", async (req, res) => {
  try {
    Connection.query("select * from pessoas", function (error, results) {
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

//Obter pessoa específica
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    Connection.query(
      "SELECT * from pessoas WHERE id = ?",
      [id],
      function (error, results) {
        if (error === null) {
          return res.status(200).send(results);
        } else {
          return res.status(400).send(error);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//Update de dados
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { nome, idade, data_nascimento, telefone, email, cpf } = req.body;

  // Função para formatar data
  // const formatarData = (date:any) => {
  //   const [day, month, year] = date.split('/');
  //   return `${year}-${month}-${day}`;
  // };

  // Formata a data de nascimento se não for nula
  const dataFormatada = data_nascimento ? formatarData(data_nascimento) : null;

  try {
    Connection.query(
      "UPDATE pessoas SET nome = ?, idade = ?, data_nascimento = ?, telefone = ?, email = ?, cpf = ? WHERE id = ?",
      [nome, idade, dataFormatada, telefone, email, cpf, id],
      function (error, results) {
        console.log(error);
        if (error) {
          return res.status(400).send({
            message: "Erro ao atualizar a pessoa",
            error: error.message,
          });
        }

        return res.status(200).send({
          message: "Pessoa atualizada com sucesso!",
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//Deletar dados
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    Connection.query(
      "DELETE FROM pessoas WHERE id = ?",
      [id],
      function (error) {
        console.log(error);
        if (error === null) {
          return res.status(200).send({
            message: "Pessoa removida com sucesso!",
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

module.exports = (app: any) => app.use("/pessoas", router);
