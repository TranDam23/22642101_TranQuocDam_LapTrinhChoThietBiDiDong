"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomNumber = getRandomNumber;
function getRandomNumber() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const num = Math.floor(Math.random() * 100); // số ngẫu nhiên 0-99
            if (num >= 0) {
                resolve(num);
            }
            else {
                reject("Lỗi! Không tạo được số.");
            }
        }, 1000);
    });
}
