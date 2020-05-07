/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');
const { prisma } = require('../../generated/prisma-client');

const sampleOk = {
  articleId: '0909090909',
  articleName: 'articleName',
  articlePrice: 10.5,
  quantity: 10,
};


beforeEach(async (done) => {
  await prisma.deleteManyCartItems();
  done();
});

describe('Get all the items of the cart', () => {
  it('Nominal case', async (done) => {
    const data = await prisma.createCartItem(sampleOk);
    const res = await request(app)
      .get('/cart/items');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toEqual(1);
    [res.body] = res.body;
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toEqual(data.id);
    expect(res.body).toHaveProperty('articleId');
    expect(res.body.articleId).toEqual(sampleOk.articleId);
    expect(res.body).toHaveProperty('articleName');
    expect(res.body.articleName).toEqual(sampleOk.articleName);
    expect(res.body).toHaveProperty('articlePrice');
    expect(res.body.articlePrice).toEqual(sampleOk.articlePrice);
    expect(res.body).toHaveProperty('quantity');
    expect(res.body.quantity).toEqual(sampleOk.quantity);
    done();
  });
});
