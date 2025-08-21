export class User {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Getter
  getName(): string {
    return this.name;
  }

  // Setter
  setName(newName: string): void {
    if (newName.trim().length > 0) {
      this.name = newName;
    } else {
      console.log("Tên không hợp lệ!");
    }
  }

  displayInfo(): void {
    console.log(`User name: ${this.name}`);
  }
}
