"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Bai1:
const bai1_1 = require("./tuan1/bai1");
console.log("Bai1:");
const person1 = new bai1_1.Person("Nguyen Van A", 25);
person1.displayInfo();
//Bai2:
const bai2_1 = require("./tuan1/bai2");
console.log("\nBai2:");
const student1 = new bai2_1.Student("Nguyen Van B", 20, "A");
student1.displayAllInfo();
//Bai3:
const bai3_1 = require("./tuan1/bai3");
console.log("\nBai3:");
const car1 = new bai3_1.Car("Toyota", "Camry", 2022);
car1.showInfo();
//Bai4:
const bai4_1 = require("./tuan1/bai4");
console.log("\nBai4:");
const rect1 = new bai4_1.Rectangle(5, 10);
rect1.showInfo();
//Bai5:
const bai5_1 = require("./tuan1/bai5");
console.log("\nBai5:");
const account = new bai5_1.BankAccount(1000);
account.deposit(500);
account.withdraw(300);
account.withdraw(1500);
console.log("Final Balance:", account.getBalance());
//Bai6:
const bai6_1 = require("./tuan1/bai6");
console.log("\nBai6:");
const book1 = new bai6_1.Book("Clean Code", "Robert C. Martin", 2008);
book1.displayInfo();
//Bai7:
const bai7_1 = require("./tuan1/bai7");
console.log("\nBai7:");
const user1 = new bai7_1.User("Nguyen Van A");
user1.displayInfo();
console.log("Current name:", user1.getName());
user1.setName("Nguyen Van B");
console.log("After update:", user1.getName());
