let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('root endpoint', () => {
  /*
  * Test the GET / route
  */
  describe('GET /', () => {
      it('should GET root endpoint', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('message');
                  done()
            });
      });
  });

});