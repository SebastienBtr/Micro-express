# API Gateway

A [KrakenD](https://www.krakend.io/docs/overview/introduction/) API gateway to expose our microservices API.

Metrics and tracing are available using [InfluxDB](https://www.influxdata.com/) + [Grafana](https://grafana.com/) (you can use `KrakenD-grafana.json` as a dashboard example) and [Jaeger](https://www.jaegertracing.io/).

These services are available on port `9091` and `9092`.

In production you need to add some kind of security rules to protect these ports.

This service will be automatically launched when you use the [launcher script](../launcher.sh).