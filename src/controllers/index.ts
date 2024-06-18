import * as fs from "fs"; //lib pra leitura de pastas dentro do SO
import * as path from "path";

module.exports = (app: any) => {
    //le todos arquivos da pasta controller
  fs.readdirSync(__dirname, { recursive: true }).forEach((file) => {
    //verifica se o arquivo tem um "." se o final é ".ts" ou ".js" dirname é variavel do node que retorna o diretorio
    if (
      file.indexOf(".") !== 0 &&
      (file.indexOf(".ts") > -1 || file.indexOf(".js") > -1) &&
      file !== "index.ts" &&
      file !== "index.js"
    ) {
        console.log(file.toString())
      require(path.resolve(__dirname, file.toString()))(app);
    }
  });
};