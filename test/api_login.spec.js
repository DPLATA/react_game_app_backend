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
            nickname: "Easternwhitepelican7a101b24-e5d7-4cb0-9ffd-6813f03d5548",
            password: "incorrectpassword"
        }
      chai.request(server)
          .post('/api/auth/login')
          .send(player)
          .end((err, res) => {
                res.should.have.status(401);
                //TODO: debug body response
                //res.body.should.have.property('msg')
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
                //TODO: debug body response
                //res.body.should.have.property('msg')
            done();
          });
    });

    //TODO: debug complete test
    it('it should successfully login a player through POST and return 200', (done) => {
        let player = {
            nickname: "Easternwhitepelican7a101b24-e5d7-4cb0-9ffd-6813f03d5548",
            password: "fe3ede9c-a46f-40d9-a0b6-9f51a92843261642377580231"
        }
      chai.request(server)
          .post('/api/auth/login')
          .send(player)
          .end((err, res) => {
                console.log(res.status);
                res.should.have.status(200);
                //res.body.should.have.property('user')
            done();
          });
    });

});

});