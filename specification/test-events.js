const { readdirSync, statSync } = require('fs')
const { join } = require('path')
const assert = require('assert');

// All the directories in specification
const dirs = readdirSync(__dirname).filter(f => statSync(join(__dirname, f)).isDirectory());

const services = {};
const consumers = new Set();

dirs.forEach(dir => {
  services[dir] = require(join(__dirname, dir, 'events.json'));
});

Object.entries(services).forEach(([name, value]) => {
  // Check that every consumed events are produced by the service defined in the "type" property
  Object.keys(value.consume).forEach(consumeKey => {
    const type = value.consume[consumeKey].type;
    assert(
      services[type]
      && services[type].produce.hasOwnProperty(consumeKey),
      `"${type}" service is not producing an event "${consumeKey}" that is consumed by "${name}" service`
    )
    consumers.add(consumeKey);
  });
});

Object.entries(services).forEach(([name, value]) => {
  // Check every produced events are at least in one consumer
  Object.keys(value.produce).forEach(produceKey => {
    assert(
      consumers.has(produceKey),
      `"${produceKey}" is produced in "${name}" service but never consumed`
    );
  });
});