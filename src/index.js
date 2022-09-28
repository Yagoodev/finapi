const express = require('express');
const { v4: uuidv4 } = require('uuid');

const port = 3333;
const app = express();

app.use(express.json());

const costumers = [];

// Create new account with (CPF, Name, Id, Statement)

app.post("/account", (req, res) => {
  const id = uuidv4();
  const { cpf, name } = req.body;

  costumers.push({
    id,
    cpf,
    name,
    statement: []
  })

  return res.send("Account created successfully!");
});

app.listen(port);