const express = require('express');
const {
  addTodo,
  listTodos,
  showTodo
} = require('./controllers/todos');

const router = express.Router();

router.get('/', function (req, res) {
  res.send('Hello World!!')
});

// Todos
router.get('/todos', listTodos);
router.get('/todos/:id', showTodo);
router.post('/todos', addTodo);

module.exports = router;
