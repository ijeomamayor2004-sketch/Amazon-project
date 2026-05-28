import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { checkoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
// import '../data/car.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

async function loadPage() {
  try {
    // throw 'error1';

    await loadProductsFetch();
  } catch (error) {
    console.log(`Unexpected error => ${error}`);
  }

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