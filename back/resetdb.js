(async function() {
  let exitCode = 0;
  const client = new require('mongodb').MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db('inno-comp');
    let collection = db.collection('applicants');
    collection.drop();
    collection = await db.createCollection('applicants');
    console.log(collection.dbName);
    console.log(collection.collectionName);
    console.log(await collection.createIndex({ name: 1 }, { unique: true }));
    console.log(await collection.createIndex({ email: 1 }, { unique: true }));
  }
  catch (exp) {
    console.error(exp);
    exitCode = -1;
  }
  finally {
    client.close();
    process.exit(exitCode);
  }
})();
