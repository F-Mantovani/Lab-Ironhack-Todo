// De novo importando o Router pra fazer a rota simplificada no app.js
const { Router } = require("express");
// Qual o modelo que vai ser utilizado nessa rota
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Facilitar utilização do router
const router = Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) throw new Error("User already exists");
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      passwordHash,
    });
    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      todos: newUser.todos,
    });
  } catch (error) {
    if (error.message === "User already exists") {
      res.status(400).json({ error: error.message });
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Email/password invalid");
    const verifyPassword = await bcrypt.compare(password, user.passwordHash);
    if (!verifyPassword) throw new Error("Email/password invalid");
    const payload = { email, user: user.name, userId: user._id };
    const token = jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: "1day",
    });
    res.status(200).json({ token, payload });
  } catch (error) {
    res.status(401).json(error.message);
  }
});

module.exports = router;
