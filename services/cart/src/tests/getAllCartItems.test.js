/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');
const { prisma } = require('../../generated/prisma-client');

const sampleOk = {
  articleId: '878887878H97BO98',
  articleName: 'article',
  articlePrice: 10,
  quantity: 1,
};

beforeEach(async (done) => {
  await prisma.deleteManyCartItems();
  done();
});


describe('Get all cart items', () => {
  it('should return an empty list', async (done) => {
    const res = await request(app)
      .get('/cart/items');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toEqual(0);
    done();
  });
  it('should return a list with one cart item', async (done) => {
    const cartItem = await prisma.createCartItem(sampleOk);
    const res = await request(app)
      .get('/cart/items');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toEqual(1);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('articleId');
    expect(res.body[0]).toHaveProperty('articleName');
    expect(res.body[0]).toHaveProperty('articlePrice');
    expect(res.body[0]).toHaveProperty('quantity');
    expect(res.body[0].id).toEqual(cartItem.id);
    expect(res.body[0].articleId).toEqual(sampleOk.articleId);
    expect(res.body[0].articleName).toEqual(sampleOk.articleName);
    expect(res.body[0].articlePrice).toEqual(sampleOk.articlePrice);
    expect(res.body[0].quantity).toEqual(sampleOk.quantity);
    done();
  });
});
