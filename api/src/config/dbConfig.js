const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoCluster = process.env.MONGO_CLUSTER;

const mongoConnString = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.68qmd.mongodb.net/?retryWrites=true&w=majority&appName=${mongoCluster}`;
module.exports = mongoConnString;
