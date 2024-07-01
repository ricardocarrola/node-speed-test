// worker.js
const { parentPort } = require('worker_threads');

parentPort.on('message', (array) => {
    const sortedArray = array.sort((a, b) => a - b);
    parentPort.postMessage(sortedArray);
});