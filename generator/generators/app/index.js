/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const Generator = require('yeoman-generator');
const path = require('path');
const fs = require('fs');
const copyStaticFiles = require('./copyStaticFiles');
const copyVariableFiles = require('./copyVariableFiles');
const copyEvents = require('./copyEvents');
const copyTests = require('./copyTests');

const specsDir = path.resolve(__dirname, '../../../specification');
const servicesDir = path.resolve(__dirname, '../../../toto');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('action', { desc: 'The action to perform: "create" or "update"', type: String, required: true });

    if (!['create', 'update'].includes(this.options.action)) {
      this.log.error('Wrong action provided, available options are: "create or "update"');
      process.exit(1);
    }

    this.argument('serviceName', { desc: 'The name of the service to update or create', type: String, required: true });
    this.appname = this.options.serviceName;

    if (this.options.action === 'create' && fs.existsSync(`${servicesDir}/${this.options.serviceName}`)) {
      this.log.error(`Service "${this.options.serviceName}" already exists`);
      process.exit(1);
    } else if (this.options.action === 'update' && !fs.existsSync(`${servicesDir}/${this.options.serviceName}`)) {
      this.log.error(`Service "${this.options.serviceName}" does not exist`);
      process.exit(1);
    }

    if (!fs.existsSync(`${specsDir}/${this.options.serviceName}/api.json`)) {
      this.log.error(`No spec defined for "${this.options.serviceName}"`);
      process.exit(1);
    }
    if (!fs.existsSync(`${specsDir}/${this.options.serviceName}/datamodel.prisma`)) {
      this.log.error(`No datamodel defined for "${this.options.serviceName}"`);
      process.exit(1);
    }

    this.destinationRoot(`${servicesDir}/${this.options.serviceName}`);
  }

  writing() {
    const apiSpec = require(`${specsDir}/${this.options.serviceName}/api.json`);
    const addEvents = fs.existsSync(`${specsDir}/${this.options.serviceName}/events.json`);

    this.fs.copy(
      `${specsDir}/${this.options.serviceName}/datamodel.prisma`,
      this.destinationPath('datamodel.prisma'),
    );

    copyStaticFiles.run(this, addEvents);
    copyVariableFiles.run(this, addEvents, apiSpec);
    copyTests.run(this, apiSpec);

    if (addEvents) {
      const eventSpec = require(`${specsDir}/${this.options.serviceName}/events.json`);
      copyEvents.run(this, eventSpec, this.options.serviceName);
    }
  }
};
