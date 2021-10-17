'use strict';

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

module.exports.get = (event, context, callback) => {
  console.debug(event);

  const params = {
    TableName: "vehicle-api",//process.env.DYNAMODB_TABLE,
    Key: {
      id: `${event.pathParameters.id}`
    }
  }

  // write the vehicle to the database
  var result = ddbClient.get(params, function(error, data) {
    // handle potential errors
    if (error) {
      console.error(error);

      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Vehicle not found.',
      });

      return;
    }else{
      console.log(data)
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numberplate: data.Item.numberplate,
        year: data.Item.year
      })
    };

    callback(null, response);
  });
};
