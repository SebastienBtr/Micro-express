const { v4: uuidv4 } = require('uuid');

const getExpDate = () => new Date(Date.now() + 12096e5).getTime();

module.exports.getToken = (userId, role) => ({
  accessToken: {
    sub: userId,
    jti: uuidv4(),
    roles: [role],
    exp: getExpDate(),
  },
  exp: getExpDate(),
});
