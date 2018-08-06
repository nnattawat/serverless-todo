const dynamoDb = require('../dynamodbClient');
const uuid = require('uuid');
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
      const { id, text, completed, createdAt, updatedAt } = item;
      return { id, text, completed, createdAt, updatedAt };
    });

    res.json(todos);
  });
};

todosController.show = (req, res) => {
  const params = {
    TableName: TODOS_TABLE,
    Key: {
      id: req.params.id,
    }
  }

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get user' });
    }
    if (result.Item) {
      const { id, text, completed, createdAt, updatedAt } = result.Item;
      res.json({ id, text, completed, createdAt, updatedAt });
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  });
};

todosController.create = (req, res) => {
  const {
    text
  } = req.body;

  if (typeof text !== 'string') {
    res.status(400).json({ error: '"text" must be a string' });
  }

  const todo = {
    text,
    completed: false,
    id: uuid.v1(),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime()
  };

  const params = {
    TableName: TODOS_TABLE,
    Item: todo
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create user' });
    }

    res.json(todo);
  });
};

module.exports = todosController;
