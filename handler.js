"use strict";

const { mongoClient } = require("./database");
var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const sns = new AWS.SNS();

//A lambda function that writes messages recieved by an sqs into a database
module.exports.save = async (event) => {
  const db = await mongoClient();

  for (const { body } of event && event.Records) {
    console.log("body :>> ", body);
    try {
      const data = JSON.parse(body);
      const message = JSON.parse(data.Message || body);
      await db.collection("Log").insertOne(message);
    } catch (e) {
      console.log("[processOrder Error] error:", JSON.stringify(e));
      console.log("[processOrder Error] event:", JSON.stringify(event));
      throw e;
    }

    return {
      statusCode: 200,
      body: JSON.stringify(event),
    };
  }
};
