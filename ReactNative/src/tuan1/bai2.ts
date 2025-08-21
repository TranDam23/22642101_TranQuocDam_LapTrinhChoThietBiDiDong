import { Person } from "./bai1";

export class Student extends Person {
  grade: string;

  constructor(name: string, age: number, grade: string) {
    super(name, age); // dùng constructor của Person
    this.grade = grade;
  }

  displayAllInfo(): void {
    console.log(`Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
  }
}
