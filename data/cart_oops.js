import { deliveryOptions } from "./deliveryOptions.js";

// Creating object for Cart
const cart = {
  cartItems: undefined,

  //Function to get the cart from localstorage
  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem("cart-oops"));

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ];
    }
  },

  //Function to use local storage to save our cart data
  saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cartItems));
  },

  //Function to add products to Cart
  addToCart(productId) {
    let matchingItem;
    this.cartItems.forEach((item) => {
      if (productId == item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionsId: "1",
      });
    }
    this.saveToStorage();
  },

  //Fuction to remove products form Cart
  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.saveToStorage();
  },

  //Function to update delivery option details everytime we change it
  updateDeliveryOptions(productId, deliveryOptionsId) {
    let matchingItem;
    this.cartItems.forEach((item) => {
      if (productId == item.productId) {
        matchingItem = item;
      }
    });
    matchingItem.deliveryOptionsId = deliveryOptionsId;
    this.saveToStorage();
  },
};

// Get the cart from the local storage
cart.loadFromStorage();
console.log(cart);