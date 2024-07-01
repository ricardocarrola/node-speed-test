const { performance } = require('perf_hooks');

// Function to generate an array of random integers
function generateRandomArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * size));
    }
    return array;
}

const arraySize = 10000000; // Size of the array
const numbers = generateRandomArray(arraySize);

console.log(`Generated array of ${arraySize} random integers.`);

// Measure the time taken to sort the array
const start = performance.now();
numbers.sort((a, b) => a - b); // Sorting the array
const end = performance.now();

console.log(`Time taken to sort the array: ${(end - start).toFixed(2)} milliseconds`);
