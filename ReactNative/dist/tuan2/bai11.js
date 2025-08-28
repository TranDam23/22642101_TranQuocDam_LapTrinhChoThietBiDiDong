"use strict";
// bai11.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.run11 = run11;
// Hàm trả về Promise
function getHelloAsync() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hello Async");
        }, 2000);
    });
}
// Dùng async/await
async function run11() {
    const message = await getHelloAsync();
    console.log("\nBai11:");
    console.log(message);
}
