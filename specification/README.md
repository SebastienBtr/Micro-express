# Specification

This project define the specification of each microservice.

Each service has is own directory (which is the service name) and three specification files:

* `api.json`: define the models and CRUD operations of a service, it uses API builder format: https://app.apibuilder.io/doc/apiJson, this format allow us to easely generate swagger and postman files thanks to the [API builder generators](https://app.apibuilder.io/generators/).

* `datamodel.prisma`: the prisma database model to use in the service, see the documentation on how to write prisma datamodels: https://v1.prisma.io/docs/1.34/datamodel-and-migrations/datamodel-POSTGRES-knum/

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

## Deploying

Once your specification is ready you need to follow these steps:

* Run the tests.

* Upload the api.json file to [API builder](https://app.apibuilder.io/) to see if the formating is correct and then use the swagger generator and the postman generator to download the swagger doc and the postman doc to add inside the [documentation service](../services/documentation).

* Deploy the microservice using the [generator](../generator).

* You might want to expose some routes with the [API gateway](../services/api-gateway).

## Tests

Two tests are present to ensure style consistency and good formating: `test-apis.js` and `test-events.js`.
