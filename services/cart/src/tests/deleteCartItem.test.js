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

const notPresentId = '000000';
let presentId;

beforeEach(async (done) => {
  await prisma.deleteManyCartItems();
  const cartItem = await prisma.createCartItem(sampleOk);
  presentId = cartItem.id;
  done();
});


describe('Delete cart item', () => {
  it('should delete a cart item', async (done) => {
    const res = await request(app)
      .delete(`/cart/items/${presentId}`);
    expect(res.statusCode).toEqual(204);
    done();
  });
  it('should return a 404 because the cart item does not exist', async (done) => {
    const res = await request(app)
      .delete(`/cart/items/${notPresentId}`);
    expect(res.statusCode).toEqual(404);
    done();
  });
});
