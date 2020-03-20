const { prisma } = require('../generated/prisma-client');

module.exports.createCartItem = data => prisma.createCartItem({
  articleId: data.articleId,
  articleName: data.articleName,
  articlePrice: data.articlePrice,
  quantity: data.quantity,
});

module.exports.updateCartItemByArticleId = async (articleId, data) => {
  const cartItemExists = await prisma.$exists.cartItem({
    articleId,
  });
  if (cartItemExists) {
    return prisma.updateCartItem({
      data: {
        articleName: data.articleName,
        articlePrice: data.articlePrice,
      },
      where: {
        articleId,
      },
    });
  }
  return null;
};

module.exports.updateCartItemQuantity = async (id, quantity) => {
  const cartItemExists = await prisma.$exists.cartItem({
    id,
  });
  if (cartItemExists) {
    return prisma.updateCartItem({
      data: {
        quantity,
      },
      where: {
        id,
      },
    });
  }
  return null;
};

module.exports.getAllCartItems = () => prisma.cartItems();

module.exports.getCartItemByArticleId = articleId => prisma.cartItem({ articleId });

module.exports.deleteCartItem = async (id) => {
  const cartItemExists = await prisma.$exists.cartItem({
    id,
  });
  if (cartItemExists) {
    return prisma.deleteCartItem({ id });
  }
  return null;
};

module.exports.deleteCartItemByArticleId = async (articleId) => {
  const cartItemExists = await prisma.$exists.cartItem({
    articleId,
  });
  if (cartItemExists) {
    return prisma.deleteCartItem({ articleId });
  }
  return null;
};

module.exports.deleteAllCartItems = () => prisma.deleteManyCartItems();
