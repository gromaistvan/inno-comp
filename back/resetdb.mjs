import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
try {
  await client.connect();
  const db = client.db('inno-comp');
  const collections = await db.collections();
  let collection = collections.find(c => c.collectionName === 'applicants');
  if (collection) {
    collection.drop();
  }
  collection = await db.createCollection('applicants');
  console.log(collection.dbName);
  console.log(collection.collectionName);
  console.log(await collection.createIndex({ name: 1 }, { unique: true }));
  console.log(await collection.createIndex({ email: 1 }, { unique: true }));
}
catch (exp) {
  console.error(exp);
}
finally {
  client.close();
}
