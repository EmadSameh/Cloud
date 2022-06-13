"use strict";

const { mongoClient } = require("./database");

module.exports.save = async (event) => {
  console.log("here");
  //const data = JSON.parse(event.body);
  console.log("hi");
  console.log(event);
  const db = await mongoClient();
  if (!db) res.status(500).send("Mongo DB Unavailable");
  await db.collection("Log").insertOne(event);
  return {
    statusCode: 200,
    body: JSON.stringify(event),
  };
};

module.exports.test = (event) => {
  console.log("here");
};
