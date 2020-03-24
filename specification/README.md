# Specification

This project define the specifications for the microservices architecture.

Each service has is own directory (which is the service name) and three specification files:

* `api.json`: define the models ands CRUD operations of a service, it uses API builder format: https://app.apibuilder.io/doc/apiJson, this format allow us to easely generate swagger and postman files thanks to the [API builder generators](https://app.apibuilder.io/generators/).

* `datamodel.prisma`: the prisma database model to use in the service (if this file is not present it means the service does not need a database),see the documentation on how to write prisma datamodels: https://www.prisma.io/docs/1.34/datamodel-and-migrations/datamodel-POSTGRES-knum/

* `events.json`: a custom json format to define the pub/sub events of a service. The format is the following:

```
{
  "consume": {
    "event-name": {
      "type": "service-name"
    }
  },
  "produce": {
    "event-name": {
      "type": "service-name"
    },
    "event-name": {
      "type": "service-name"
    },
  }
}
```

Each produce event must be at least consume once by another service.  
Each consume event must be produce by the service defined in "type".

## Tests

Two tests are present to ensure style consistency and good formating: `test-apis.js` and `test-events.js`

For api.json files, the good formating must be tested by uploading the file in [API builder](https://app.apibuilder.io/), the generator will do it before generating any service.