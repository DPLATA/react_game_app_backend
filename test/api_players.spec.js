let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('/api/players endpoint', () => {
  /*
  * Test the GET /api_players route
  */
  describe('GET /api/players list', () => {
    it('should successfully get players list through GET and return 200', (done) => {
      chai.request(server)
          .get('/api/players')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('players')
                res.body.should.be.a('Object');
            done();
          });
    });


    });

    describe('GET /api/players/top-players list', () => {
        it('should successfully get top players list through GET and return 200', (done) => {
          chai.request(server)
              .get('/api/players/top-players')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('players')
                done();
              });
        });
    
    });

    describe('GET /api/players/:id single player by id', () => {
        it('should successfully get a single player through GET and return 200', (done) => {
          chai.request(server)
              .get('/api/players/61e59808fabd96c71461bb7c')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('player');
                done();
              });
        });
        it('should unsuccessfully get a single player through GET and return 404', (done) => {
            chai.request(server)
                .get('/api/players/1000000')
                .end((err, res) => {
                      res.should.have.status(404);
                      done();
                });
          });
    });

});