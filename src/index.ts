// src/index.ts
import express from "express";
import cors from "cors";
const app = express();
const port = 3001;

app.use(cors());

app.use(express.json() as express.RequestHandler);
require("./controllers/index")(app); // chama o index da pasta controller e subir as rotas

app.listen(port, (error?:Error) => {
    if (error) {
        console.log("Erro ao iniciar o servidor:", error);
        return;
    }
    console.log(`Servidor iniciado na porta ${port}`);
});
