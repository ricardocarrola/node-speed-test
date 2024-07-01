// speed.js
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const numElements = 1000000; // Configurable number of elements
const numWorkers = 4; // Number of worker threads

if (isMainThread) {
    // Function to generate random numbers
    const generateRandomNumbers = (count) => {
        const array = new Array(count);
        for (let i = 0; i < count; i++) {
            array[i] = Math.floor(Math.random() * 1000000);
        }
        return array;
    };

    const numbers = generateRandomNumbers(numElements);
    const segmentSize = Math.ceil(numbers.length / numWorkers);
    const promises = [];
    const startTime = Date.now(); // Start time

    for (let i = 0; i < numWorkers; i++) {
        const start = i * segmentSize;
        const end = Math.min(start + segmentSize, numbers.length);
        const segment = numbers.slice(start, end);

        promises.push(new Promise((resolve, reject) => {
            const worker = new Worker(__filename, {
                workerData: segment
            });

            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
            });
        }));
    }

    Promise.all(promises).then((sortedSegments) => {
        const sortedArray = [].concat(...sortedSegments).sort((a, b) => a - b);
        const endTime = Date.now(); // End time
        //console.log(sortedArray);
        console.log(`Time taken: ${endTime - startTime} milliseconds`);
    }).catch((err) => console.error(err));
} else {
    const sortedArray = workerData.sort((a, b) => a - b);
    parentPort.postMessage(sortedArray);
}
