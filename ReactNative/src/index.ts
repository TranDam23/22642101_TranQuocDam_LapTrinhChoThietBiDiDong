//Bai1:
import { Person } from "./tuan1/bai1";

console.log("Bai1:");

const person1 = new Person("Nguyen Van A", 25);
person1.displayInfo();

//Bai2:
import { Student } from "./tuan1/bai2";

console.log("\nBai2:");

const student1 = new Student("Nguyen Van B", 20, "A");
student1.displayAllInfo();

//Bai3:
import { Car } from "./tuan1/bai3";

console.log("\nBai3:");

const car1 = new Car("Toyota", "Camry", 2022);
car1.showInfo();

//Bai4:
import { Rectangle } from "./tuan1/bai4";

console.log("\nBai4:");
const rect1 = new Rectangle(5, 10);
rect1.showInfo();

//Bai5:
import { BankAccount } from "./tuan1/bai5";

console.log("\nBai5:");

const account = new BankAccount(1000);
account.deposit(500);
account.withdraw(300);
account.withdraw(1500);
console.log("Final Balance:", account.getBalance());

//Bai6:
import { Book } from "./tuan1/bai6";

console.log("\nBai6:");
const book1 = new Book("Clean Code", "Robert C. Martin", 2008);
book1.displayInfo();

//Bai7:
import { User } from "./tuan1/bai7";

console.log("\nBai7:");
const user1 = new User("Nguyen Van A");
user1.displayInfo();

console.log("Current name:", user1.getName());

user1.setName("Nguyen Van B");
console.log("After update:", user1.getName());
