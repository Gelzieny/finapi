const express = require('express');
const {v4: uuid} = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

//Midleware
function verifyExstsActiontCPF(req, res, next) {
  const { cpf } = req.headers;
  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return res.status(400).json({ error: 'Customer not found' });
  }

  req.customer = customer;

  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === 'credit') {
      return acc + operation.amount;
    } else{
      return acc - operation.amount;
    }
  }, 0);
  return balance;
}

/**
  * cpf: string
  * name: string
  * id: uuid
  * statement: []
 */
app.post('/account', (req, res) => {
  const { cpf, name } = req.body;

  const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);
  
  if(customerAlreadyExists) {
    return res.status(400).json({
      error: 'Customer already exists'
    });
  }

  const id = uuid();

  customers.push({
    id:uuid(),
    cpf,
    name,
    statement: []
  });
  return res.status(201).send();
});

// app.use(verifyExstsActiontCPF);

app.get('/statement', verifyExstsActiontCPF, (req, res) => {
  const { customer } = req;

  return res.json(customer.statement);
});

app.post('/deposit', verifyExstsActiontCPF, (req, res) => {
  const {description, amount} = req.body;
  const { customer } = req;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit'
  };

  customer.statement.push(statementOperation);

  return res.status(201).json(statementOperation);
  
});

app.post("/withdraw", verifyExstsActiontCPF, (req, res) => {
  const {description, amount} = req.body;
  const { customer } = req;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return res.status(400).json({
      error: 'Insufficient balance'
    });
  }

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'debit'
  };

  customer.statement.push(statementOperation);

  return res.status(201).json(statementOperation);
});

app.get('/statement/date', verifyExstsActiontCPF, (req, res) => {
  const { customer } = req;
  const { date } = req.query;

  const dateFormatted = new Date(date + " 00:00:00");

  const statement = customer.statement.filter((operation) => {
    const operationDate = new Date(operation.created_at);
    return operationDate >= dateFormatted;
  });
  return res.json(statement);
});

app.put("/account", verifyExstsActiontCPF, (req, res) => {
  const { customer } = req;
  const { name } = req.body;

  customer.name = name;

  return res.status(200).json(customer);

});


app.get('/account', verifyExstsActiontCPF, (req, res) => {
  const { customer } = req;
  return res.json(customer);
});

app.delete("/account", verifyExstsActiontCPF, (req, res) => {
  const { customer } = req;

  customers.splice(customer, 1);

  return res.status(200).json(customers);
});

app.get("/balance", verifyExstsActiontCPF, (req, res) => {
  const { customer } = req;
  const balance = getBalance(customer.statement);
  return res.json(balance);
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});