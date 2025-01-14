import { setLocalStorage, getLocalStorage, getLocalStorage, getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

console.log(dataSource.findProductById(productId));

const productId = getParams('product');

function addProductToCart(product) {
  // Check if there's an existing cart
  const cart = getLocalStorage("cart") || []; // Get existing cart or initialize as an empty array

  // If the cart is empty, push the product to the cart array and save it for local storage...
  if (cart.length == 0) {
    cart.push(product);
    setLocalStorage("cart", cart);
  }
  // If the cart is NOT empty, keep pushing the product to the cart array and display it to the console...
  else {
    cart.push(product);
    console.log(cart);
  }

  // Update the contents of the cart
  setLocalStorage("cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
