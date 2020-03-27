/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');
const { prisma } = require('../../generated/prisma-client');

const sampleOk = {
  articleId: '878887878H97BO98',
  articleName: 'article',
  articlePrice: 10,
  quantity: 2,
};

beforeEach(async (done) => {
  await prisma.deleteManyCartItems();
  done();
});

// TODO: add more tests
describe('Create cart item', () => {
  it('should create a new cart item', async (done) => {
    const res = await request(app)
      .post('/cart/items')
      .send(sampleOk);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('articleId');
    expect(res.body).toHaveProperty('articleName');
    expect(res.body).toHaveProperty('articlePrice');
    expect(res.body).toHaveProperty('quantity');
    expect(res.body.articleId).toEqual(sampleOk.articleId);
    expect(res.body.articleName).toEqual(sampleOk.articleName);
    expect(res.body.articlePrice).toEqual(sampleOk.articlePrice);
    expect(res.body.quantity).toEqual(sampleOk.quantity);
    done();
  });
});
