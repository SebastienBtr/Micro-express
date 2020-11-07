/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');
const { prisma } = require('../../generated/prisma-client');

const sampleOk = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  password: 'password',
};

const requestBody = {
  password: 'password!',
};

const notPresentId = '000000';
let presentId;

beforeEach(async (done) => {
  await prisma.deleteManyUsers();
  const data = await prisma.createUser(sampleOk);
  presentId = data.id;
  done();
});

describe('Update the password of a user', () => {
  it('Nominal case', async (done) => {
    const res = await request(app)
      .put(`/users/${presentId}/password`)
      .send(requestBody);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toEqual(presentId);
    expect(res.body).toHaveProperty('firstName');
    expect(res.body.firstName).toEqual(sampleOk.firstName);
    expect(res.body).toHaveProperty('lastName');
    expect(res.body.lastName).toEqual(sampleOk.lastName);
    expect(res.body).toHaveProperty('email');
    expect(res.body.email).toEqual(sampleOk.email);
    expect(res.body).toHaveProperty('createdAt');
    expect(res.body).toHaveProperty('updatedAt');
    done();
  });
  it.each(
    [{ eeeoooo: 'aboer' }],
  )('Should return a 400 because a required field is missing', async (data, done) => {
    const res = await request(app)
      .put(`/users/${notPresentId}/password`)
      .send(data);
    expect(res.statusCode).toEqual(400);
    done();
  });

  it('404 error case', async (done) => {
    const res = await request(app)
      .put(`/users/${notPresentId}/password`)
      .send(requestBody);
    expect(res.statusCode).toEqual(404);
    done();
  });
});
