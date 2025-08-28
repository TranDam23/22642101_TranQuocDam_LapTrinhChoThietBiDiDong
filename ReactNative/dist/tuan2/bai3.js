"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = throwError;
function throwError() {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject("Đã xảy ra lỗi!");
        }, 1000);
    });
}
