'use strict';

const uuid = require('uuid');
const DynamoDB = require('aws-sdk/clients/dynamodb');
// This snippet could go somewhere for reuse in all scripts.
const ddbClient = new DynamoDB.DocumentClient({
  service:
    typeof process.env.AWS_ACCESS_KEY_ID === 'undefined'
      ? new DynamoDB({
          accessKeyId: 'fake-key',
          endpoint: 'http://localhost:8001',
          region: 'local',
          secretAccessKey: 'fake-secret',
        })
      : new DynamoDB(),
});

module.exports.add = (event, context, callback) => {
  const timestamp = new Date().getTime();
  console.log(event);
  const data = JSON.parse(event.body);

  if (typeof data.text !== 'string') {
    console.error('Validation Failed');

    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t add the vehicle item.',
    });
    
    return;
  }

  const params = {
    TableName: "vehicle-api",//process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      text: data.text,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the vehicle to the database
  ddbClient.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);

      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t add the vehicle item.',
      });

      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };

    callback(null, response);
  });
};
