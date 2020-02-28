const express = require('express');
const app = express();
const conf = require('./conf')
const promClient = require('prom-client');

// initializeMetrics
promClient.register.setDefaultLabels({
    instance_id: conf.instance_id
});
const minutes = new promClient.Gauge({
    name: 'minutes',
    help: 'metric_help',
});
const seconds = new promClient.Gauge({
    name: 'seconds',
    help: 'metric_help',
});
const hours = new promClient.Gauge({
    name: 'hours',
    help: 'metric_help',
});

app.get('/metrics', (req, res) => {
    const date = new Date();
    seconds.set(new Date().getSeconds());
    minutes.set(new Date().getMinutes());
    hours.set(new Date().getHours());
    res.set('Content-Type', promClient.register.contentType);
    res.end(promClient.register.metrics());
});
app.listen(conf.express.port, function () {
    console.log(`Metrics ara available on url http://127.0.0.1:${conf.express.port}/metrics !`);
});

