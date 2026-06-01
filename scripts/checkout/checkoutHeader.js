export function checkoutHeader() {
  const renderCheckoutHeader = 'Checkout (<a class="return-to-home-link js-checkout-items" href="index.html"></a>)';

  document.querySelector('.js-checkout-header-middle-section').innerHTML = renderCheckoutHeader;
}