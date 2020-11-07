const { prisma } = require('../generated/prisma-client');

// Hide password
const UserFragment = `
fragment UserHidePassword on User {
  id
  firstName
  lastName
  email
  updatedAt
  createdAt
}
`;

module.exports.createUser = data => prisma.createUser({
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  password: data.password,
}).$fragment(UserFragment);

module.exports.deleteUser = async (id) => {
  const userExists = await prisma.$exists.user({
    id,
  });
  if (userExists) {
    return prisma.deleteUser({ id }).$fragment(UserFragment);
  }
  return null;
};

module.exports.getUserById = id => prisma.user({ id }).$fragment(UserFragment);

module.exports.getUsers = filters => prisma.users({ where: { ...filters } });

module.exports.updateUserById = async (id, data) => {
  const userExists = await prisma.$exists.user({
    id,
  });
  if (userExists) {
    return prisma.updateUser({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      },
      where: {
        id,
      },
    }).$fragment(UserFragment);
  }
  return null;
};

module.exports.updateUserPassword = async (id, password) => {
  const userExists = await prisma.$exists.user({
    id,
  });
  if (userExists) {
    return prisma.updateUser({
      data: {
        password,
      },
      where: {
        id,
      },
    }).$fragment(UserFragment);
  }
  return null;
};
