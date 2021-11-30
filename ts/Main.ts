import {ProductRepository} from "./ProductRepository";
import {Product} from "./Product";
import {Validate} from "./libs/Validate";
import {Cart} from "./Cart";

namespace MElement {
	export const PRODUCT_LIST_ELEMENT: string = "#productList";
	export const NOTIFICATION_ELEMENT: string = "#notification";
	export const MYCART_BODY_ELEMENT: string = "#my-cart-body";
	export const MYCART_FOOTER_ELEMENT: string = "#my-cart-footer";
}

namespace MNotification {
	export const BEGINNING_NOTIFICATION: string = "Empty cart";
	export const INVALID_QUANTITY: string = "Invalid quantity";
	export const ADDED_SUCCESSFULLY: string = "Added successfully";
	export const UPDATED_SUCCESSFULLY: string = "Updated successfully";
	export const DELETED_SUCCESSFULLY: string = "Deleted successfully";
}

let productRepository = new ProductRepository();
let cart = new Cart();
let products: Product[] = productRepository.getItems();

function showProductList():void{
	$(MElement.PRODUCT_LIST_ELEMENT).html(productRepository.showItemsInHTML());
}

function showNotification(content:string):void{
	$(MElement.NOTIFICATION_ELEMENT).html(content);
}

function showCart():void{
	$(MElement.MYCART_BODY_ELEMENT).html(cart.showCartBodyInHTML());
	$(MElement.MYCART_FOOTER_ELEMENT).html(cart.showCartFooterInHTML());
}

//Add product
function addProduct(id:number,quantity:number){
	if(Validate.checkQuantity(quantity)){
			let product : Product = productRepository.getItemById(id);
			cart.addProduct(product,quantity);
			showCart();
			showNotification(MNotification.ADDED_SUCCESSFULLY);
		}
		else{
			showNotification(MNotification.INVALID_QUANTITY);
		}
}

//Update product
function updateProduct(id:number,quantity:number){
	if(Validate.checkQuantity(quantity)){
		let product : Product = productRepository.getItemById(id);
		cart.updateProduct(product,quantity);
		showCart();
		showNotification(MNotification.UPDATED_SUCCESSFULLY);
	}
	else{
		showNotification(MNotification.INVALID_QUANTITY);
	}
}

//Delete Product
function deleteProduct(id:number){
	let product : Product = productRepository.getItemById(id);
	cart.deleteProduct(product);
	showCart();
	showNotification(MNotification.DELETED_SUCCESSFULLY);
}

$(document).ready(function(){
	showProductList();
	showCart();
	showNotification(MNotification.BEGINNING_NOTIFICATION);

	//Buy product
	$("button.btn-success").click(function(){
		let id:number = $(this).data("id");
		let quantity:number = Number($("input[name='product-quantity-" + id +"']").val());
		addProduct(id,quantity);				
	})

	$("a.shop-plus").click(function(){
		let id:number = $(this).data("id");
		let quantity:number = Number($("input[name='product-quantity-" + id +"']").val());
		$("input[name='product-quantity-" + id +"']").val(quantity+1);				
	})

	$("a.shop-minus").click(function(){
		let id:number = $(this).data("id");
		let input:number = Number($("input[name='product-quantity-" + id +"']").val());
		if(input > 1){
			$("input[name='product-quantity-" + id +"']").val(input-1);
		}				
	})

	$(document).on("input","input.input-quantity",function(){
		let quantity:any =  Number($(this).val());
		if (quantity < 1 || isNaN(quantity)){
			$(this).val(1);
		}
	})

	//Update product
	$(document).on("click","a.cart-plus",function(){
		let id:number = $(this).data("id");
		let quantity:number = Number($("input[name='cart-item-quantity-" + id +"']").val());
		$("input[name='cart-item-quantity-" + id +"']").val(quantity+1);
		updateProduct(id,Number($("input[name='cart-item-quantity-" + id +"']").val()));
	});

	$(document).on("click","a.cart-minus",function(){
		let id:number = $(this).data("id");
		let quantity:number = Number($("input[name='cart-item-quantity-" + id +"']").val());
		if(quantity > 1){
			$("input[name='cart-item-quantity-" + id +"']").val(quantity-1);
			updateProduct(id,Number($("input[name='cart-item-quantity-" + id +"']").val()));
		}
	});

	$(document).on("input","input.cart-input-quantity",function(){
		let quantity:any =  Number($(this).val());
		if (quantity < 1 || isNaN(quantity)){
			$(this).val(1);
		}
	});

	//Delete product
	$(document).on("click","span.delete-cart-item",function(){
		let id:number = $(this).data("id");
		deleteProduct(id);
	})
});