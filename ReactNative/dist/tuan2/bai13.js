"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run13 = run13;
function simulateTask(ms, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`Task failed after ${ms} ms`));
            }
            else {
                resolve(`Task completed in ${ms} ms`);
            }
        }, ms);
    });
}
async function run13() {
    try {
        const result = await simulateTask(2000, false); // true = mô phỏng lỗi
        console.log("\nBai13:");
        console.log(result);
    }
    catch (error) {
        console.log("\nBai13:");
        console.error("Error caught:", error.message);
    }
}
