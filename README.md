# POC microservices

Example of a specs driven development microservices (SDD) architecture using code generation.
The project is keeping simple but includes all the necesary tools to be production ready. The business logic implemented does not really matter, the goal is to demonstrate how a SDD can be organized and the good pratices of a microservices architecture.

![](schema.png)

# Project structure

## **Generator**

A generator using spec files for our microservices. To know how to use it or how it works, see: [generator](generator).

## **Services**

All the microservices of the architecture, which include two business services, an API gateway and a service to expose the documentation (swagger docs and postman collections). To know how to run them or how to create/update some, see: [services](services).

## **Specification**

The API and pub/sub event specifications, and the datamodel of each microservice. To know how to create/update the specifications, see: [specification](specification).
