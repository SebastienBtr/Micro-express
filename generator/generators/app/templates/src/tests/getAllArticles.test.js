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


describe('Get all Articles', () => {
  it('should return an empty list', async (done) => {
    const res = await request(app)
      .get('/articles');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toEqual(0);
    done();
  });
  it('should return a list with one article', async (done) => {
    const article = await prisma.createArticle(sampleOk);
    const res = await request(app)
      .get('/articles');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toEqual(1);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('stock');
    expect(res.body[0]).toHaveProperty('price');
    expect(res.body[0].id).toEqual(article.id);
    expect(res.body[0].name).toEqual(sampleOk.name);
    expect(res.body[0].stock).toEqual(sampleOk.stock);
    expect(res.body[0].price).toEqual(sampleOk.price);
    done();
  });
});
