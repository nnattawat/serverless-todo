const express = require('express');
const todos = require('./controllers/todos');

const router = express.Router();

router.get('/', function (req, res) {
  res.send('Hello World!')
});

// Todos
router.get('/todos/:todoId', todos.show);
router.post('/todos', todos.create);
router.get('/todos', todos.index);

module.exports = router;
