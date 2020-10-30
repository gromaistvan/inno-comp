const path = require('path');
const mongo = require('mongodb');
const express = require('express');
const bodyParser = require("body-parser");
const multer = require('multer');

const port = process.env.PORT || 80;

const database = process.env.DB || 'mongodb://localhost:27017';

const app = express();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, req.body.email + '.docx');
    }
    else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
      cb(null, req.body.email + '.pptx');
    }
    else {
      cb(new Error('Invalid file type!'), '');
    }
  }
})
const signupUpload =
  multer({ storage: storage, limits: { fileSize: 50*1024*1024 } })
  .fields([{ name: 'abstract', maxCount: 1 }, { name: 'presentation', maxCount: 1 }])

app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use(express.static(`${process.cwd()}/app/`));

app.get('/api/file', (req, res) => res.sendFile(`${path.dirname(require.main.filename)}/uploads/${req.params.file}`));

app.post('/api/file', (req, res) => {
  signupUpload(req, res, err =>{
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    else {
      res.status(500).send(err);
      //res.status(200).send('');
    }
  });
});

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
