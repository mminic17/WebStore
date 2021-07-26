import { getProductById, re_render } from "../api.js";
import { parseUrl } from "../parseUrl.js";

function getCartItems() {
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  return cartItems;
}

function setCartItems(cartItems) {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

const addToCart = (item, update = false) => {
  let cartItems = getCartItems();
  const isExist = cartItems.some((x) => x.productId === item.productId);
  if (isExist) {
    if (update) {
      cartItems = cartItems.map((x) =>
        x.productId === item.productId ? item : x
      );
    }
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (update) {
    re_render(ShoppingCartScreen);
  }
};

function removeFromCart(id) {
  setCartItems(getCartItems().filter((x) => x.productId !== id));
  if (id === parseUrl().id) {
    document.location.hash = "/cart";
  } else {
    re_render(ShoppingCartScreen);
  }
}

const ShoppingCartScreen = {
  after_render: () => {
    const quantities = document.getElementsByClassName("quantity-select");
    Array.from(quantities).forEach((quantity) => {
      quantity.addEventListener("change", (e) => {
        const item = getCartItems().find((x) => x.productId === quantity.id);
        addToCart({ ...item, quantity: Number(e.target.value) }, true);
      });
    });
    const deleteButtons = document.getElementsByClassName(
      "cart-product-remove"
    );
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener("click", () => {
        removeFromCart(deleteButton.id);
      });
    });
  },
  render: async () => {
    const request = parseUrl();
    if (request.id) {
      const product = await getProductById(request.id);
      addToCart({
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        quantity: 1,
      });
    }
    const cartItems = getCartItems();
    return `<div class="cart-container">
      <h1>Shopping Cart</h1>
      <div class="cart">
        <div class="cart-products">
            ${
              cartItems.length === 0
                ? `<div class="cart-empty">Cart is empty.</div>`
                : cartItems
                    .map(
                      (item) => `
              <div class="cart-product">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-product-info">
                  <h3 class="cart-product-name">${item.name}</h3>
                  <h4 class="cart-product-price">$${item.price}</h4>
                  <h4 class="cart-product-countInStock">Count in stock: ${
                    item.countInStock
                  }</h4>
                  <p class="cart-product-quantity">
                    Quantity: 
                    <select class="quantity-select" id="${item.productId}">
                    ${[...Array(item.countInStock).keys()].map((x) =>
                      item.quantity === x + 1
                        ? `<option selected value="${x + 1}">${x + 1}</option>`
                        : `<option value="${x + 1}">${x + 1}</option>`
                    )}
                    </select>
                  </p>
                  <p class="cart-product-remove" id="${item.productId}">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                    <span class="remove">Remove</span>
                  </p>
                </div>
              </div>
            `
                    )
                    .join("\n")
            }
        </div>
        <div class="cart-total">
          <p>
              <span>Total Price</span>
              <span>$ ${cartItems.reduce(
                (a, c) => a + c.price * c.quantity,
                0
              )}</span>
          </p>
          <p>
              <span>Number of Items</span>
              <span>${cartItems.reduce((a, c) => a + c.quantity, 0)}</span>
          </p>
          
          <a href="#">Proceed to Checkout</a>
      </div>
    </div>
      </div>
      
    `;
  },
};

export default ShoppingCartScreen;
