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
  console.debug(event);
  const timestamp = new Date().getTime();
  const protocol = event.headers['x-forwarded-proto'];
  const data = JSON.parse(event.body);
  var validCharacters = /^[0-9a-zA-Z]+$/;

  if (typeof data.numberplate !== 'string' ||
      !data.numberplate.match(validCharacters)) {
    console.error('Validation Failed, %s', JSON.stringify(data));

    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Number plate is invalid.',
    });
    
    return;
  }
  else if (typeof data.year !== 'number' ||
      data.year > new Date().getFullYear()) {
    console.error('Validation Failed, %s', JSON.stringify(data));

    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Year is invalid.',
    });
    
    return;
  }

  const params = {
    TableName: "vehicle-api",//process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      numberplate: data.numberplate,
      year: data.year,
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
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Location: `${protocol}://${event.headers.host}/vehicles/${params.Item.id}`
      }),
    };

    callback(null, response);
  });
};
