"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
class BankAccount {
    constructor(initialBalance = 0) {
        this.balance = initialBalance;
    }
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited: ${amount}. New balance: ${this.balance}`);
        }
        else {
            console.log("Deposit amount must be positive.");
        }
    }
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrew: ${amount}. New balance: ${this.balance}`);
        }
        else if (amount > this.balance) {
            console.log(`Withdrew: ${amount}.` + " Insufficient funds.");
        }
        else {
            console.log("Withdraw amount must be positive.");
        }
    }
    getBalance() {
        return this.balance;
    }
}
exports.BankAccount = BankAccount;
