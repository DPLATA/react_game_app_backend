let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('/api/auth/login endpoint', () => {
  /*
  * Test the POST /api/auth/login route
  */
  describe('POST /api/auth/login player', () => {
    it('should unsuccessfully login a player through POST and return 401', (done) => {
        let player = {
            nickname: "Edyth82",
            password: "incorrectpassword"
        }
      chai.request(server)
          .post('/api/auth/login')
          .send(player)
          .end((err, res) => {
                res.should.have.status(401);
            done();
          });
    });

    it('should unsuccessfully login a player through POST and return 400', (done) => {
        let player = {
        }
      chai.request(server)
          .post('/api/auth/login')
          .send(player)
          .end((err, res) => {
                res.should.have.status(400);
            done();
          });
    });

    it('it should successfully login a player through POST and return 200', (done) => {
        let player = {
            nickname: "Edyth82",
            password: "$2a$10$lNirBjPWulzmMbXsaVi3vehsG/nuCb/TZB53ZH0xzQ4WSuuhkN6SK"
        }
      chai.request(server)
          .post('/api/auth/login')
          .send(player)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });

});

});