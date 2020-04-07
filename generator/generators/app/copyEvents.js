module.exports.run = (self, eventSpec, serviceName) => {
  const consumers = [];
  const producers = [];

  Object.keys(eventSpec.consume).forEach((key) => {
    const variableName = key.toUpperCase().replace('-', '_');
    const camelCaseName = key.replace(/-./g, x => x.toUpperCase()[1]);
    consumers.push({ variableName, camelCaseName, value: key });
  });

  Object.keys(eventSpec.produce).forEach((key) => {
    const variableName = key.toUpperCase().replace('-', '_');
    producers.push({ variableName, value: key });
  });

  self.fs.copyTpl(
    self.templatePath('src/events/topics.js.ejs'),
    self.destinationPath('src/events/topics.js'),
    { consumers, producers },
  );

  self.fs.copyTpl(
    self.templatePath('src/events/consumer.js.ejs'),
    self.destinationPath('src/events/consumer.js'),
    { consumers, serviceName },
  );
};
