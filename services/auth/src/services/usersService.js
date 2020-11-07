const axios = require('axios');
require('dotenv').config();

const userService = process.env.USER_SERVICE || 'http://user_app_1:3500';

const http = axios.create({
  baseURL: userService,
});

module.exports.createUser = (firstName, lastName, email, password) => http.put('users', {
  firstName, lastName, email, password,
});

module.exports.getUsersByEmail = email => http.get(`users?type=manager&email=${email}`);
