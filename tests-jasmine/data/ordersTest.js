import { addOrder, orders, loadStorageOrder } from '../../data/orders.js';

describe('test suite: addOrder', () => {
  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        id: 'order-1',
        totalCents: 5000
      }]);
    });
    spyOn(localStorage, 'setItem');
    loadStorageOrder();
  });

  it('adds a new order to the beginning of the orders array', () => {
    const newOrder = {
      id: 'order-2',
      totalCents: 3000
    };

    addOrder(newOrder);

    expect(orders[0]).toEqual(newOrder);
    expect(orders[1].id).toEqual('order-1');
  });

  it('saves the updated orders array to localStorage', () => {
    const newOrder = {
      id: 'order-2',
      totalCents: 3000
    };

    addOrder(newOrder);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('orders', JSON.stringify(orders));
  });
});
