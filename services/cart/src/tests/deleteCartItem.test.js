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

const notPresentId = '000000';
let presentId;

beforeEach(async (done) => {
  await prisma.deleteManyCartItems();
  const data = await prisma.createCartItem(sampleOk);
  presentId = data.id;
  done();
});

describe('Delete an item of the cart', () => {
  it('Nominal case', async (done) => {
    const res = await request(app)
      .delete(`/cart/items/${presentId}`);
    expect(res.statusCode).toEqual(204);
    done();
  });
  it('404 error case', async (done) => {
    const res = await request(app)
      .delete(`/cart/items/${notPresentId}`);
    expect(res.statusCode).toEqual(404);
    done();
  });
});
