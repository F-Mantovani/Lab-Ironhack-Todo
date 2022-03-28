// necesário pra construir as rotas fora do app.js e deixar mais legível a aplicação
const { Router } = require("express");

// O modelo que vai ser utilizado na rota;
const Todo = require("../models/Todo.js");
const User = require("../models/User.js");

// Execução do router em uma varíavel para facilitar a utilização
const router = Router();

router.post("/", async (req, res) => {
  const { userId } = req.user;
  const { title, completed } = req.body;
  try {
    const newTodo = await Todo.create({ title, completed, user: userId });
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { todos: newTodo._id } }
    );
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const todoList = await Todo.find().populate("user", "name");
    res.status(200).json(todoList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateInfo = req.body;
  const { userId } = req.user;
  try {
    let updatedTodo = await Todo.findById(id);
    if (updatedTodo.user.toString() !== userId) {
      throw new Error("You cannot update other's To Do's");
    }
    updatedTodo.title = updateInfo.title;
    updatedTodo.completed = updateInfo.completed;
    updatedTodo.save();
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const todo = await Todo.findById(id);
    if (todo.user.toString() !== userId) {
      const error = new Error("You can't delete other's To Do's");
      error.status = 401;
      throw error;
    }
    todo.delete();
    res.status(204).json();
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

module.exports = router;
