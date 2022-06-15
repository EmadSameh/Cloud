"use strict";

var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const sns = new AWS.SNS();

module.exports.publish = async (event) => {
  const params = {
    Message: event.body,
    TopicArn: "arn:aws:sns:us-east-1:587877384053:myTopic2",
  };
  await sns.publish(params).promise();
  return {
    statusCode: 200,
    body: "successfully processed message",
  };
};
