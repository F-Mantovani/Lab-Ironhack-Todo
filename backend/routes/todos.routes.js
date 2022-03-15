// necesário pra construir as rotas fora do app.js e deixar mais legível a aplicação
const { Router } = require("express");

// O modelo que vai ser utilizado na rota;
const Todo = require("../models/Todo.js");

// Execução do router em uma varíavel para facilitar a utilização
const router = Router();

router.post("/", async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const todoList = await Todo.find();
    res.status(200).json(todoList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateInfo = req.body;
  try {
    let updatedTodo = await Todo.findById(id);
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
  try {
    await Todo.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
