'use strict';

const { mongoClient } = require('./database')

module.exports.save = (event,context) => {
  const db = await mongoClient();
  if (!db) res.status(500).send('Mongo DB Unavailable');
  await db.collection('Log').insertOne(context);

  return {
    statusCode: 200,
    body: JSON.stringify(context),
  };
};
