const superagent = require('superagent');
const chai = require('chai');
const expect = chai.expect;

describe('Vehicle scenarios', function() {
    var baseUrl = 'https://tahgr7kt1l.execute-api.eu-west-1.amazonaws.com/vehicles';

    it('should return statusCode 400 when the numberplate is not a string', function(done) {
        let params = {   
            numberplate:  null,
            year: 2020
        };

        superagent.post(baseUrl)
        .send(params)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            expect(err.status, "statusCode").to.equal(400);
            expect(err.response.text, "body").to.equal('Number plate is invalid.');
        });

        done();
    });

    it('should return statusCode 400 when the numberplate has invalid characters', function(done) {
        let params = {   
            numberplate:  "AB12-CDE",
            year: 2020
        };

        superagent.post(baseUrl)
        .send(params)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            expect(err.status, "statusCode").to.equal(400);
            expect(err.response.text, "body").to.equal('Number plate is invalid.');
        });

        done();
    });

    it('should return statusCode 400 when the year is not a number', function(done) {
        let params = {   
            numberplate:  "AB12CDE",
            year: null
        };

        superagent.post(baseUrl)
        .send(params)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            expect(err.status, "statusCode").to.equal(400);
            expect(err.response.text, "body").to.equal('Year is invalid.');
        });

        done();
    });

    it('should return statusCode 400 when the year is greater than this year', function(done) {
        let params = {   
            numberplate: "AB12CDE",
            year: new Date().getFullYear()+1
        };

        superagent.post(baseUrl)
        .send(params)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            expect(err.status, "statusCode").to.equal(400);
            expect(err.response.text, "body").to.equal('Year is invalid.');
        });

        done();
    });

    it('should return statusCode 201 when the vehicle is created', function(done) {
        let params = {   
            numberplate: "AB12CDE",
            year: 2020
        };

        superagent.post(baseUrl)
        .send(params)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            console.log(res);
            expect(res.status, "statusCode").to.equal(201);
            // To enable thorough checking of the Location at this point requires a little bit 
            // more work.
            expect(res.body.Location, "Location").contains(baseUrl);
        });

        done();
    });

    it('should return statusCode 200 when the vehicle is returned', function(done) {
        let params = {   
            numberplate: "AB12CDE",
            year: 2020
        };

        superagent.post(baseUrl)
        .send(params)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            console.log(res);
            expect(res.status, "statusCode").to.equal(201);
            // To enable thorough checking of the Location at this point requires a little bit 
            // more work.
            expect(res.body.Location, "Location").contains(baseUrl);

            superagent.get(res.body.Location)
            .set("Accept", "application/json")
            .end((err, res) => {
                console.log(res);
                expect(res.status, "statusCode").to.equal(200);
                expect(res.body.numberplate, "numberplate").to.equal(params.numberplate);
                expect(res.body.year, "year").to.equal(params.year);
            });
        });

        done();
    });
});
