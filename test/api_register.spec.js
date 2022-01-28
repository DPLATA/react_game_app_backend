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
    it('should unsuccessfully create a player with no password through POST and return 400', (done) => {
        let player = {
            name: "Allen",
            nickname: "Lazard"
        }
      chai.request(server)
          .post('/api/auth/register')
          .send(player)
          .end((err, res) => {
                res.should.have.status(400);
                //res.body.should.have.property('msg')
            done();
          });
    });

    it('it should successfully POST a player ', (done) => {
      let player = {
          name: "Allen Lazard",
          nickname: "packerLaFleur",
          password: "XjbdggT57ljhbdfvF"
      }
    chai.request(server)
        .post('/api/auth/register')
        .send(player)
        .end((err, res) => {
              res.should.have.status(201);
          done();
        });
  });

    it('should unsuccessfully create a player with repeated nickname through POST and return 400', (done) => {
      let player = {
          name: "Bob",
          nickname: "Lazard",
          password: "flyingsaucer123"
      }

      let repeated_player = {
        name: "Bob",
        nickname: "Lazard",
        password: "flyingSaucer123"
      }

      chai.request(server)
        .post('/api/auth/register')
        .send(player)
        .end((err, res) => {
              res.should.have.status(201);
              res.should.have.property('user')
          done();
        });
      chai.request(server)
        .post('/api/auth/register')
        .send(repeated_player)
        .end((err, res) => {
              res.should.have.status(400);
              res.should.have.property('msg')
          done();
        });
  });

});

});