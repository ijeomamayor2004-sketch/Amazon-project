import {renderPaymentSummary, navigation} from '../../../scripts/checkout/paymentSummary.js';
import {loadFromStorage, cart} from '../../../data/cart.js';
import {loadProducts, loadProductsFetch} from '../../../data/products.js';
import {addOrder} from '../../../data/orders.js';

describe('test suite: renderPaymentSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
  });

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-checkout-items"></div>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();

    renderPaymentSummary();
  });

  it('displays the order summary title', () => {
    expect(
      document.querySelector('.payment-summary-title').innerText
    ).toEqual('Order Summary');

    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('displays the items count', () => {
    expect(
      document.querySelector('.js-checkout-items-payment').innerText
    ).toContain('Items (3)');

    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('displays the product price', () => {
    const paymentRows = document.querySelectorAll('.payment-summary-row');
    expect(
      paymentRows[0].innerText
    ).toContain('Items (3)');

    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('displays the shipping cost', () => {
    const paymentRows = document.querySelectorAll('.payment-summary-row');
    expect(
      paymentRows[1].innerText
    ).toContain('Shipping & handling:');

    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('displays the subtotal before tax', () => {
    const paymentRows = document.querySelectorAll('.payment-summary-row');
    expect(
      paymentRows[2].innerText
    ).toContain('Total before tax:');

    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('displays the estimated tax', () => {
    const paymentRows = document.querySelectorAll('.payment-summary-row');
    expect(
      paymentRows[3].innerText
    ).toContain('Estimated tax (10%):');

    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('displays the order total', () => {
    const paymentRows = document.querySelectorAll('.payment-summary-row');
    expect(
      paymentRows[4].innerText
    ).toContain('Order total:');

    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('displays the place order button', () => {
    expect(
      document.querySelector('.js-place-order').innerText
    ).toEqual('Place your order');

    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('calculates the product price correctly', () => {
    // Product 1: $10.90 * 2 = $21.80
    // Product 2: $20.95 * 1 = $20.95
    // Total: $42.75
    const paymentRows = document.querySelectorAll('.payment-summary-row');
    expect(
      paymentRows[0].innerText
    ).toContain('42.75');

    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('calculates the shipping cost correctly', () => {
    // Delivery option 1: $0.00, Delivery option 2: $4.99
    // Total: $4.99
    const paymentRows = document.querySelectorAll('.payment-summary-row');
    expect(
      paymentRows[1].innerText
    ).toContain('4.99');

    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('calculates the subtotal before tax correctly', () => {
    // $42.75 + $4.99 = $47.74
    const paymentRows = document.querySelectorAll('.payment-summary-row');
    expect(
      paymentRows[2].innerText
    ).toContain('47.74');

    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('calculates the tax correctly', () => {
    // 10% of $47.74 = $4.77
    const paymentRows = document.querySelectorAll('.payment-summary-row');
    expect(
      paymentRows[3].innerText
    ).toContain('4.77');

    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('calculates the order total correctly', () => {
    // $47.74 + $4.77 = $52.51
    const paymentRows = document.querySelectorAll('.payment-summary-row');
    expect(
      paymentRows[4].innerText
    ).toContain('52.51');

    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('sends data to backend when place order is clicked', (done) => {
    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          id: '1',
          products: cart, 
          totalCents: 5251
        })
      })
    );

    spyOn(navigation, 'goToOrders');

    document.querySelector('.js-place-order').click();

    setTimeout(() => {
      expect(window.fetch).toHaveBeenCalledWith(
        'https://supersimplebackend.dev/orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        }
      );

      expect(localStorage.setItem).toHaveBeenCalled();

      document.querySelector('.js-test-container').innerHTML = '';
      done();
    }, 100);
  });

  it('navigates to orders page after successful order', (done) => {
    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          id: '1',
          products: cart,
          totalCents: 5251
        })
      })
    );

    spyOn(navigation, 'goToOrders');

    document.querySelector('.js-place-order').click();

    setTimeout(() => {
      expect(navigation.goToOrders).toHaveBeenCalled();

      document.querySelector('.js-test-container').innerHTML = '';
      done();
    }, 100);
  });

  it('handles API errors gracefully', (done) => {
    spyOn(window, 'fetch').and.returnValue(
      Promise.reject(new Error('Network error'))
    );

    spyOn(console, 'log');
    spyOn(navigation, 'goToOrders');

    document.querySelector('.js-place-order').click();

    setTimeout(() => {
      expect(console.log).toHaveBeenCalledWith(
        'Unexpected error, try again later.'
      );

      document.querySelector('.js-test-container').innerHTML = '';
      done();
    }, 100);
  });
});
