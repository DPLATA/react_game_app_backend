let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('/api/auth/login endpoint', () => {
  /*
  * Test the POST /api_register route
  */
  describe('POST /api/auth/login player', () => {
    it('should unsuccessfully login a player through POST and return 401', (done) => {
        let player = {
            nickname: "packer",
            password: "incorrectpassword"
        }
      chai.request(server)
          .post('/api/auth/login')
          .send(player)
          .end((err, res) => {
                res.should.have.status(401);
                res.should.have.property('msg')
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
                res.should.have.property('msg')
            done();
          });
    });

    it('it should successfully login a player through POST and return 201', (done) => {
        let player = {
            nickname: "packer",
            password: "XjbdggT57l"
        }
      chai.request(server)
          .post('/api/auth/login')
          .send(player)
          .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('user')
            done();
          });
    });

});

});