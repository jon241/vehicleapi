const chai = require('chai');
const expect = chai.expect;
const lambdaFunc = require('../../vehicles/get');

describe('Get vehicle', function() {
    var _ctx = { awsRequestId: '1234567890' };

    it('should return statusCode 404 when the vehicle is not found', function(done) {
        let evt = {
            pathParameters: {
                id: "all-the-gear-no-id-er"
            }
        };
        
        lambdaFunc.get(evt, _ctx, function(other, resp){
            expect(resp, "response").to.not.equal(null);
            expect(resp.statusCode, "statusCode").to.equal(404);
            expect(resp.body, "body").to.equal('Vehicle not found.');
            done();
        });
    });

    it('should return statusCode 200 when the vehicle is found', function(done) {
        let evt = {
            pathParameters: {
                id: "the-1d-that-3x1sts"
            }
        };
        
        lambdaFunc.get(evt, _ctx, function(other, resp){
            expect(resp, "response").to.not.equal(null);
            expect(resp.statusCode, "statusCode").to.equal(200);
            expect(resp.body, "body").to.not.equal("");
            let parsedRespBody = JSON.parse(resp.body);
            expect(parsedRespBody.numberplate, "numberplate").is.equal("XY12CDE");
            expect(parsedRespBody.year, "year").is.equal(2020);
            done();
        });
    });
});
