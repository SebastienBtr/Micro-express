module.exports.run = (self, apiSpec) => {
  Object.keys(apiSpec.resources).forEach((key) => {
    const resourceModel = apiSpec.models[`${key}_form`]
      ? apiSpec.models[`${key}_form`].fields
      : apiSpec.models[key].fields;
    let resourceName = key.replace(/_./g, x => x.toUpperCase()[1]);
    resourceName = resourceName.charAt(0).toUpperCase() + resourceName.slice(1);

    apiSpec.resources[key].operations.forEach((operation) => {
      let route = apiSpec.resources[key].path || `/${key}s`;
      let hasIdInPath = false;
      if (operation.path) {
        hasIdInPath = operation.path.includes('/:id');
        route += `${operation.path.replace('/:id', '')}`;
      }

      const descriptionParts = operation.description.split('; methodName: ');
      if (descriptionParts.length !== 2) {
        this.log.error(`Invalid description field in: \n${operation}`);
        process.exit(1);
      }

      const description = descriptionParts[0];
      const methodName = descriptionParts[1];
      const requestMethod = operation.method.toLowerCase();

      const requestBody = operation.body && apiSpec.models[operation.body.type]
        ? apiSpec.models[operation.body.type].fields
        : null;

      // { code: 200, isList: false, body: null }
      const responses = [];
      Object.entries(operation.responses).forEach(([code, value]) => {
        const data = {};
        data.code = code.toString();
        if (value.type !== 'unit') {
          data.isList = value.type.startsWith('[');
          data.body = apiSpec.models[value.type.replace('[', '').replace(']', '')].fields;
        } else {
          data.isList = false;
          data.body = null;
        }
        responses.push(data);
      });

      self.fs.copyTpl(
        self.templatePath('src/tests/test.js.ejs'),
        self.destinationPath(`src/tests/${methodName}.test.js`),
        {
          hasIdInPath,
          route,
          description,
          requestMethod,
          requestBody,
          methodName,
          resourceModel,
          resourceName,
          responses,
        },
      );
    });
  });
};
