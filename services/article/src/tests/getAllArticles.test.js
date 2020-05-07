/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');
const { prisma } = require('../../generated/prisma-client');

const sampleOk = {
  name: 'name',
  stock: 10,
  price: 10.5,
};


beforeEach(async (done) => {
  await prisma.deleteManyArticles();
  done();
});

describe('Get all the articles', () => {
  it('Nominal case', async (done) => {
    const data = await prisma.createArticle(sampleOk);
    const res = await request(app)
      .get('/articles');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toEqual(1);
    [res.body] = res.body;
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toEqual(data.id);
    expect(res.body).toHaveProperty('name');
    expect(res.body.name).toEqual(sampleOk.name);
    expect(res.body).toHaveProperty('stock');
    expect(res.body.stock).toEqual(sampleOk.stock);
    expect(res.body).toHaveProperty('price');
    expect(res.body.price).toEqual(sampleOk.price);
    done();
  });
});
