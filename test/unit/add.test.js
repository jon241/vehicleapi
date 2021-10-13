const chai = require('chai');
const expect = chai.expect;
const lambdaFunc = require('../../vehicles/add');

describe('Add vehicle', function() {
    var _ctx = { awsRequestId: '1234567890' };

    it('should return statusCode 400 when the data is not a string', function(done) {
        let evt = {
            body: JSON.stringify({   
                text:  null
            })
        };
        
        lambdaFunc.add(evt, _ctx, function(other, resp){
            expect(resp, "response").to.not.equal(null);
            expect(resp.statusCode, "statusCode").to.equal(400);
            expect(resp.body, "body").to.equal('Couldn\'t add the vehicle item.');
            done();
        });
    });

    it('should return statusCode 200 when the vehicle is created', function(done) {
        let evt = {
            body: JSON.stringify({   
                text: "i am a string"
            })
        };
        
        lambdaFunc.add(evt, _ctx, function(other, resp){
            expect(resp, "response").to.not.equal(null);
            expect(resp.statusCode, "statusCode").to.equal(200);
            expect(resp.body, "body").to.not.equal("");
            let parsedRespBody = JSON.parse(resp.body);
            expect(parsedRespBody.text, "text").is.equal("i am a string");
            done();
        });
    });
});
