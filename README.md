# POC microservices

Complete example of a small microservices architecture driven by specifications.

# Project structure

## **Generator**

A microservice generator based on the specifications.  
see: [generator](generator)

## **Services**

All the microservices of the architecture.  
see: [services](services)

## **Specification**

The specification of each microservices.  
see: [specification](specification)

# Get started

## **Running**

You just need Docker installed.

**Development:** 

In `services` there is a `launcher.sh` script to launch the desired services with docker.

* To launch all: `./services/launcher.sh`

* To launch specific services: `./service/launcher.sh <service-name> <service-name-2>`

The "service name" is the same as the service's directory and the services will be launched in the order you pass them to the script.

To simplify the development and allow you to work on a service without using the api-gateway, each business services are exposed to your host with a default port that can be seen in the docker-compose file and this value can overriden if you create a `.env` file in the project. An example is provided with the `.env.default` file.

**Production:** 

WIP

## **Contributing**

**Create a service**

* Create its specification
* Generate the service with the generator
* Implement the "TODOs"

**Edit a service**

* Go in the service's directory
* Install prisma CLI: https://www.prisma.io/docs/prisma-cli-and-configuration/using-the-prisma-cli-alx4/
* Run `prisma generate`
* Run `yarn install`

These steps are necessary to have autocompletion.
Now you can start coding but make sure to not edit code that will be overriden by the generator. See [services](services) for more informations.
