// IS_OFFLINE is set by serverless-offline plugin when running locally
const IS_OFFLINE = process.env.IS_OFFLINE;

const AWS = require('aws-sdk');

let dynamoDb;
if (IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  })

  console.log(dynamoDb);
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
}

module.exports = dynamoDb;
