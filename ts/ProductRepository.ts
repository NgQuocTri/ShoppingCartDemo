import {Product} from "./Product";
import {Helpers} from "./libs/Helpers";
import {books} from "./data/Books";

export class ProductRepository{
	private products: Product[] = [];

	constructor(){
		for(let book of books){
			let product = new Product(book.id,book.name,book.image,book.summary,book.price,book.canBuy);
			this.addItem(product);
		}
	}

	public addItem(product: Product){
		this.products.push(product);
	}

	public getItems(): Product[]{
		return this.products;
	}

	public getItemById(id:number): Product{
		for (let product of this.products){
			if(product.id == id) return product;
		}
		return null;
	}

	public showItemsInHTML():string{
		let htmlResult:string = '';
		let totalProducts = this.products.length;
		if (totalProducts > 0){
			for (let product of this.products){
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
		else{
			htmlResult = "Product not found";
		}
		return htmlResult;
	}

	showBuyItemInHTML(product:Product):string{
		let htmlResult:string = '';
		if(product.canBuy){
			htmlResult = `<div class="col"> <a class="shop-minus" data-id=${product.id} href="#">-</a><input class="input-quantity" style="width:30%" value="1" name="product-quantity-${product.id}"><a class="shop-plus" data-id=${product.id} href="#">+</a> </div>
						  <div class="col">${Helpers.toCurrency(product.price,"$")} </div>
						  <div class="col"><button data-id=${product.id} type="button" class="btn btn-success">Buy</button></div>`;
		}
		else{
			htmlResult = `<div class="col">Out of stock</div>
						  <div class="col">${Helpers.toCurrency(product.price,"$")} </div>
						  <div class="col"><button type="button" style="background-color:grey;border-color:grey" class="btn btn-success" disabled>Buy</button></div>`;
		}
		return htmlResult;
	}
}