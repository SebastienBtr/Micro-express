/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');
const { prisma } = require('../../generated/prisma-client');

const sampleOk = {
  name: 'article',
  stock: 109,
  price: 1020.5,
};

const notPresentId = '000000';
let presentId;

beforeEach(async (done) => {
  await prisma.deleteManyArticles();
  const article = await prisma.createArticle(sampleOk);
  presentId = article.id;
  done();
});


describe('Delete Article', () => {
  it('should delete an article', async (done) => {
    const res = await request(app)
      .delete(`/articles/${presentId}`);
    expect(res.statusCode).toEqual(204);
    done();
  });
  it('should return a 404 because the article does not exist', async (done) => {
    const res = await request(app)
      .delete(`/articles/${notPresentId}`);
    expect(res.statusCode).toEqual(404);
    done();
  });
});
