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
  await prisma.deleteManyUsers();
  done();
});

describe('Create a user', () => {
  it('Nominal case', async (done) => {
    const res = await request(app)
      .put('/users')
      .send(requestBody);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('firstName');
    expect(res.body.firstName).toEqual(requestBody.firstName);
    expect(res.body).toHaveProperty('lastName');
    expect(res.body.lastName).toEqual(requestBody.lastName);
    expect(res.body).toHaveProperty('email');
    expect(res.body.email).toEqual(requestBody.email);
    expect(res.body).toHaveProperty('createdAt');
    expect(res.body).toHaveProperty('updatedAt');
    done();
  });
  it.each(
    [{ lastName: 'lastName', email: 'email', password: 'password' }, { firstName: 'firstName', email: 'email', password: 'password' }, { firstName: 'firstName', lastName: 'lastName', password: 'password' }, { firstName: 'firstName', lastName: 'lastName', email: 'email' }],
  )('Should return a 400 because a required field is missing', async (data, done) => {
    const res = await request(app)
      .put('/users')
      .send(data);
    expect(res.statusCode).toEqual(400);
    done();
  });
});
