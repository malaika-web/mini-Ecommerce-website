// index page javascript 
const products = [
    { id: 1, name: "Airbuds Pro", price: 3200, image: "assets/product1.jpg" },
    { id: 2, name: "HDMI Cable", price: 850, image: "assets/product2.jpg" },
    { id: 3, name: "Smartwatch", price: 2999, image: "assets/product3.jpg" },
    { id: 4, name: "Wireless Mouse", price: 1450, image: "assets/product4.jpg" }
  ];

  const productList = document.getElementById("product-list");

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    let total = 0;
    for (const id in cart) {
      total += cart[id].quantity;
    }
    document.getElementById("cart-count").innerText = total;
  }

  function addToCart(id) {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[id]) {
      cart[id].quantity += 1;
    } else {
      const product = products.find(p => p.id === id);
      cart[id] = { ...product, quantity: 1 };
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showCartPopup(); // ✅ show popup
  }

  function showCartPopup() {
    const popup = document.getElementById("cart-popup");
    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 3000);
  }

  function goToCart() {
    window.location.href = "cart.html";
  }

  function renderProducts() {
    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>Rs ${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      `;
      productList.appendChild(card);
    });
  }

  renderProducts();
  updateCartCount();

  // cart page js 
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