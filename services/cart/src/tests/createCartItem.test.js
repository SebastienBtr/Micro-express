/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');
const { prisma } = require('../../generated/prisma-client');

const requestBody = {
  articleId: '0606060606',
  articleName: 'articleName!',
  articlePrice: 20.5,
  quantity: 20,
};


beforeEach(async (done) => {
  await prisma.deleteManyCartItems();
  done();
});

describe('Add an item in the cart', () => {
  it('Nominal case', async (done) => {
    const res = await request(app)
      .post('/cart/items')
      .send(requestBody);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('articleId');
    expect(res.body.articleId).toEqual(requestBody.articleId);
    expect(res.body).toHaveProperty('articleName');
    expect(res.body.articleName).toEqual(requestBody.articleName);
    expect(res.body).toHaveProperty('articlePrice');
    expect(res.body.articlePrice).toEqual(requestBody.articlePrice);
    expect(res.body).toHaveProperty('quantity');
    expect(res.body.quantity).toEqual(requestBody.quantity);
    done();
  });
  it.each(
    [{ articleId: 'articleId', articleName: 'articleName' }, { articleId: 'articleId', articlePrice: 10 }, { articleName: 'articleName', articlePrice: 10 }],
  )('Should return a 400 because a required field is missing', async (data, done) => {
    const res = await request(app)
      .post('/cart/items')
      .send(data);
    expect(res.statusCode).toEqual(400);
    done();
  });
  it.each(
    [{ articleId: 'articleId', articleName: 'articleName', articlePrice: '10' }],
  )('Should return a 400 because a required number field is not a number', async (data, done) => {
    const res = await request(app)
      .post('/cart/items')
      .send(data);
    expect(res.statusCode).toEqual(400);
    done();
  });
  it.each(
    [{ articleId: '878887878H97BO98', articleName: 'article', articlePrice: 10.5 }, {
      articleId: '878887878H97BO98', articleName: 'article', articlePrice: 10.5, quantity: '56',
    }],
  )('should create a new cart item with default quantity to 1', async (data, done) => {
    const res = await request(app)
      .post('/cart/items')
      .send(data);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('articleId');
    expect(res.body).toHaveProperty('articleName');
    expect(res.body).toHaveProperty('articlePrice');
    expect(res.body).toHaveProperty('quantity');
    expect(res.body.articleId).toEqual(data.articleId);
    expect(res.body.articleName).toEqual(data.articleName);
    expect(res.body.articlePrice).toEqual(data.articlePrice);
    expect(res.body.quantity).toEqual(1);
    done();
  });
  it('should create a new cart and increment the quantity the second time', async (done) => {
    const res1 = await request(app)
      .post('/cart/items')
      .send(requestBody);
    expect(res1.statusCode).toEqual(201);
    const res = await request(app)
      .post('/cart/items')
      .send(requestBody);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('articleId');
    expect(res.body).toHaveProperty('articleName');
    expect(res.body).toHaveProperty('articlePrice');
    expect(res.body).toHaveProperty('quantity');
    expect(res.body.articleId).toEqual(requestBody.articleId);
    expect(res.body.articleName).toEqual(requestBody.articleName);
    expect(res.body.articlePrice).toEqual(requestBody.articlePrice);
    expect(res.body.quantity).toEqual(requestBody.quantity * 2);
    done();
  });
});
