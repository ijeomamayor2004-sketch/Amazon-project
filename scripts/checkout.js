import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { checkoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";
// import '../data/car.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
  
}).then(() => {
  checkoutHeader();
  renderPaymentSummary();
  renderOrderSummary();
});

// loadProducts(() => {
//   checkoutHeader();
//   renderPaymentSummary();
//   renderOrderSummary();
// });