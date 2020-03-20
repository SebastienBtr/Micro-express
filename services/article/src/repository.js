const { prisma } = require('../generated/prisma-client');

module.exports.createArticle = data => prisma.createArticle({
  name: data.name,
  stock: data.stock,
  price: data.price,
});

module.exports.updateArticle = async (id, data) => {
  const articleExists = await prisma.$exists.article({
    id,
  });
  if (articleExists) {
    return prisma.updateArticle({
      data: {
        name: data.name,
        stock: data.stock,
        price: data.price,
      },
      where: {
        id,
      },
    });
  }
  return null;
};


module.exports.decrementArticleStock = async (id, value) => {
  const article = await prisma.article({ id });
  if (article) {
    return prisma.updateArticle({
      data: {
        stock: article.stock - value,
      },
      where: {
        id,
      },
    });
  }
  return null;
};

module.exports.deleteArticle = async (id) => {
  const articleExists = await prisma.$exists.article({
    id,
  });
  if (articleExists) {
    return prisma.deleteArticle({ id });
  }
  return null;
};

module.exports.getAllArticles = () => prisma.articles();

module.exports.getArticleById = id => prisma.article({ id });
