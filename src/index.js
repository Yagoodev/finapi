const express = require('express');
const { v4: uuidv4 } = require('uuid');

const port = 3333;
const app = express();

app.use(express.json());

const costumers = [];

// Middleware

function verifyIfExistsAccount(req, res, next) {
  const { cpf } = req.params;

  const costumer = costumers.find(costumer => costumer.cpf === cpf);

  if (!costumer) {
    return res.status(401).send('Costumer not found.');
  }

  // Passing costumer to request.
  req.costumer = costumer;

  return next();
}

// Create new account with (CPF, Name, Id, Statement)

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;

  const costumersAlredyExists = costumers.some(costumer => costumer.cpf === cpf);

  if (costumersAlredyExists) {
    return res.status(400).json({ error: "Account alredy exists." })
  }

  costumers.push({
    id: uuidv4(),
    cpf,
    name,
    statement: []
  })

  return res.json({ message: "Account created successfully!" });
})

app.get("/statement/:cpf", verifyIfExistsAccount, (req, res) => {
  const { costumer } = req;

  return res.json(costumer.statement);
})

app.listen(port);