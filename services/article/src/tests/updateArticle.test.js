/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');
const { prisma } = require('../../generated/prisma-client');

const sampleOk = {
  name: 'name',
  stock: 10,
  price: 10.5,
};

const requestBody = {
  name: 'name!',
  stock: 20,
  price: 20.5,
};

const notPresentId = '000000';
let presentId;

beforeEach(async (done) => {
  await prisma.deleteManyArticles();
  const article = await prisma.createArticle(sampleOk);
  presentId = article.id;
  done();
});

describe('Update a specific article', () => {
  it('Nominal case', async (done) => {
    const res = await request(app)
      .put(`/articles/${presentId}`)
      .send(requestBody);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toEqual(presentId);
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
      .put(`/articles/${notPresentId}`)
      .send(data);
    expect(res.statusCode).toEqual(400);
    done();
  });
  it.each(
    [{ "name": "name", "stock": "10", "price": 10 }, { "name": "name", "stock": 10, "price": "10" }]
  )('Should return a 400 because a required number field is not a number', async (data, done) => {
    const res = await request(app)
      .put(`/articles/${notPresentId}`)
      .send(data);
    expect(res.statusCode).toEqual(400);
    done();
  });
  it('404 error case', async (done) => {
    const res = await request(app)
      .put(`/articles/${notPresentId}`)
      .send(requestBody);
    expect(res.statusCode).toEqual(404);
    done();
  });
});
