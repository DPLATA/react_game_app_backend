let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('/api/auth/register endpoint', () => {
  /*
  * Test the POST /api_register route
  */
  describe('POST /api/auth/register player', () => {
    it('should unsuccessfully POST a player without password field', (done) => {
        let player = {
            name: "Allen",
            nickname: "Lazard"
        }
      chai.request(server)
          .post('/api/auth/register')
          .send(player)
          .end((err, res) => {
                res.should.have.status(400);
            done();
          });
    });

    it('it should successfully POST a player ', (done) => {
        let player = {
            name: "Geronimo Allison",
            nickname: "packer",
            password: "XjbdggT57l"
        }
      chai.request(server)
          .post('/api/auth/register')
          .send(player)
          .end((err, res) => {
                res.should.have.status(201);
            done();
          });
    });

});

});