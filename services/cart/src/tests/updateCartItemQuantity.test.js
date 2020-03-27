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

const quantityOk = {
  quantity: 4,
};

const quantityKo = {
  blbl: 4,
};

const quantityNaN = {
  quantity: '4',
};

const notPresentId = '000000';
let presentId;

beforeEach(async (done) => {
  await prisma.deleteManyCartItems();
  const cartItem = await prisma.createCartItem(sampleOk);
  presentId = cartItem.id;
  done();
});


describe('Update cart item quantity', () => {
  it('should update quantity', async (done) => {
    const res = await request(app)
      .put(`/cart/items/quantity/${presentId}`)
      .send(quantityOk);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('articleId');
    expect(res.body).toHaveProperty('articleName');
    expect(res.body).toHaveProperty('articlePrice');
    expect(res.body).toHaveProperty('quantity');
    expect(res.body.id).toEqual(presentId);
    expect(res.body.articleId).toEqual(sampleOk.articleId);
    expect(res.body.articleName).toEqual(sampleOk.articleName);
    expect(res.body.articlePrice).toEqual(sampleOk.articlePrice);
    expect(res.body.quantity).toEqual(quantityOk.quantity);
    done();
  });
  it('should return a 404 because the cart item does not exist', async (done) => {
    const res = await request(app)
      .put(`/cart/items/quantity/${notPresentId}`)
      .send(quantityOk);
    expect(res.statusCode).toEqual(404);
    done();
  });
  it('should return a 400 because the body does not contain quantity', async (done) => {
    const res = await request(app)
      .put(`/cart/items/quantity/${presentId}`)
      .send(quantityKo);
    expect(res.statusCode).toEqual(400);
    done();
  });
  it('should return a 400 because quantity NaN', async (done) => {
    const res = await request(app)
      .put(`/cart/items/quantity/${presentId}`)
      .send(quantityNaN);
    expect(res.statusCode).toEqual(400);
    done();
  });
});
