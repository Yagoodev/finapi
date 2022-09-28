const express = require('express');
const { v4: uuidv4 } = require('uuid');

const port = 3333;
const app = express();

app.use(express.json());

const costumers = [];

// Create new account with (CPF, Name, Id, Statement)

app.post("/account", (req, res) => {

  const { cpf, name } = req.body;
  
  const costumersAlredyExists = costumers.some(costumer => costumer.cpf === cpf);

  if(costumersAlredyExists) {
    return res.status(400).json({ error: "Account alredy exists!" })
  }

  costumers.push({
    id: uuidv4(),
    cpf,
    name,
    statement: []
  })

  return res.json({ message: "Account created successfully!"});
});

app.listen(port);