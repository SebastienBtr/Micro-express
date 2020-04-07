/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');
const { prisma } = require('../../generated/prisma-client');

const sampleOk = {
  name: 'article',
  stock: 109,
  price: 1020.5,
};

const notPresentId = '000000';
let presentId;

beforeEach(async (done) => {
  await prisma.deleteManyArticles();
  const article = await prisma.createArticle(sampleOk);
  presentId = article.id;
  done();
});


describe('Get Article by id', () => {
  it('should get an article', async (done) => {
    const res = await request(app)
      .get(`/articles/${presentId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('stock');
    expect(res.body).toHaveProperty('price');
    expect(res.body.id).toEqual(presentId);
    expect(res.body.name).toEqual(sampleOk.name);
    expect(res.body.stock).toEqual(sampleOk.stock);
    expect(res.body.price).toEqual(sampleOk.price);
    done();
  });
  it('should return a 404 because the article does not exist', async (done) => {
    const res = await request(app)
      .get(`/articles/${notPresentId}`);
    expect(res.statusCode).toEqual(404);
    done();
  });
});
