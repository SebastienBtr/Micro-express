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
  await prisma.createCartItem(sampleOk);
  done();
});


describe('Checkout cart items', () => {
  it('should checkout', async (done) => {
    const res = await request(app)
      .put('/cart/items/checkout');
    expect(res.statusCode).toEqual(204);
    cartItems = await prisma.cartItems();
    expect(cartItems.length).toEqual(0);
    done();
  });
});
