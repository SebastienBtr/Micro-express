/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');
const { prisma } = require('../../generated/prisma-client');

const sampleOk = {
  articleId: '878887878H97BO98',
  articleName: 'article',
  articlePrice: 10.5,
  quantity: 2,
};

beforeEach(async (done) => {
  await prisma.deleteManyCartItems();
  done();
});


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
  it.each([
    {
      articleId: '878887878H97BO98', articleName: 'article', articlePrice: 10.5,
    },
    {
      articleId: '878887878H97BO98', articleName: 'article', articlePrice: 10.5, quantity: '56',
    },
  ])('should create a new cart item with default quantity to 1', async (data, done) => {
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
      .send(sampleOk);
    expect(res1.statusCode).toEqual(201);
    const res = await request(app)
      .post('/cart/items')
      .send(sampleOk);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('articleId');
    expect(res.body).toHaveProperty('articleName');
    expect(res.body).toHaveProperty('articlePrice');
    expect(res.body).toHaveProperty('quantity');
    expect(res.body.articleId).toEqual(sampleOk.articleId);
    expect(res.body.articleName).toEqual(sampleOk.articleName);
    expect(res.body.articlePrice).toEqual(sampleOk.articlePrice);
    expect(res.body.quantity).toEqual(sampleOk.quantity * 2);
    done();
  });
  it.each([
    { articleId: '878887878H97BO98', articleName: 'article' },
    { articlePrice: 12, articleName: 'article' },
    { articleId: '878887878H97BO98', articlePrice: 12 },
  ])('should return a 400 because a required field is missing', async (data, done) => {
    const res = await request(app)
      .post('/cart/items')
      .send(data);
    expect(res.statusCode).toEqual(400);
    done();
  });
  it('should return a 400 because a number field is not a number', async (done) => {
    const res = await request(app)
      .post('/cart/items')
      .send({ articleId: '878887878H97BO98', articleName: 'article', articlePrice: '12' });
    expect(res.statusCode).toEqual(400);
    done();
  });
});
