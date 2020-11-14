const fs = require('fs');
const ports = require('./usedPorts.json');

module.exports.run = (self, addEvents, apiSpec) => {
  let port = 3500;
  let dbport = 5400;
  while (ports.used.includes(port)) {
    port += 1;
    dbport += 1;
  }

  self.fs.copyTpl(
    self.templatePath('README.md.ejs'),
    self.destinationPath('README.md'),
    { name: self.options.serviceName, description: apiSpec.description },
  );
  self.fs.copyTpl(
    self.templatePath('package.json.ejs'),
    self.destinationPath('package.json'),
    { pkgName: self.options.serviceName, addEvents },
  );
  self.fs.copyTpl(
    self.templatePath('docker-compose.local.yaml.ejs'),
    self.destinationPath('docker-compose.local.yaml'),
    { port, dbport },
  );

  ports.used.push(port);
  fs.writeFileSync(`${__dirname}/usedPorts.json`, JSON.stringify(ports));

  const controllers = [];
  const routes = [];

  // Add the controllers
  Object.keys(apiSpec.resources).forEach((key) => {
    apiSpec.resources[key].operations.forEach((operation) => {
      let route = apiSpec.resources[key].path || `/${key}s`;
      if (operation.path) {
        route += `${operation.path}`;
      }

      const descriptionParts = operation.description.split('; methodName: ');
      if (descriptionParts.length !== 2) {
        this.log.error(`Invalid description field in: \n${operation}`);
        process.exit(1);
      }

      const description = descriptionParts[0];
      const methodName = descriptionParts[1];
      const body = operation.body && apiSpec.models[operation.body.type]
        ? apiSpec.models[operation.body.type].fields
        : null;
      const requestMethod = operation.method;

      self.fs.copyTpl(
        self.templatePath('src/controllers/controller.ctrl.js.ejs'),
        self.destinationPath(`src/controllers/${methodName}.ctrl.js`),
        {
          body,
          description,
          requestMethod,
          route,
          methodName,
        },
      );

      controllers.push(methodName);
      routes.push({
        description,
        requestMethod,
        path: route,
        methodName,
      });
    });
  });

  // Add the controller index file
  self.fs.copyTpl(
    self.templatePath('src/controllers/index.js.ejs'),
    self.destinationPath('src/controllers/index.js'),
    { controllers },
  );

  // Add the routes file
  self.fs.copyTpl(
    self.templatePath('src/routes.js.ejs'),
    self.destinationPath('src/routes.js'),
    { routes },
  );
};
