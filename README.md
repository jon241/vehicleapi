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