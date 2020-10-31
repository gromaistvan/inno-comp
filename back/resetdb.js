db.applicants.drop();
db.createCollection('applicants', { autoIndexId: false });
db.applicants.createIndex({ name: 1 }, { unique: true });
db.applicants.createIndex({ email: 1 }, { unique: true });
