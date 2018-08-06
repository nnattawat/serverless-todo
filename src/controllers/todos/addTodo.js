const dynamoDb = require('../../dynamodbClient');
const uuid = require('uuid');
const TODOS_TABLE = process.env.TODOS_TABLE;

module.exports = (req, res) => {
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
}
