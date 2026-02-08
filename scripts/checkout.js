import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { checkoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
// import '../data/car.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

async function loadPage() {
  await loadProductsFetch();

  checkoutHeader();
  renderPaymentSummary();
  renderOrderSummary();
}

loadPage();

// loadProductsFetch().then(() => {
//   checkoutHeader();
//   renderPaymentSummary();
//   renderOrderSummary();
// });

// loadProducts(() => {
//   checkoutHeader();
//   renderPaymentSummary();
//   renderOrderSummary();
// });