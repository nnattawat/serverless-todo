const dynamoDb = require('../../dynamodbClient');
const TODOS_TABLE = process.env.TODOS_TABLE;

module.exports = (req, res) => {
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
