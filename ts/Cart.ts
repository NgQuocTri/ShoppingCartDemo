import {CartItem} from "./CartItem";
import {Product} from "./Product";
import {Helpers} from "./libs/Helpers";

export class Cart{
	private cartItems: CartItem[] = [];
	private totalQuantity:number = 0;
	private totalPrice:number = 0;

	public addProduct(product:Product,quantity:number = 1): void{
		let itemPosition : number = this.getItemPosition(product);
		if (itemPosition > -1){
			this.cartItems[itemPosition].quantity = quantity;
		}
		else{
			let cartItem = new CartItem(product,quantity);
			this.cartItems.push(cartItem);
			this.totalQuantity += quantity;
		}
	}

	private getItemPosition(product:Product): number{
		for (let index in this.cartItems){
			if (this.cartItems[index].product.id == product.id) return parseInt(index);
		}
		return -1;
	}

	public updateProduct(product:Product,quantity:number):void{
		let itemPosition : number = this.getItemPosition(product);
		if (itemPosition > -1){
			this.cartItems[itemPosition].quantity = quantity;
		}
	}

	public deleteProduct(product:Product):void{
		let itemPosition : number = this.getItemPosition(product);
		if (itemPosition > -1){
			this.cartItems.splice(itemPosition,1);
		}
	}

	public isEmpty():boolean{
		return (this.cartItems.length == 0);
	}

	public getTotalQuantity():number{
		let totalQuantity:number = 0;
		for(let cartItem of this.cartItems){
			totalQuantity += cartItem.quantity;
		}
		return totalQuantity;
	}

	public getTotalPrice():number{
		let totalPrice:number = 0;
		for(let cartItem of this.cartItems){
			totalPrice += cartItem.quantity * cartItem.product.price;
		}
		return totalPrice;
	}

	public showCartBodyInHTML():string{
		let xtmlResult:string = ``;
		if(!this.isEmpty()){
			this.cartItems.forEach((cartItem, index) => {
    			xtmlResult += cartItem.showCartItemInHTML(index + 1);
			});
		}
		else{
			xtmlResult = `<tr><th colspan="6" scope="row"> </th></tr>`;
		}
		return xtmlResult;
	}

	public showCartFooterInHTML():string{
		let xtmlResult:string = `<div class="col" style="padding-left:0;">TOTAL ITEMS: ${this.getTotalQuantity()}</div>
						  		<div class="col text-right">TOTAL PRICE: ${Helpers.toCurrency(this.getTotalPrice(),"$")}</div>`;
		if(!this.isEmpty()){
			xtmlResult = `<div class="col" style="padding-left:0;">TOTAL ITEMS: ${this.getTotalQuantity()}</div>
						  <div class="col text-right">TOTAL PRICE: ${Helpers.toCurrency(this.getTotalPrice(),"$")}</div>`;
		}		
		return xtmlResult;
	}
}