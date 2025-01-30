// utils.mjs - Contains utility functions used by other modules.

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}


export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {

  const htmlStrings = list.map(templateFn);

  if (!parentElement) {
    // console.error("Parent element not found");
    return
  }

  // Clear out contents of html if clear is true.
  if (clear) {
    parentElement.innerHTML = "";
  } else {
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
  }
}

async function loadTemplate(path) {

  const res = await fetch(path)
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {

  const headerPath = "/partials/header.html";
  const footerPath = "/partials/footer.html";

  const headerTemplate = await loadTemplate(headerPath);
  const headerEl = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate(footerPath);
  const footerEl = document.querySelector("#main-footer");

  // let clear = false;


  renderWithTemplate(headerTemplate, headerEl);
  renderWithTemplate(footerTemplate, footerEl);
}

export function renderWithTemplate(template, parentElement, clear, data, callback) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML("afterbegin", template);
  // applyCartStyles();
  // if there is a callback, call it with the data
  if (callback) {
    callback(data)
  }
}

//  Helper function to fix styling for backpack icon

// export function applyCartStyles() {
//   const cart = document.querySelector('.cart');
//   if (cart) {
//     cart.style.position = 'absolute';
//     cart.style.top = '20px'; // Distance from top
//     cart.style.right = '20px'; // Distance from right
//     cart.style.zIndex = '1000'; // Ensure it's above other content
//   }
// }

