/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');
const { prisma } = require('../../generated/prisma-client');

const sampleOk = {
  name: 'article',
  stock: 109,
  price: 1020.5,
};

const sampleMissingPrice = {
  name: 'article',
  stock: 109,
};

const sampleMissingStock = {
  name: 'article',
  price: 1020.5,
};

const sampleMissingName = {
  stock: 109,
  price: 1020.5,
};

const samplePriceNaN = {
  name: 'article',
  stock: 109,
  price: 'toto',
};

const samplePriceStringNumber = {
  name: 'article',
  stock: 109,
  price: '1020.5',
};

const sampleStockNaN = {
  name: 'article',
  stock: 'toto',
  price: 1020.5,
};

const sampleStockStringNumber = {
  name: 'article',
  stock: '109',
  price: 1020.5,
};

beforeEach(async (done) => {
  await prisma.deleteManyArticles();
  done();
});


describe('Create Article', () => {
  it('should create a new article', async (done) => {
    const res = await request(app)
      .post('/articles')
      .send(sampleOk);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('stock');
    expect(res.body).toHaveProperty('price');
    expect(res.body.name).toEqual(sampleOk.name);
    expect(res.body.stock).toEqual(sampleOk.stock);
    expect(res.body.price).toEqual(sampleOk.price);
    done();
  });
  it('should return a 400 because no "price"', async (done) => {
    const res = await request(app)
      .post('/articles')
      .send(sampleMissingPrice);
    expect(res.statusCode).toEqual(400);
    done();
  });
  it('should return a 400 because no "stock"', async (done) => {
    const res = await request(app)
      .post('/articles')
      .send(sampleMissingStock);
    expect(res.statusCode).toEqual(400);
    done();
  });
  it('should return a 400 because no "name"', async (done) => {
    const res = await request(app)
      .post('/articles')
      .send(sampleMissingName);
    expect(res.statusCode).toEqual(400);
    done();
  });
  it('should return a 400 because price is not a number', async (done) => {
    const res = await request(app)
      .post('/articles')
      .send(samplePriceNaN);
    expect(res.statusCode).toEqual(400);
    done();
  });
  it('should return a 400 because price is a string number', async (done) => {
    const res = await request(app)
      .post('/articles')
      .send(samplePriceStringNumber);
    expect(res.statusCode).toEqual(400);
    done();
  });
  it('should return a 400 because stock is not a number', async (done) => {
    const res = await request(app)
      .post('/articles')
      .send(sampleStockNaN);
    expect(res.statusCode).toEqual(400);
    done();
  });
  it('should return a 400 because stock is a string number', async (done) => {
    const res = await request(app)
      .post('/articles')
      .send(sampleStockStringNumber);
    expect(res.statusCode).toEqual(400);
    done();
  });
});
