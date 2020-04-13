# Documentation

Simple service to expose the swagger documentation of all the microservices and to store their postman collections.

Postamn collections are stored inside the postman directory and named following this rule: `<service-name>-postman.json`.

Swagger documentations are stored inside the swagger directory and named following this rule: `<service-name>-swagger.json`.

To run this service use the [launcher script](../launcher.sh) as described in the [readme](../README.md).

Then the swagger UI will be accessible with the route `/documention`