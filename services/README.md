# Services

All the microservices of the architecture, which include two business services (cart & article), an API gateway (using KrakenD), a Kafka service (only for local development), and a service to expose the documentation (swagger docs and postman collections).

# Get started

## **Running**

You just need Docker installed.

There is a `launcher.sh` script to launch the desired services with docker.

* To launch all: `./launcher.sh`

* To launch specific services: `./launcher.sh <service_name> <service_name_2>`. The "service_name" is the same as the service's directory and the services will be launched in the order you pass them to the script. The kafka (exept in "prod" env) and api-gateway services will be launched automatically.

* A "`-e`" option can be added to the command to precise the environment: "dev", "test", "prod", the default value is "dev". When you switch between environments, make sure to call the `stop-all.sh` script before.

To stop all the services, you can use the `stop-all.sh` script.

To simplify the development and allow you to work on a service without using the api-gateway, each business service is exposed to your host with a default port that can be seen in the `docker-compose.override.yaml` file of the service. This port value can overriden if you create a `.env` file in the project. An example is provided with the `.env.default` file.

**Production:** 

In production you will need to have hosted databases and a kafka service. You need to create a `.env` (see the `env.default`) in each service and complete all the fields to provide those information.
 
## **Contributing**

**Create a service**

* Create its specification (see [specification](../specification)).
* Generate the service with the generator (see [generator](../generator)).
* Implement the "TODOs" by following the bellow information about editing a service.

**Edit a service**

* Go in the service's directory
* Run `yarn install`
* Install prisma CLI: https://v1.prisma.io/docs/1.34/prisma-cli-and-configuration/using-the-prisma-cli-alx4/
* Run `prisma generate`

These steps are necessary to have autocompletion.
Now you can start coding but make sure to not edit code that will be overriden by the generator. In case you want to do any change in the service contracts, you need to do it through the [specification](../specification).

# Documentation

A generated swagger documentation can be found at the route `/documentation` through the api-gateway.

You can also find postman collection files under [services/documentation/postman](documentation/postman).
 