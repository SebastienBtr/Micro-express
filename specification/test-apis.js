const { readdirSync, statSync } = require('fs')
const { join } = require('path')
const assert = require('assert');

// All the directories in specification
const dirs = readdirSync(__dirname).filter(f => statSync(join(__dirname, f)).isDirectory());

dirs.forEach(dir => {
  const apiSpec = require(join(__dirname, dir, 'api.json'));

  // Check service name
  assert(
    apiSpec.name
    && apiSpec.name === apiSpec.name.toLowerCase().replace(/\s/g, '')
    && !apiSpec.name.includes('_')
    && !apiSpec.name.endsWith('s')
    && apiSpec.name === dir,
    'The service name must be in singular kabab case, ' +
    'it must also be the same as the directory name'
  );

  // Check models
  Object.keys(apiSpec.models).forEach(key => {
    // Check model name is in snake case
    assert(
      key === key.toLowerCase().replace(/\s/g, '')
      && !key.includes('-'),
      'The field names must be in snake case'
    );

    apiSpec.models[key].fields.forEach(field => {
      // Check model name is in camel case
      assert(
        field.name
        && field.name === field.name.replace(/\s/g, '')
        && !field.name.includes('_')
        && !field.name.includes('-'),
        'The field names must be in camel case'
      );
    });
  });

  // Check resources
  Object.keys(apiSpec.resources).forEach(key => {
    apiSpec.resources[key].operations.forEach(operation => {
      // Check description contain the information about the methodName to use
      const regex = RegExp('.*\\; methodName: .*');
      assert(
        operation.description
        && regex.test(operation.description),
        'The operation description must contains a description ' +
        'following by "; methodName: <method name>" where <method name> is the ' +
        'method name that will be used in the controller of the service for this operation'
      );

      if (operation.path && operation.path.includes('/:id')) {
        // Check if we have a 404 response
        let found = false;
        Object.keys(operation.responses).forEach(response => {
          if (response === '404') {
            found = true;
          }
        });
        assert(found, 'When looking for a resource by id, it must contains a 404 response');
      }

      if (operation.body) {
        // Check if we have a 400 response
        let found = false;
        Object.keys(operation.responses).forEach(response => {
          if (response === '400') {
            found = true;
          }
        });
        assert(found, 'When sending a body in an operation, it must contains a 400 response');
      }
    });
  });

});