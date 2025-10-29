"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(name) {
        this.name = name;
    }
    // Getter
    getName() {
        return this.name;
    }
    // Setter
    setName(newName) {
        if (newName.trim().length > 0) {
            this.name = newName;
        }
        else {
            console.log("Tên không hợp lệ!");
        }
    }
    displayInfo() {
        console.log(`User name: ${this.name}`);
    }
}
exports.User = User;
