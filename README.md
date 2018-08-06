# Serverless API for todo app
Deploy a lambda function that running express server.

## Runing locally

```bash
# install packages
npm i

# create local dynamodb table, run this once
npm run db:create

# start server
# note that you need Java installed for running serverless-dynamodb-local
npm run start
```

## Deploy to AWS

You will need to setup AWS credential in your local machine. In my case I put them in `~/.aws/credentials`.

```bash
# deploy stack
npm run deploy
```

Sometimes you only want to upload new source code for your function without changing your stack.
```bash
# update function's code
npm run deploy:function
```

You can destroy the stack by running:
```bash
# remove stack
npm run destroy
```

Checking cloud watch for the deployed function
```bash
npm run log
```

## Testing endpoint
There is Postman script to test the endpoints. You can import files under `/postman` into Postman.
Select `local` environment to test locally or select `dev` environment to test remote endpoints. Please update the `baseURL` to your API gateway endpoint.

## Deploy multiple functions for different paths

Currently, all endpoints under `/` are deployed into one function.
This gives you benifit of preventing cold start in less frequently used path.
However, it is not good for monitoring error and performance for each path.
To do so, we can deploy the same code to another lambda function that handles specific path by changing in `serverless.yml` as the following:

```yaml
functions:
  app:
    handler: src/index.handler
    events:
      - http: ANY /
      - http: 'ANY {proxy+}'
  listTodos:
    handler: src/index.handler
    events:
      - http: 'GET /todos'
```
