import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";


export function renderOrderSummary() {

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProducts = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProducts.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProducts.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProducts.name}
          </div>
          <div class="product-price">
            $${matchingProducts.getPrice()}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProducts.id}" >${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProducts.id}">
              Update
            </span>

            <input class="quantity-input js-quantity-input-${matchingProducts.id} js-quantity-input"  data-product-id="${matchingProducts.id}">

            <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProducts.id}">Save</span>

            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProducts.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>

          ${deliveryOptionsHTML(matchingProducts, cartItem)}
        </div>
      </div>
    </div>
    `;
  })

  function deliveryOptionsHTML(matchingProducts, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : '';

      html += `
        <div class="delivery-option js-delivery-option" data-product-id="${matchingProducts.id}" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked}
            class="delivery-option-input"
            name="delivery-option-${matchingProducts.id}">

          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });

    return html;
  }

  /* This code makes the Cheakout header interactive */
  function checkoutCartQuantity() {
    const cartQuantity = calculateCartQuantity();

    document.querySelector('.js-checkout-items').innerHTML = `${cartQuantity} items`;
  }

  function updateCartQuantity(productId) {
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');

    const quantityInput = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
    
    function saveQuantity() {
      if (quantityInput >= 1 && quantityInput < 1000) {
        updateQuantity(productId, quantityInput);
        checkoutCartQuantity();
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = quantityInput;
        renderPaymentSummary();
      };
    };
    saveQuantity();
  }

  checkoutCartQuantity();

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId; 
      removeFromCart(productId);
      checkoutCartQuantity();
      renderPaymentSummary();

      renderOrderSummary();
    })
  })

  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
    })
  });

  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      updateCartQuantity(productId);
    })
  });

  document.querySelectorAll('.js-quantity-input').forEach((input) => {
    input.addEventListener('keydown', (event) => {
      const productId = input.dataset.productId;
      if (event.key === 'Enter') {
        updateCartQuantity(productId);
      }
    })
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
