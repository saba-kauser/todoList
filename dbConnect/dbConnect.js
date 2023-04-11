const { MongoClient } = require("mongodb");

// Connection URL to the MongoDB database.
const localurl = "mongodb://localhost:27017"; //localurl of mongodb
const clientdb = new MongoClient(localurl);

let db;
let connection;

//mongodb connection function
const connectDb = async (dbName) => {
  try {
    connection = await clientdb.connect(); // Connect to the MongoDB database.
    db = connection.db(dbName);   //takes the database name that has been passed in index.js file
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

//gets the connected mongodb
const getDb = () => {
  try {
    return db;
  } catch (error) {
    console.error(error);
  }
};

//closes connection
const closeConnection = async () => {
  await connection.close();
};

module.exports = {
  getDb,
  connectDb,
  closeConnection,
};
