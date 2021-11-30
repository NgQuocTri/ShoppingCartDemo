import {Product} from "./Product";
import {Helpers} from "./libs/Helpers";

export class CartItem{
	private _product: Product;
	private _quantity: number;

	constructor(product: Product, quantity:number = 1){
		this._product = product;
		this._quantity = quantity;
	}

	public get product():Product{
		return this._product;
	}

	public set product(product:Product){
		this._product = product;
	}

	public get quantity():number{
		return this._quantity;
	}

	public set quantity(quantity:number){
		this._quantity = quantity;
	}

	public showCartItemInHTML(index:number):string{
		let xtmlResult:string = `<tr>
									<th scope="row">${index}</th>
									<td>${this.product.name}</td>
									<td>${Helpers.toCurrency(this.product.price,"$")}</td>
									<td><a class="cart-minus" data-id=${this.product.id} href="#">-</a><input style="width:50%" class="cart-input-quantity" data-id=${this.product.id} name="cart-item-quantity-${this.product.id}" value=${this.quantity}><a class="cart-plus" data-id=${this.product.id} href="#">+</a></td>
									<td><strong>${Helpers.toCurrency(this.getSubTotal(),"$")}</strong></td>
									<td><div><span type="button" class="badge bg-danger delete-cart-item" data-id=${this.product.id}>Delete</span></div></td>
								</tr>`;
		return xtmlResult;
	}

	public getSubTotal():number{
		let subTotal: number = this.product.price * this.quantity;
		return subTotal;
	}
}