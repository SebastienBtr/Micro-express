/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');
const { prisma } = require('../../generated/prisma-client');

const requestBody = {
  name: 'name!',
  stock: 20,
  price: 20.5,
};


beforeEach(async (done) => {
  await prisma.deleteManyArticles();
  done();
});

describe('Create an article', () => {
  it('Nominal case', async (done) => {
    const res = await request(app)
      .post('/articles')
      .send(requestBody);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
    expect(res.body.name).toEqual(requestBody.name);
    expect(res.body).toHaveProperty('stock');
    expect(res.body.stock).toEqual(requestBody.stock);
    expect(res.body).toHaveProperty('price');
    expect(res.body.price).toEqual(requestBody.price);
    done();
  });
  it.each(
    [{ "name": "name", "stock": 10 }, { "name": "name", "price": 10 }, { "stock": 10, "price": 10 }]
  )('Should return a 400 because a required field is missing', async (data, done) => {
    const res = await request(app)
      .post('/articles')
      .send(data);
    expect(res.statusCode).toEqual(400);
    done();
  });
  it.each(
    [{ "name": "name", "stock": "10", "price": 10 }, { "name": "name", "stock": 10, "price": "10" }]
  )('Should return a 400 because a required number field is not a number', async (data, done) => {
    const res = await request(app)
      .post('/articles')
      .send(data);
    expect(res.statusCode).toEqual(400);
    done();
  });
});
