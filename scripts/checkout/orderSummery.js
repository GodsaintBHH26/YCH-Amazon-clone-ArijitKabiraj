import { cart, removeFromCart, updateDeliveryOptions } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { deliveryOptions, getDeliveryOptions } from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummery } from "./paymentSummery.js";
import { formatCurrency } from "../utils/money.js";

export  function renderOrderSummary() {
    let cartSummaryHTML = "";
  
    cart.forEach((cartItem) => {
      let productId = cartItem.productId;
  
      const matchingProduct = getProduct(productId);
      
      const deliveryOptionsId = cartItem.deliveryOptionsId;
  
      const deliveryOption = getDeliveryOptions(deliveryOptionsId);
      
  
      const today = dayjs(); // Gets the current date
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days"); // Delivery day & date calculation
      const dateString = deliveryDate.format("dddd, MMMM D");
  
      cartSummaryHTML += `<div class="cart-item-container js-cart-item-container js-order-summary js-cart-item-container-${
        matchingProduct.id
      }">
                <div class="delivery-date">
                  Delivery date: ${dateString}
                </div>
    
                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProduct.image}">
    
                  <div class="cart-item-details">
                    <div class="product-name">
                     ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                      $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                      <span>
                        Quantity: <span class="quantity-label">${
                          cartItem.quantity
                        }</span>
                      </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                        matchingProduct.id
                      }">
                        Delete
                      </span>
                    </div>
                  </div>
    
                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    
                    ${deliveryOptionHTML(matchingProduct, cartItem)}
    
                  </div>
                </div>
              </div>`;
    });
  
    document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
  
    function deliveryOptionHTML(matchingProduct, cartItem) {
      let html = "";
  
      deliveryOptions.forEach((deliveryOptions) => {
        const today = dayjs(); // Gets the current date
  
        const deliveryDate = today.add(deliveryOptions.deliveryDays, "days"); // Delivery day & date calculation
  
        const dateString = deliveryDate.format("dddd, MMMM D");
  
        const priceString =
          deliveryOptions.priceCents === 0
            ? "FREE"
            : `${formatCurrency(deliveryOptions.priceCents)} $`;
  
        const isChecked = deliveryOptions.id === cartItem.deliveryOptionsId;
  
        html += `
      <div class="delivery-option js-delivery-option" data-delivery-option-id="${
        deliveryOptions.id
      }" data-product-id="${matchingProduct.id}">
                      <input type="radio" ${isChecked ? "checked" : ""}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                      <div>
                        <div class="delivery-option-date">
                          ${dateString}
                        </div>
                        <div class="delivery-option-price">
                          ${priceString} - Shipping
                        </div>
                      </div>
                    </div>
    
                    `;
      });
      return html;
    }
  
    document.querySelectorAll(".js-delete-link").forEach((link) => {
      link.addEventListener("click", () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
  
        container.remove();
        renderPaymentSummery();
      });
    });
  
    document.querySelectorAll(".js-delivery-option").forEach((element) => {
      element.addEventListener("click", () => {
        const productId = element.dataset.productId;
        const deliveryOptionId = element.dataset.deliveryOptionId;
        updateDeliveryOptions(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummery();
      });
    });
  }