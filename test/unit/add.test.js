const chai = require('chai');
const expect = chai.expect;
const lambdaFunc = require('../../vehicles/add');

describe('Add vehicle', function() {
    var _ctx = { awsRequestId: '1234567890' };

    it('should return statusCode 400 when the numberplate is not a string', function(done) {
        let evt = {
            body: JSON.stringify({   
                numberplate:  null,
                year: 2020
            })
        };
        
        lambdaFunc.add(evt, _ctx, function(other, resp){
            expect(resp, "response").to.not.equal(null);
            expect(resp.statusCode, "statusCode").to.equal(400);
            expect(resp.body, "body").to.equal('Couldn\'t add the vehicle item.');
            done();
        });
    });

    it('should return statusCode 400 when the numberplate has invalid characters', function(done) {
        let evt = {
            body: JSON.stringify({   
                numberplate: "AB12-CDE",
                year: 2020
            })
        };
        
        lambdaFunc.add(evt, _ctx, function(other, resp){
            expect(resp, "response").to.not.equal(null);
            expect(resp.statusCode, "statusCode").to.equal(400);
            expect(resp.body, "body").to.equal('Couldn\'t add the vehicle item.');
            done();
        });
    });

    it('should return statusCode 400 when the year is not a number', function(done) {
        let evt = {
            body: JSON.stringify({   
                numberplate:  "AB12CDE",
                year: null
            })
        };
        
        lambdaFunc.add(evt, _ctx, function(other, resp){
            expect(resp, "response").to.not.equal(null);
            expect(resp.statusCode, "statusCode").to.equal(400);
            expect(resp.body, "body").to.equal('Couldn\'t add the vehicle item.');
            done();
        });
    });

    it('should return statusCode 201 when the vehicle is created', function(done) {
        let evt = {
            body: JSON.stringify({   
                numberplate: "AB12CDE",
                year: 2020
            })
        };
        
        lambdaFunc.add(evt, _ctx, function(other, resp){
            expect(resp, "response").to.not.equal(null);
            expect(resp.statusCode, "statusCode").to.equal(201);
            expect(resp.body, "body").to.not.equal("");
            let parsedRespBody = JSON.parse(resp.body);
            expect(parsedRespBody.numberplate, "numberplate").is.equal("AB12CDE");
            expect(parsedRespBody.year, "year").is.equal(2020);
            done();
        });
    });
});
