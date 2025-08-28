"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run12 = run12;
function simulateTask(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task hoàn thành trong ${ms} ms`);
        }, ms);
    });
}
async function run12() {
    const result = await simulateTask(2000);
    console.log("\nBai12:");
    console.log(result);
}
