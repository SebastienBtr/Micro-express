# API Gateway

A [KrakenD](https://www.krakend.io/docs/overview/introduction/) API gateway to expose our microservices API.

Metrics and tracing are available using [InfluxDB](https://www.influxdata.com/) + [Grafana](https://grafana.com/) (you can use `KrakenD-grafana.json` as a dashboard example) and [Jaeger](https://www.jaegertracing.io/).

These services are available on port `9091` and `9092`.

In production you need to add some kind of security rules to protect these ports.

You need to use the [gateway launcher](../gateway-launcher.sh) script to lauch the gateway, it is important that the `auth` service is already running, otherwise the the gateway wont be able to sign tokens.

# How to add a new service in the gateway

* Create in [settings](settings) a new json file with the name of your service and add your endpoint in it. (Check the existing files to see some examples)
* In [krakend.json] add an entry in the `enpoints` array: 
```
{{ template "endpoint.tmpl" .service-name }}
```
* In the [Docker compose](docker-compose.yaml) file, add the network of the new service.