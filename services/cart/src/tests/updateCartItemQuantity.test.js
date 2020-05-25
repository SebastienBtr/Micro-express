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

const requestBody = {
  quantity: 20,
};

const notPresentId = '000000';
let presentId;

beforeEach(async (done) => {
  await prisma.deleteManyCartItems();
  const data = await prisma.createCartItem(sampleOk);
  presentId = data.id;
  done();
});

describe('Update the quantity of an item of the cart', () => {
  it('Nominal case', async (done) => {
    const res = await request(app)
      .put(`/cart/items/quantity/${presentId}`)
      .send(requestBody);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toEqual(presentId);
    expect(res.body).toHaveProperty('articleId');
    expect(res.body.articleId).toEqual(sampleOk.articleId);
    expect(res.body).toHaveProperty('articleName');
    expect(res.body.articleName).toEqual(sampleOk.articleName);
    expect(res.body).toHaveProperty('articlePrice');
    expect(res.body.articlePrice).toEqual(sampleOk.articlePrice);
    expect(res.body).toHaveProperty('quantity');
    expect(res.body.quantity).toEqual(requestBody.quantity);
    done();
  });
  it.each(
    [{ eeeoooo: 'aboer' }],
  )('Should return a 400 because a required field is missing', async (data, done) => {
    const res = await request(app)
      .put(`/cart/items/quantity/${notPresentId}`)
      .send(data);
    expect(res.statusCode).toEqual(400);
    done();
  });
  it.each(
    [{ quantity: '10' }],
  )('Should return a 400 because a required number field is not a number', async (data, done) => {
    const res = await request(app)
      .put(`/cart/items/quantity/${notPresentId}`)
      .send(data);
    expect(res.statusCode).toEqual(400);
    done();
  });
  it('404 error case', async (done) => {
    const res = await request(app)
      .put(`/cart/items/quantity/${notPresentId}`)
      .send(requestBody);
    expect(res.statusCode).toEqual(404);
    done();
  });
});
