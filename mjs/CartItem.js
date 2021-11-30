define(["require", "exports", "./libs/Helpers"], function (require, exports, Helpers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CartItem = void 0;
    class CartItem {
        constructor(product, quantity = 1) {
            this._product = product;
            this._quantity = quantity;
        }
        get product() {
            return this._product;
        }
        set product(product) {
            this._product = product;
        }
        get quantity() {
            return this._quantity;
        }
        set quantity(quantity) {
            this._quantity = quantity;
        }
        showCartItemInHTML(index) {
            let xtmlResult = `<tr>
									<th scope="row">${index}</th>
									<td>${this.product.name}</td>
									<td>${Helpers_1.Helpers.toCurrency(this.product.price, "$")}</td>
									<td><a class="cart-minus" data-id=${this.product.id} href="#">-</a><input style="width:50%" class="cart-input-quantity" data-id=${this.product.id} name="cart-item-quantity-${this.product.id}" value=${this.quantity}><a class="cart-plus" data-id=${this.product.id} href="#">+</a></td>
									<td><strong>${Helpers_1.Helpers.toCurrency(this.getSubTotal(), "$")}</strong></td>
									<td><div><span type="button" class="badge bg-danger delete-cart-item" data-id=${this.product.id}>Delete</span></div></td>
								</tr>`;
            return xtmlResult;
        }
        getSubTotal() {
            let subTotal = this.product.price * this.quantity;
            return subTotal;
        }
    }
    exports.CartItem = CartItem;
});
