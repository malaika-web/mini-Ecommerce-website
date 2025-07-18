
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const cartItems = document.getElementById("cart-items");
  const totalQtyEl = document.getElementById("total-qty");
  const totalPriceEl = document.getElementById("total-price");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let totalQty = 0;
  let totalPrice = 0;

  Object.values(cart).forEach(item => {
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>Rs ${item.price}</p>
      </div>
      <div class="cart-item-controls">
        <button onclick="updateQuantity(${item.id}, -1)">−</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${item.id}, 1)">+</button>
      </div>
    `;
    cartItems.appendChild(itemEl);

    totalQty += item.quantity;
    totalPrice += item.quantity * item.price;
  });

  totalQtyEl.innerText = totalQty;
  totalPriceEl.innerText = totalPrice;
  cartCount.innerText = totalQty;
}

function updateQuantity(id, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  if (!cart[id]) return;

  cart[id].quantity += change;

  if (cart[id].quantity <= 0) {
    delete cart[id];
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

window.onload = loadCart;