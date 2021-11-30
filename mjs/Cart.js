define(["require", "exports", "./CartItem", "./libs/Helpers"], function (require, exports, CartItem_1, Helpers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Cart = void 0;
    class Cart {
        constructor() {
            this.cartItems = [];
            this.totalQuantity = 0;
            this.totalPrice = 0;
        }
        addProduct(product, quantity = 1) {
            let itemPosition = this.getItemPosition(product);
            if (itemPosition > -1) {
                this.cartItems[itemPosition].quantity = quantity;
            }
            else {
                let cartItem = new CartItem_1.CartItem(product, quantity);
                this.cartItems.push(cartItem);
                this.totalQuantity += quantity;
            }
        }
        getItemPosition(product) {
            for (let index in this.cartItems) {
                if (this.cartItems[index].product.id == product.id)
                    return parseInt(index);
            }
            return -1;
        }
        updateProduct(product, quantity) {
            let itemPosition = this.getItemPosition(product);
            if (itemPosition > -1) {
                this.cartItems[itemPosition].quantity = quantity;
            }
        }
        deleteProduct(product) {
            let itemPosition = this.getItemPosition(product);
            if (itemPosition > -1) {
                this.cartItems.splice(itemPosition, 1);
            }
        }
        isEmpty() {
            return (this.cartItems.length == 0);
        }
        getTotalQuantity() {
            let totalQuantity = 0;
            for (let cartItem of this.cartItems) {
                totalQuantity += cartItem.quantity;
            }
            return totalQuantity;
        }
        getTotalPrice() {
            let totalPrice = 0;
            for (let cartItem of this.cartItems) {
                totalPrice += cartItem.quantity * cartItem.product.price;
            }
            return totalPrice;
        }
        showCartBodyInHTML() {
            let xtmlResult = ``;
            if (!this.isEmpty()) {
                this.cartItems.forEach((cartItem, index) => {
                    xtmlResult += cartItem.showCartItemInHTML(index + 1);
                });
            }
            else {
                xtmlResult = `<tr><th colspan="6" scope="row"> </th></tr>`;
            }
            return xtmlResult;
        }
        showCartFooterInHTML() {
            let xtmlResult = `<div class="col" style="padding-left:0;">TOTAL ITEMS: ${this.getTotalQuantity()}</div>
						  		<div class="col text-right">TOTAL PRICE: ${Helpers_1.Helpers.toCurrency(this.getTotalPrice(), "$")}</div>`;
            if (!this.isEmpty()) {
                xtmlResult = `<div class="col" style="padding-left:0;">TOTAL ITEMS: ${this.getTotalQuantity()}</div>
						  <div class="col text-right">TOTAL PRICE: ${Helpers_1.Helpers.toCurrency(this.getTotalPrice(), "$")}</div>`;
            }
            return xtmlResult;
        }
    }
    exports.Cart = Cart;
});
