const mongoose = require("mongoose");

const connect = async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`Database connected to: ${connection.connections[0].name}`);
};

module.exports = connect;
