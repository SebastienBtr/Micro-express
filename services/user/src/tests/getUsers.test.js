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


beforeEach(async (done) => {
  await prisma.deleteManyUsers();
  done();
});

describe('Get users', () => {
  it('Nominal case', async (done) => {
    const data = await prisma.createUser(sampleOk);
    const res = await request(app)
      .get('/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toEqual(1);
    [res.body] = res.body;
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toEqual(data.id);
    expect(res.body).toHaveProperty('firstName');
    expect(res.body.firstName).toEqual(sampleOk.firstName);
    expect(res.body).toHaveProperty('lastName');
    expect(res.body.lastName).toEqual(sampleOk.lastName);
    expect(res.body).toHaveProperty('email');
    expect(res.body.email).toEqual(sampleOk.email);
    expect(res.body).toHaveProperty('password');
    expect(res.body).toHaveProperty('createdAt');
    expect(res.body).toHaveProperty('updatedAt');
    done();
  });
  it('Users by email', async (done) => {
    const data = await prisma.createUser(sampleOk);
    const otherUser = { ...sampleOk };
    otherUser.email = '123';
    await prisma.createUser(otherUser);
    const res = await request(app)
      .get(`/users?email=${data.email}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toEqual(1);
    [res.body] = res.body;
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toEqual(data.id);
    expect(res.body).toHaveProperty('firstName');
    expect(res.body.firstName).toEqual(sampleOk.firstName);
    expect(res.body).toHaveProperty('lastName');
    expect(res.body.lastName).toEqual(sampleOk.lastName);
    expect(res.body).toHaveProperty('email');
    expect(res.body.email).toEqual(sampleOk.email);
    expect(res.body).toHaveProperty('password');
    expect(res.body).toHaveProperty('createdAt');
    expect(res.body).toHaveProperty('updatedAt');
    done();
  });
});
