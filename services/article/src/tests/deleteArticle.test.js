/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');
const { prisma } = require('../../generated/prisma-client');

const sampleOk = {
  name: 'name',
  stock: 10,
  price: 10.5,
};

const notPresentId = '000000';
let presentId;

beforeEach(async (done) => {
  await prisma.deleteManyArticles();
  const article = await prisma.createArticle(sampleOk);
  presentId = article.id;
  done();
});

describe('Delete a specific article', () => {
  it('Nominal case', async (done) => {
    const res = await request(app)
      .delete(`/articles/${presentId}`);
    expect(res.statusCode).toEqual(204);
    done();
  });
  it('404 error case', async (done) => {
    const res = await request(app)
      .delete(`/articles/${notPresentId}`);
    expect(res.statusCode).toEqual(404);
    done();
  });
});
