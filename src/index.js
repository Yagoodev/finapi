const express = require('express');
const { v4: uuidv4 } = require('uuid');

const port = 3333;
const app = express();

app.use(express.json());

const costumers = [];

// Middleware

function verifyIfExistsAccount(request, response, next) {
  const { cpf } = request.headers;

  const costumer = costumers.find(costumer => costumer.cpf === cpf);

  if (!costumer) {
    return response.status(404).send('Costumer not found.');
  }

  // Passing costumer to request.
  request.costumer = costumer;

  return next();
}

// Create new account with (CPF, Name, Id, Statement)

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const costumersAlredyExists = costumers.some(costumer => costumer.cpf === cpf);

  if (costumersAlredyExists) {
    return response.status(400).json({ error: "Account alredy exists." })
  }

  costumers.push({
    id: uuidv4(),
    cpf,
    name,
    statement: []
  })

  return response.json({ message: "Account created successfully!" });
})

app.get("/statement", verifyIfExistsAccount, (request, response) => {
  const { costumer } = request;

  return response.json(costumer.statement);
})

app.post("/deposit", verifyIfExistsAccount, (request, response) => {
  const { costumer } = request;
  const { description, amount } = request.body;

  const statementOperation = {
    createdAt: new Date(),
    cpf: costumer.cpf,
    type: "credit",
    description,
    amount
  }

  costumer.statement.push(statementOperation);

  return response.status(201).json({ message: "Statement made has successfully" });
})

app.listen(port);