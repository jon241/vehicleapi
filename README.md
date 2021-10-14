# Vehicle API
I was asked to create a vehicle API for a technical test. So here we are!
These were the following requirements:

The simple API must
- Save vehicle data in DynamoDB.
- Retrieve vehicle data from DynamoDB.
- Code uploaded to GitHub.

Should have
- Input validation

Nice to have
- Unit tests
- Integration tests

I know what I want to have
- GitHub build to test API in all branches
- GitHub build to deploy to AWS from master branch then run integration tests
- Authentication to use the API

Assumptions:
- UK number plates only

### Other notes
Serverless Framework was an option, of which I have experience with plus the company use it themselves anyway.
I could be as creative as I liked with the vehicle data stored.
Should be possible to deploy to AWS free tier at no cost.

### Resources

Code largely based on this template
https://github.com/serverless/examples/tree/master/aws-node-http-api-dynamodb

Using HTTP API which is new to me, some uknown to provide a little risk.
https://www.serverless.com/framework/docs/providers/aws/events/http-api

Differences between HTTP and REST API
https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html

## How to use

### Locally
Visit `https://www.npmjs.com/package/serverless-dynamodb-local` to get to know local DDB more.
Note Originally I used `https://github.com/99x/serverless-dynamodb-client` plugin to avoid script logic to different environments but in the end I used Docker as based on this article `https://medium.com/geekculture/using-dynamodb-locally-in-a-serverless-framework-project-92c996fcffdf` to create a local DDB.

To manually test the API you need to create the DDB via Docker first.
`npm run up`
Then start Serverless (this includes starting dynamodb automatically)
`serverless offline start`

Do your thing...

To stop
Press Ctrl+C in command prompt window

To test locally I use Postman. For example,

```JSON
{
    "text": "test"
}
```

If you run `npm test` it will start the DDB docker image, create the database table OR not, run the tests, then stop the docker and the test run. Remember this if you have already started the DDB docker image.

## Production
To deploy I really wanted GitHub main branch to do it but I haven't been able to get it to work yet getting the AWS credentials. For now, I will use `serverless deploy --aws-profile sls-vehicle-api-admin` to deploy to AWS myself.

### To Do
- `GET /vehicles/{id}` return 404 when record not found
- `POST /vehicles` More validation for characters for the vehicle number plate.
- `POST /vehicles` More validation for range/min/max for the vehicle year.
- Much better logging and metrics.
- Refactor tests.
- Enable the environment variable DYNAMODB_TABLE to be used in the `create-tables-locally.js` script.
- Set dev.yaml to build all branches except main
- Write the missing test to capture the DDB error that return 501. This would probably need some injection OR some other way to simulate it.
- No doubt there is a lot more to do to make this better that I haven't thought of yet.