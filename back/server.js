const mongo = require('mongodb');
const express = require('express');
const bodyParser = require("body-parser");
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use(express.static(`${process.cwd()}/app/`));

app.get('/', (_req, res) => {
  if (process.env.REDIRECT) {
    res.redirect(process.env.REDIRECT);
  }
  else {
    res.sendFile(`${process.cwd()}/app/index.html`);
  }
});

app.post('/api/upload', upload.single('file'), (req, res) => {
    res.json({ id: req.file.filename });
});

app.get('/api/applicant', async (_req, res) => {
  const client = new mongo.MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
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
  const client = new mongo.MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
  try {
    await client.connect();
    const result = await client.db('inno-comp').collection('applicants').insertOne(req.body);
    res.json(result);
  }
  finally {
    client.close();
  }
});

app.listen(process.env.PORT, () => console.log(`Server listening on the port ${process.env.PORT}.`));
