const dynamoDb = require('../../dynamodbClient');
const TODOS_TABLE = process.env.TODOS_TABLE;

module.exports = (req, res) => {
  const params = {
    TableName: TODOS_TABLE,
    Key: {
      id: req.params.id,
    }
  }

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get todo' });
    }
    if (result.Item) {
      const { id, text, completed, createdAt, updatedAt } = result.Item;
      res.json({ id, text, completed, createdAt, updatedAt });
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  });
}

