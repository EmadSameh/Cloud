const express = require("express");
const bodyParser = require("body-parser");
var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const port = process.argv.slice(2)[0];
const app = express();

app.use(bodyParser.json());

const sns = new AWS.SNS();

//establish connection between sns and sqs
app.post("/subscribe", (req, res) => {
  let params = {
    Protocol: "SQS",
    TopicArn: "arn:aws:sns:us-east-1:587877384053:myTopic2",
    Endpoint: "arn:aws:sqs:eu-central-1:587877384053:myQ2",
  };

  sns.subscribe(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

//send to sns
app.post("/publish", (req, res) => {
  let params = {
    Message: req.body.message,
    TopicArn: "arn:aws:sns:us-east-1:587877384053:myTopic2",
  };
  sns.publish(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
  return {
    statusCode: 200,
    message: "successfully processed message",
  };
});

console.log(`Orders service listening on port ${port}`);
app.listen(port);
