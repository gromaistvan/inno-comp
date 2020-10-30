const path = require('path');
const mongo = require('mongodb');
const express = require('express');
const bodyParser = require("body-parser");
const multer = require('multer');

const port = process.env.PORT || 80;

const database = process.env.DB || 'mongodb://localhost:27017';

const app = express();

const upload = multer({ dest: 'uploads/', limits: { fileSize: 50*1024*1024 } });

app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use(express.static(`${process.cwd()}/app/`));

app.get('/api/file', (req, res) => res.sendFile(`${path.dirname(require.main.filename)}/uploads/${req.params.file}`));

app.post('/api/file', upload.single('file'), (req, res) => res.json({ id: req.file.filename }));

app.get('/api/applicant', async (_req, res) => {
  const client = new mongo.MongoClient(database, { useUnifiedTopology: true });
  try {
    await client.connect();
    const result = await client.db('inno-comp').collection('applicants').find({}).toArray();
    res.json(result);
  }
  finally {
    client.close();
  }
});

app.post('/api/applicant', async (req, res) => {
  const client = new mongo.MongoClient(database, { useUnifiedTopology: true });
  try {
    await client.connect();
    const result = await client.db('inno-comp').collection('applicants').insertOne(req.body);
    res.json(result);
  }
  finally {
    client.close();
  }
});

app.get('*', (_req, res) => {
  if (process.env.REDIRECT) {
    res.redirect(process.env.REDIRECT);
  }
  else {
    res.sendFile(`${process.cwd()}/app/index.html`);
  }
});

app.listen(port, () => console.log(`Server listening on the port ${port}.`));
