require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.config");

// para conectar na database => a configuração ta na outra pasta
connectDB();

const app = express();

// Permitir que o express leia .json => antigo bodyParser
app.use(express.json());
// Permitir que outros lugares chamem essa API
app.use(cors());

// rotas da aplicação
//Rota Pública
app.use("/auth", require("./routes/auth.routes"));

//Rota Privada, pois vai usar o Middleware
app.use(require("./middlewares/authorize.middleware"));
app.use("/todo", require("./routes/todos.routes"));

app.listen(process.env.PORT, () => {
  console.log(`server running on: ${process.env.PORT}`);
});
