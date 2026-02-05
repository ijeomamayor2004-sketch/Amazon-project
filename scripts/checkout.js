import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { checkoutHeader } from "./checkout/checkoutHeader.js";
// import '../data/car.js';
// import '../data/cart-class.js';

checkoutHeader();
renderPaymentSummary();
renderOrderSummary();