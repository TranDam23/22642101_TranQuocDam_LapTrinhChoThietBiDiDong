"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
    showInfo() {
        console.log(`Rectangle: width=${this.width}, height=${this.height}, area=${this.getArea()}, perimeter=${this.getPerimeter()}`);
    }
}
exports.Rectangle = Rectangle;
