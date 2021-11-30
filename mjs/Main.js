define(["require", "exports", "./ProductRepository", "./libs/Validate", "./Cart"], function (require, exports, ProductRepository_1, Validate_1, Cart_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MElement;
    (function (MElement) {
        MElement.PRODUCT_LIST_ELEMENT = "#productList";
        MElement.NOTIFICATION_ELEMENT = "#notification";
        MElement.MYCART_BODY_ELEMENT = "#my-cart-body";
        MElement.MYCART_FOOTER_ELEMENT = "#my-cart-footer";
    })(MElement || (MElement = {}));
    var MNotification;
    (function (MNotification) {
        MNotification.BEGINNING_NOTIFICATION = "Empty cart";
        MNotification.INVALID_QUANTITY = "Invalid quantity";
        MNotification.ADDED_SUCCESSFULLY = "Added successfully";
        MNotification.UPDATED_SUCCESSFULLY = "Updated successfully";
        MNotification.DELETED_SUCCESSFULLY = "Deleted successfully";
    })(MNotification || (MNotification = {}));
    let productRepository = new ProductRepository_1.ProductRepository();
    let cart = new Cart_1.Cart();
    let products = productRepository.getItems();
    function showProductList() {
        $(MElement.PRODUCT_LIST_ELEMENT).html(productRepository.showItemsInHTML());
    }
    function showNotification(content) {
        $(MElement.NOTIFICATION_ELEMENT).html(content);
    }
    function showCart() {
        $(MElement.MYCART_BODY_ELEMENT).html(cart.showCartBodyInHTML());
        $(MElement.MYCART_FOOTER_ELEMENT).html(cart.showCartFooterInHTML());
    }
    //Add product
    function addProduct(id, quantity) {
        if (Validate_1.Validate.checkQuantity(quantity)) {
            let product = productRepository.getItemById(id);
            cart.addProduct(product, quantity);
            showCart();
            showNotification(MNotification.ADDED_SUCCESSFULLY);
        }
        else {
            showNotification(MNotification.INVALID_QUANTITY);
        }
    }
    //Update product
    function updateProduct(id, quantity) {
        if (Validate_1.Validate.checkQuantity(quantity)) {
            let product = productRepository.getItemById(id);
            cart.updateProduct(product, quantity);
            showCart();
            showNotification(MNotification.UPDATED_SUCCESSFULLY);
        }
        else {
            showNotification(MNotification.INVALID_QUANTITY);
        }
    }
    //Delete Product
    function deleteProduct(id) {
        let product = productRepository.getItemById(id);
        cart.deleteProduct(product);
        showCart();
        showNotification(MNotification.DELETED_SUCCESSFULLY);
    }
    $(document).ready(function () {
        showProductList();
        showCart();
        showNotification(MNotification.BEGINNING_NOTIFICATION);
        //Buy product
        $("button.btn-success").click(function () {
            let id = $(this).data("id");
            let quantity = Number($("input[name='product-quantity-" + id + "']").val());
            addProduct(id, quantity);
        });
        $("a.shop-plus").click(function () {
            let id = $(this).data("id");
            let quantity = Number($("input[name='product-quantity-" + id + "']").val());
            $("input[name='product-quantity-" + id + "']").val(quantity + 1);
        });
        $("a.shop-minus").click(function () {
            let id = $(this).data("id");
            let input = Number($("input[name='product-quantity-" + id + "']").val());
            if (input > 1) {
                $("input[name='product-quantity-" + id + "']").val(input - 1);
            }
        });
        $(document).on("input", "input.input-quantity", function () {
            let quantity = Number($(this).val());
            if (quantity < 1 || isNaN(quantity)) {
                $(this).val(1);
            }
        });
        //Update product
        $(document).on("click", "a.cart-plus", function () {
            let id = $(this).data("id");
            let quantity = Number($("input[name='cart-item-quantity-" + id + "']").val());
            $("input[name='cart-item-quantity-" + id + "']").val(quantity + 1);
            updateProduct(id, Number($("input[name='cart-item-quantity-" + id + "']").val()));
        });
        $(document).on("click", "a.cart-minus", function () {
            let id = $(this).data("id");
            let quantity = Number($("input[name='cart-item-quantity-" + id + "']").val());
            if (quantity > 1) {
                $("input[name='cart-item-quantity-" + id + "']").val(quantity - 1);
                updateProduct(id, Number($("input[name='cart-item-quantity-" + id + "']").val()));
            }
        });
        $(document).on("input", "input.cart-input-quantity", function () {
            let quantity = Number($(this).val());
            if (quantity < 1 || isNaN(quantity)) {
                $(this).val(1);
            }
        });
        //Delete product
        $(document).on("click", "span.delete-cart-item", function () {
            let id = $(this).data("id");
            deleteProduct(id);
        });
    });
});
