import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { checkoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";

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