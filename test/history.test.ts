import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as mongoose from 'mongoose';
import {History} from '../src/schemas/history';

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('History', () => {

  //delete database before each test
  beforeEach((done) => {
    History.remove({}, (err) => {
      done();
    });
  });

  // test history get request
  describe('GET api/history', () => {

    it('responds with JSON array', () => {
      return chai.request(app).get('/api/history')
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(0);
        });
    });

  });

  // test history post request
  describe('GET api/history/add', () => {

    it('stores a history entry', () => {
      let entry = {keyword: 'test entry'};
      return chai.request(app).post('/api/history/add')
        .send(entry)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message').eql('History entry has been saved.');
          expect(res.body.entry).to.have.property('keyword');
        });
    });

    it('does not store a history entry', () => {
      let entry = {};
      return chai.request(app).post('/api/history/add')
        .send(entry)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message').eql('Keyword has not been provided!');
        });
    });

  });

});
