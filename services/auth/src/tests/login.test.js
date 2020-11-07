/* eslint-disable no-undef */ 
const request = require('supertest');
const app = require('../server');
const { prisma } = require('../../generated/prisma-client');

const requestBody = {
  email: 'email!',
  password: 'password!',
};


beforeEach(async (done) => {
  await prisma.deleteManyAuths();
  done();
});

describe('Login', () => {
  it('Nominal case', async (done) => {
    const res = await request(app)
      .post('/auth/login')
      .send(requestBody);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
    done();
  });  
  it.each(
  [{"password":"password"},{"email":"email"}]
  )('Should return a 400 because a required field is missing', async (data, done) => {
    const res = await request(app)
      .post('/auth/login')
      .send(data);
    expect(res.statusCode).toEqual(400);
    done();
  });
  
});
