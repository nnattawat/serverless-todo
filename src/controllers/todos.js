const dynamoDb = require('../dynamodbClient');
const TODOS_TABLE = process.env.TODOS_TABLE;

const todosController = {};

todosController.index = (req, res) => {
  const params = {
    TableName: TODOS_TABLE
  }

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get user' });
    }

    const todos = result.Items.map(item => {
      const { todoId, text, completed } = item;
      return {
        todoId,
        text,
        completed
      };
    });

    res.json(todos);
  });
};

todosController.show = (req, res) => {
  const params = {
    TableName: TODOS_TABLE,
    Key: {
      todoId: req.params.todoId,
    },
  }

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get user' });
    }
    if (result.Item) {
      const { todoId, text, completed } = result.Item;
      res.json({ todoId, text, completed });
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  });
};

todosController.create = (req, res) => {
  const {
    completed = false,
    text,
    todoId
  } = req.body;

  if (typeof todoId !== 'string') {
    res.status(400).json({ error: '"todoId" must be a string' });
  } else if (typeof text !== 'string') {
    res.status(400).json({ error: '"text" must be a string' });
  }

  const params = {
    TableName: TODOS_TABLE,
    Item: {
      completed,
      text,
      todoId
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create user' });
    }

    res.json({
      completed,
      todoId,
      text
    });
  });
};

module.exports = todosController;
