"use strict";
//--------------------------------Tuần 1--------------------------------
// //Bai1:
// import { Person } from "./tuan1/bai1";
Object.defineProperty(exports, "__esModule", { value: true });
// console.log("Bai1:");
// const person1 = new Person("Nguyen Van A", 25);
// person1.displayInfo();
// //Bai2:
// import { Student } from "./tuan1/bai2";
// console.log("\nBai2:");
// const student1 = new Student("Nguyen Van B", 20, "A");
// student1.displayAllInfo();
// //Bai3:
// import { Car } from "./tuan1/bai3";
// console.log("\nBai3:");
// const car1 = new Car("Toyota", "Camry", 2022);
// car1.showInfo();
// //Bai4:
// import { Rectangle } from "./tuan1/bai4";
// console.log("\nBai4:");
// const rect1 = new Rectangle(5, 10);
// rect1.showInfo();
// //Bai5:
// import { BankAccount } from "./tuan1/bai5";
// console.log("\nBai5:");
// const account = new BankAccount(1000);
// account.deposit(500);
// account.withdraw(300);
// account.withdraw(1500);
// console.log("Final Balance:", account.getBalance());
// //Bai6:
// import { Book } from "./tuan1/bai6";
// console.log("\nBai6:");
// const book1 = new Book("Clean Code", "Robert C. Martin", 2008);
// book1.displayInfo();
// //Bai7:
// import { User } from "./tuan1/bai7";
// console.log("\nBai7:");
// const user1 = new User("Nguyen Van A");
// user1.displayInfo();
// console.log("Current name:", user1.getName());
// user1.setName("Nguyen Van B");
// console.log("After update:", user1.getName());
//--------------------------------Tuần 2--------------------------------
//Bai1:
const bai1_1 = require("./tuan2/bai1");
(0, bai1_1.helloAsync)().then((msg) => {
    console.log("\nBai1:");
    console.log(msg);
});
//Bai2:
const bai2_1 = require("./tuan2/bai2");
(0, bai2_1.getNumber)().then((num) => {
    console.log("\nBai2:");
    console.log("Resolved number:", num);
});
//Bai3:
const bai3_1 = require("./tuan2/bai3");
(0, bai3_1.throwError)()
    .then((msg) => {
    console.log("\nBai3:");
    console.log("Resolved:", msg);
})
    .catch((err) => {
    console.log("\nBai3:");
    console.error("Rejected:", err);
});
//Bai4:
const bai4_1 = require("./tuan2/bai4");
(0, bai4_1.getRandomNumber)()
    .then((num) => {
    console.log("\nBai4:");
    console.log("Random number:", num);
})
    .catch((err) => {
    console.log("\nBai4:");
    console.error("Error:", err);
});
//Bai5:
const bai5_1 = require("./tuan2/bai5");
(0, bai5_1.simulateTask)(2000).then((msg) => {
    console.log("\nBai5:");
    console.log(msg);
});
//Bai6:
const bai6_1 = require("./tuan2/bai6");
(0, bai6_1.runParallelTasks)();
//Bai7:
const bai7_1 = require("./tuan2/bai7");
(0, bai7_1.runRaceTasks)();
//Bai8:
const bai8_1 = require("./tuan2/bai8");
(0, bai8_1.runPromiseChain)();
//bai9:
const bai9_1 = require("./tuan2/bai9");
(0, bai9_1.filterEvenNumbers)([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30])
    .then((evens) => {
    console.log("\nBai9:");
    console.log("Chuỗi số chẵn:", evens);
})
    .catch((err) => {
    console.error("Error:", err);
});
//bai10:
const bai10_1 = require("./tuan2/bai10");
(0, bai10_1.randomPromise)()
    .then((msg) => {
    console.log("\nBai10:");
    console.log("Result:", msg);
})
    .catch((err) => {
    console.log("\nBai10:");
    console.error("Error:", err);
})
    .finally(() => {
    console.log("Done");
});
//Bai11:
const bai11_1 = require("./tuan2/bai11");
//Bai12:
const bai12_1 = require("./tuan2/bai12");
//Bai13:
const bai13_1 = require("./tuan2/bai13");
async function main() {
    await (0, bai11_1.run11)();
    await (0, bai12_1.run12)();
    await (0, bai13_1.run13)();
}
main();
