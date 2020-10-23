const express = require('express');
const bodyParser = require("body-parser");

const port = 3080;
const users = [];
const app = express();

app.use(bodyParser.json());
app.use(express.static(`${process.cwd()}/app/`));

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  users.push(user);
  res.json("user addedd");
});

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + "/my-app/dist/angular-nodejs-example/index.html")
});

app.listen(port, () => {
  console.log(`Server listening on the port ${port}.`);
});
