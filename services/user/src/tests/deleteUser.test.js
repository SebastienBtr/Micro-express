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

const notPresentId = '000000';
let presentId;

beforeEach(async (done) => {
  await prisma.deleteManyUsers();
  const data = await prisma.createUser(sampleOk);
  presentId = data.id;
  done();
});

describe('Delete a user', () => {
  it('Nominal case', async (done) => {
    const res = await request(app)
      .delete(`/users/${presentId}`);
    expect(res.statusCode).toEqual(204);
    done();
  });
  it('404 error case', async (done) => {
    const res = await request(app)
      .delete(`/users/${notPresentId}`);
    expect(res.statusCode).toEqual(404);
    done();
  });
});
