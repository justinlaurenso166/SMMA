const mqtt = require("mqtt")

const host = 'au1.cloud.thethings.network'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'ormawa-apps@ttn',
    password: 'NNSXS.EVRJJHRXRLOHJLALVKYXTIWP57KS2NHIYVICWJI.XTCWG2WVKWYKEHU43VSBSPZZVEEBW5HP4YTRHK4OMY2FOROPMWOQ',
    reconnectPeriod: 1000,
})

let topic = "v3/ormawa-apps@ttn/devices/end-device-ormawa/up"

console.log("RUN ....")

client.on('connect', () => {
    client.subscribe(topic, { qos: 0, retain: false }, (err, granted) => {
        console.log(granted);
    });
    console.log("connected : " + client.connected)
    console.log(`Subscribe to topic '${topic}'`)
});

client.on("reconnect", () => {
    console.log("reconnect ....")
});

client.on("error", e => {
    console.log("error: " + e.message);
});

module.exports = { client }