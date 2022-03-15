require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.config");

// para conectar na database => a configuração ta na outra pasta
connectDB();

const app = express();

// Permitir que o express leia .json => antigo bodyParser
app.use(express.json());
app.use(cors());

app.use("/todo", require("./routes/todos.routes"));

app.listen(process.env.PORT, () => {
  console.log(`server running on: ${process.env.PORT}`);
});
