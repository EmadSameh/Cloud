const express = require("express");
const bodyParser = require("body-parser");
var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const port = process.argv.slice(2)[0];
const app = express();

app.use(bodyParser.json());

const sns = new AWS.SNS();

app.post("/subscribe", (req, res) => {
  let params = {
    Protocol: "SQS",
    TopicArn: "arn:aws:sns:us-east-1:587877384053:MyTopic.fifo",
    Endpoint: "arn:aws:sqs:us-east-1:587877384053:CDproject.fifo",
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

app.post("/publish", (req, res) => {
  let params = {
    Message: req.body.message,
    TopicArn: "arn:aws:sns:us-east-1:587877384053:MyTopic.fifo",
    MessageGroupId: "UserMessages",
  };

  sns.publish(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
});

app.get("/index", (req, res) => {
  res.send("Welcome to NodeShop Orders.");
});

console.log(`Orders service listening on port ${port}`);
app.listen(port);
