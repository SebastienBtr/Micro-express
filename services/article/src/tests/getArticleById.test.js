/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');
const { prisma } = require('../../generated/prisma-client');

const sampleOk = {
  name: 'name',
  stock: 10,
  price: 10.5,
};

const notPresentId = '000000';
let presentId;

beforeEach(async (done) => {
  await prisma.deleteManyArticles();
  const data = await prisma.createArticle(sampleOk);
  presentId = data.id;
  done();
});

describe('Get a specific article', () => {
  it('Nominal case', async (done) => {
    const res = await request(app)
      .get(`/articles/${presentId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toEqual(presentId);
    expect(res.body).toHaveProperty('name');
    expect(res.body.name).toEqual(sampleOk.name);
    expect(res.body).toHaveProperty('stock');
    expect(res.body.stock).toEqual(sampleOk.stock);
    expect(res.body).toHaveProperty('price');
    expect(res.body.price).toEqual(sampleOk.price);
    done();
  });
  it('404 error case', async (done) => {
    const res = await request(app)
      .get(`/articles/${notPresentId}`);
    expect(res.statusCode).toEqual(404);
    done();
  });
});
