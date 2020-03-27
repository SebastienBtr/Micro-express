/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');
const { prisma } = require('../../generated/prisma-client');

const sampleOk = {
  name: 'article',
  stock: 109,
  price: 1020.5,
};

beforeEach(async (done) => {
  await prisma.deleteManyArticles();
  done();
});


describe('Create Article', () => {
  it('should create a new article', async (done) => {
    const res = await request(app)
      .post('/articles')
      .send(sampleOk);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('stock');
    expect(res.body).toHaveProperty('price');
    expect(res.body.name).toEqual(sampleOk.name);
    expect(res.body.stock).toEqual(sampleOk.stock);
    expect(res.body.price).toEqual(sampleOk.price);
    done();
  });
  it.each([
    { name: 'article', stock: 109 },
    { name: 'article', price: 1020.5 },
    { stock: 109, price: 1020.5 },
  ])('should return a 400 because a required field is missing', async (data, done) => {
    const res = await request(app)
      .post('/articles')
      .send(data);
    expect(res.statusCode).toEqual(400);
    done();
  });
  it.each([
    { name: 'article', stock: 109, price: '1020.5' },
    { name: 'article', stock: '109', price: 1020.5 },
  ])('should return a 400 because a number field is not a number', async (data, done) => {
    const res = await request(app)
      .post('/articles')
      .send(data);
    expect(res.statusCode).toEqual(400);
    done();
  });
});
