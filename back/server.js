const mongo = require('mongodb');
const express = require('express');
const validator = require('express-validator');
const bodyParser = require('body-parser');
const multer = require('multer');
const email = require('./email');

const port = process.env.PORT || 8080;
const database = process.env.DB || 'mongodb://localhost:27017';

const dueDate = new Date(2020, 11, 1);

function checkDate() {
  if (new Date() >= dueDate) {
    throw new Error('Határidő túllépve!');
  }
}

const app = express();
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(express.static(`${process.cwd()}/app/`));

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
});
const signupUpload =
  multer({ storage: storage, limits: { fileSize: 50 * 1024 * 1024 } })
    .fields([{ name: 'abstract', maxCount: 1 }, { name: 'presentation', maxCount: 1 }]);

app.get('/api/file/:name', (req, res) => {
  res.sendFile(`${__dirname}/uploads/${req.params.name}`);
});

app.post('/api/file', (req, res) => {
  try {
    checkDate();
  }
  catch (error) {
    res.status(500).send(error);
    return;
  }
  signupUpload(req, res, error => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    }
    else {
      res.status(200).send('');
    }
  });
});

app.get('/api/applicant', async (_req, res) => {
  const client = new mongo.MongoClient(database, { useUnifiedTopology: true, autoReconnect: false, reconnectTries: 0, connectTimeoutMS: 1000 });
  try {
    await client.connect();
    const result = await client.db('inno-comp').collection('applicants').find({}).toArray();
    res.json(result);
  }
  catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  finally {
    client.close();
  }
});

app.post('/api/applicant', [
  validator.body('name')
    .exists().withMessage('A név megadása kötelező!')
    .isLength({ min: 5 }).withMessage('A név legyen legalább 5 hosszú!'),
  validator.body('email')
    .exists().withMessage('Az e-mail megadása kötelező!')
    .isLength({ min: 5 }).withMessage('Az e-mail legyen legalább 5 hosszú!')
    .isEmail().withMessage('Az e-mail cím formátuma nem megfelelő!'),
  validator.body('title')
    .exists().withMessage('A cím megadása kötelező!')
    .isLength({ min: 10 }).withMessage('A cím legyen legalább 10 hosszú!'),
  validator.body('company')
    .exists().withMessage('A cég megadása kötelező!')],
async (req, res) => {
  const errors = validator.validationResult(req);
  if (! errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const client = new mongo.MongoClient(database, { useUnifiedTopology: true });
  try {
    checkDate();
    await client.connect();
    const collection = client.db('inno-comp').collection('applicants');
    const result = await collection.insertOne(req.body);
    email.send(req.body.email, req.body.name);
    res.json(result);
  }
  catch (error) {
    console.error(error);
    res.status(500).json(error);
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
