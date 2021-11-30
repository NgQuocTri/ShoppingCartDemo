define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Product = void 0;
    class Product {
        constructor(id, name, image, summary, price, canBuy = true) {
            this.id = id;
            this.name = name;
            this.image = image;
            this.summary = summary;
            this.price = price;
            this.canBuy = canBuy;
        }
        get id() {
            return this._id;
        }
        set id(id) {
            this._id = id;
        }
        get name() {
            return this._name;
        }
        set name(name) {
            this._name = name;
        }
        get image() {
            return this._image;
        }
        set image(image) {
            this._image = image;
        }
        get summary() {
            return this._summary;
        }
        set summary(summary) {
            this._summary = summary;
        }
        get price() {
            return this._price;
        }
        set price(price) {
            this._price = price;
        }
        get canBuy() {
            return this._canBuy;
        }
        set canBuy(canBuy) {
            this._canBuy = canBuy;
        }
    }
    exports.Product = Product;
});
