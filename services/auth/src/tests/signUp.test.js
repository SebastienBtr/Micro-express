/* eslint-disable no-undef */ 
const request = require('supertest');
const app = require('../server');
const { prisma } = require('../../generated/prisma-client');

const requestBody = {
  firstName: 'firstName!',
  lastName: 'lastName!',
  email: 'email!',
  password: 'password!',
};


beforeEach(async (done) => {
  await prisma.deleteManyAuths();
  done();
});

describe('Sign up', () => {
  it('Nominal case', async (done) => {
    const res = await request(app)
      .put('/auth/sign-up')
      .send(requestBody);
    expect(res.statusCode).toEqual(200);
    done();
  });  
  it.each(
  [{"lastName":"lastName","email":"email","password":"password"},{"firstName":"firstName","email":"email","password":"password"},{"firstName":"firstName","lastName":"lastName","password":"password"},{"firstName":"firstName","lastName":"lastName","email":"email"}]
  )('Should return a 400 because a required field is missing', async (data, done) => {
    const res = await request(app)
      .put('/auth/sign-up')
      .send(data);
    expect(res.statusCode).toEqual(400);
    done();
  });
  
});
