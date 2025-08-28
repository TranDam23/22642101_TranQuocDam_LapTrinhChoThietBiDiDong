"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runPromiseChain = runPromiseChain;
function runPromiseChain() {
    Promise.resolve(2)
        .then((num) => {
        console.log("\nBai8:");
        const squared = num * num;
        console.log("Kết quả sau bình phương:", squared);
        return squared;
    })
        .then((num) => {
        const doubled = num * 2;
        console.log("Kết quả tiếp tục nhân đôi:", doubled);
        return doubled;
    })
        .then((num) => {
        const result = num + 5;
        console.log("Kết quả cộng thêm 5:", result);
        return result;
    })
        .then((final) => {
        console.log("Kết quả cuối cùng:", final);
    })
        .catch((err) => {
        console.error("Error:", err);
    });
}
