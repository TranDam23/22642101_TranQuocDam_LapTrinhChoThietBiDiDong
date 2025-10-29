"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterEvenNumbers = filterEvenNumbers;
function filterEvenNumbers(arr) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const evens = arr.filter((num) => num % 2 === 0);
            resolve(evens);
        }, 1000);
    });
}
