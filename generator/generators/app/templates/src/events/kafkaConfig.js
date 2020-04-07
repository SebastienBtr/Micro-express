require('dotenv').config();

const config = {
  clientId: 'cart',
  brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
};

if (process.env.KAFKA_ENABLE_SSL || false) {
  config.ssl = true;
  config.sasl = {
    mechanism: process.env.KAFKA_SASL_MECHANISM,
    username: process.env.KAFKA_API_KEY,
    password: process.env.KAFKA_API_SECRET,
  };
}

module.exports.config = config;
