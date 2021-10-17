const chai = require('chai');
const expect = chai.expect;
const lambdaFunc = require('../../vehicles/add');

describe('Add vehicle', function() {
    var _ctx = { awsRequestId: '1234567890' };

    it('should return statusCode 400 when the numberplate is not a string', function(done) {
        let evt = {
            headers: {
                host: 'localhost:3000',
                'x-forwarded-proto': 'http'
            },
            body: JSON.stringify({   
                numberplate:  null,
                year: 2020
            })
        };
        
        lambdaFunc.add(evt, _ctx, function(other, resp){
            expect(resp, "response").to.not.equal(null);
            expect(resp.statusCode, "statusCode").to.equal(400);
            expect(resp.body, "body").to.equal('Number plate is invalid.');
            done();
        });
    });

    it('should return statusCode 400 when the numberplate has invalid characters', function(done) {
        let evt = {
            headers: {
                host: 'localhost:3000',
                'x-forwarded-proto': 'http'
            },
            body: JSON.stringify({   
                numberplate: "AB12-CDE",
                year: 2020
            })
        };
        
        lambdaFunc.add(evt, _ctx, function(other, resp){
            expect(resp, "response").to.not.equal(null);
            expect(resp.statusCode, "statusCode").to.equal(400);
            expect(resp.body, "body").to.equal('Number plate is invalid.');
            done();
        });
    });

    it('should return statusCode 400 when the year is not a number', function(done) {
        let evt = {
            headers: {
                host: 'localhost:3000',
                'x-forwarded-proto': 'http'
            },
            body: JSON.stringify({   
                numberplate:  "AB12CDE",
                year: null
            })
        };
        
        lambdaFunc.add(evt, _ctx, function(other, resp){
            expect(resp, "response").to.not.equal(null);
            expect(resp.statusCode, "statusCode").to.equal(400);
            expect(resp.body, "body").to.equal('Year is invalid.');
            done();
        });
    });

    it('should return statusCode 400 when the year is greater than this year', function(done) {
        let evt = {
            headers: {
                host: 'localhost:3000',
                'x-forwarded-proto': 'http'
            },
            body: JSON.stringify({   
                numberplate:  "AB12CDE",
                year: new Date().getFullYear()+1
            })
        };
        
        lambdaFunc.add(evt, _ctx, function(other, resp){
            expect(resp, "response").to.not.equal(null);
            expect(resp.statusCode, "statusCode").to.equal(400);
            expect(resp.body, "body").to.equal('Year is invalid.');
            done();
        });
    });

    it('should return statusCode 201 when the vehicle is created', function(done) {
        let evt = {
            headers: {
                host: 'localhost:3000',
                'x-forwarded-proto': 'http'
            },
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
            // To enable thorough checking of the Location at this point requires a little bit 
            // more work.
            expect(parsedRespBody.Location, "Location").contains("http://").and.contains("/vehicles/");
            done();
        });
    });
});
