import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.should();
chai.use(chaiHttp);
const baseUrl = '/api/v1';

describe('Sport Compass Assessment API', () => {
  it('Should return success on hitting home route', done => {
    chai
      .request(app)
      .get(`${baseUrl}/`)
      .end((_err, res) => {
        const {
          body: { message, status },
        } = res;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        status.should.equal(200);
        message.should.equal('Welcome');
        done();
      });
  });

  it('Should return a 404 error for non existent endpoints', done => {
    chai
      .request(app)
      .get(`${baseUrl}/invalid-route`)
      .end((_err, res) => {
        const {
          body: { error, status },
        } = res;
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        status.should.equal(404);
        error.should.equal('Resource not found. Double check the url and try again');
        done();
      });
  });
});
