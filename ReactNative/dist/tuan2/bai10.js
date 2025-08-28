"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomPromise = randomPromise;
function randomPromise() {
    return new Promise((resolve, reject) => {
        const success = Math.random() > 0.5; // 50% thành công - 50% thất bại
        setTimeout(() => {
            if (success) {
                resolve("Thành công!");
            }
            else {
                reject("Thất bại!");
            }
        }, 1000);
    });
}
