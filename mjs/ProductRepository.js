define(["require", "exports", "./Product", "./libs/Helpers", "./data/Books"], function (require, exports, Product_1, Helpers_1, Books_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProductRepository = void 0;
    class ProductRepository {
        constructor() {
            this.products = [];
            for (let book of Books_1.books) {
                let product = new Product_1.Product(book.id, book.name, book.image, book.summary, book.price, book.canBuy);
                this.addItem(product);
            }
        }
        addItem(product) {
            this.products.push(product);
        }
        getItems() {
            return this.products;
        }
        getItemById(id) {
            for (let product of this.products) {
                if (product.id == id)
                    return product;
            }
            return null;
        }
        showItemsInHTML() {
            let htmlResult = '';
            let totalProducts = this.products.length;
            if (totalProducts > 0) {
                for (let product of this.products) {
                    htmlResult += `<div class="row border-top border-bottom">
								<div class="row main align-items-center">
									<div class="col-2"><img class="img-fluid" src="img/book/${product.image}"></div>
									<div class="col">
										<div class="row text-muted">${product.name}</div>
										<div class="row">${product.summary}</div>
									</div>
									${this.showBuyItemInHTML(product)}
								</div>
							</div>`;
                }
            }
            else {
                htmlResult = "Product not found";
            }
            return htmlResult;
        }
        showBuyItemInHTML(product) {
            let htmlResult = '';
            if (product.canBuy) {
                htmlResult = `<div class="col"> <a class="shop-minus" data-id=${product.id} href="#">-</a><input class="input-quantity" style="width:30%" value="1" name="product-quantity-${product.id}"><a class="shop-plus" data-id=${product.id} href="#">+</a> </div>
						  <div class="col">${Helpers_1.Helpers.toCurrency(product.price, "$")} </div>
						  <div class="col"><button data-id=${product.id} type="button" class="btn btn-success">Buy</button></div>`;
            }
            else {
                htmlResult = `<div class="col">Out of stock</div>
						  <div class="col">${Helpers_1.Helpers.toCurrency(product.price, "$")} </div>
						  <div class="col"><button type="button" style="background-color:grey;border-color:grey" class="btn btn-success" disabled>Buy</button></div>`;
            }
            return htmlResult;
        }
    }
    exports.ProductRepository = ProductRepository;
});
