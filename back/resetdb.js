const mongodb = require('mongodb');

const uri = 'mongodb://localhost:27017';

const client = new mongodb.MongoClient(uri);

client.connect((err) => {
  if (err) {
    console.error(err);
  }
  else {
    const db = client.db('inno-comp');
    const collection = db.collection('applicants');
    collection.drop();
    db.createCollection('applicants', { autoIndexId: false }).then(collection => {
      collection.createIndex({ name: 1 }, { unique: true });
      collection.createIndex({ email: 1 }, { unique: true });
    });
  }
  client.close();
});
