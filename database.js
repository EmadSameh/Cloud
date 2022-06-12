import { MongoClient } from "mongodb";

const mongoclient = require("mongodb").mongoclient;
let cacheddb = null;

const connectToDatabase = async () => {
  if (cacheddb) {
    console.log("Use existing connection");
    return Promise.resolve(cacheddb);
  } else {
    return MongoClient.connect(
      "mongodb+srv://admin:admin@cache.bysf2.mongodb.net/?retryWrites=true&w=majority"
    )
      .then((client) => {
        let db = client.db("cache");
        console.log("new database connection");
        cacheddb = db;
        return cacheddb;
      })
      .catch((err) => {
        console.log("connection error");
        console.log(err);
      });
  }
};

module.exports = {
  cacheddb,
};
