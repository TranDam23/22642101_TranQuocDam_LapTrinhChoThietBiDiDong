export class BankAccount {
  private balance: number;

  constructor(initialBalance: number = 0) {
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited: ${amount}. New balance: ${this.balance}`);
    } else {
      console.log("Deposit amount must be positive.");
    }
  }

  withdraw(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrew: ${amount}. New balance: ${this.balance}`);
    } else if (amount > this.balance) {
      console.log(`Withdrew: ${amount}.` + " Insufficient funds.");
    } else {
      console.log("Withdraw amount must be positive.");
    }
  }

  getBalance(): number {
    return this.balance;
  }
}
