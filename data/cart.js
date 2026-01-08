export const cart = [];

export function addToCart(productId) {
  let matchingItem;

  /* This loop is Checking if there is a product with thesame name already available */
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  /* This is now increasing the quantity if the product already exists */
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1
    });
  }
}