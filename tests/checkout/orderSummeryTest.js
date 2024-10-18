import { renderOrderSummary } from "../../scripts/checkout/orderSummery.js";
import { cart, loadFromStorage } from "../../data/cart.js";

describe("test suite: renderOrderSummary", () => {
  const product1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const product2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  // How the page actully looks
  it("Display the cart", () => {
    document.querySelector(".js-test-container").innerHTML = `
        <div class="js-order-summary"></div>
        
        <div class="js-payment-summary"></div>
        `;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: product1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: product2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();

    renderOrderSummary();

    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(`.js-product-quantity-${product2}`).innerText
    ).toContain("Quantity: 1");
    expect(
      document.querySelector(`.js-product-quantity-${product1}`).innerText
    ).toContain("Quantity: 2");
  });

  it("removes a product", () => {
    document.querySelector(".js-test-container").innerHTML = `
    <div class="js-order-summary"></div>`;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: product1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: product2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();

    renderOrderSummary();

    document.querySelector(`.js-delete-link-${product2}`).click();
    
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(3);
  });
});
