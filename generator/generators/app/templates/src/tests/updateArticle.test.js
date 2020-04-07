/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');
const { prisma } = require('../../generated/prisma-client');

const sampleInit = {
  name: 'article',
  stock: 109,
  price: 1020.5,
};

const sampleUpdated = {
  name: 'article up',
  stock: 120,
  price: 1000,
};

const notPresentId = '000000';
let presentId;

beforeEach(async (done) => {
  await prisma.deleteManyArticles();
  const article = await prisma.createArticle(sampleInit);
  presentId = article.id;
  done();
});


describe('Update Article', () => {
  it('should update an article', async (done) => {
    const res = await request(app)
      .put(`/articles/${presentId}`)
      .send(sampleUpdated);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('stock');
    expect(res.body).toHaveProperty('price');
    expect(res.body.id).toEqual(presentId);
    expect(res.body.name).toEqual(sampleUpdated.name);
    expect(res.body.stock).toEqual(sampleUpdated.stock);
    expect(res.body.price).toEqual(sampleUpdated.price);
    done();
  });
  it('should return a 404 because the article does not exist', async (done) => {
    const res = await request(app)
      .put(`/articles/${notPresentId}`)
      .send(sampleUpdated);
    expect(res.statusCode).toEqual(404);
    done();
  });
  it.each([
    { name: 'article', stock: 109 },
    { name: 'article', price: 1020.5 },
    { stock: 109, price: 1020.5 },
  ])('should return a 400 because a required field is missing', async (data, done) => {
    const res = await request(app)
      .put(`/articles/${presentId}`)
      .send(data);
    expect(res.statusCode).toEqual(400);
    done();
  });
  it.each([
    { name: 'article', stock: 109, price: '1020.5' },
    { name: 'article', stock: '109', price: 1020.5 },
  ])('should return a 400 because a number field is not a number', async (data, done) => {
    const res = await request(app)
      .put(`/articles/${presentId}`)
      .send(data);
    expect(res.statusCode).toEqual(400);
    done();
  });
});
