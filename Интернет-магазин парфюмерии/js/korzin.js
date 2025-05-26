document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  displayCartItems();

  document
    .getElementById("checkout-btn")
    .addEventListener("click", function () {
      alert("Заказ оформлен! Спасибо за покупку!");
      localStorage.setItem("cart", JSON.stringify([]));
      displayCartItems();
      updateCartCount();
    });
});

function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Ваша корзина пуста</p>";
    totalPriceElement.textContent = "0₽";
    return;
  }

  let totalPrice = 0;

  cart.forEach((item, index) => {
    const price = parseInt(item.price.replace(/\D/g, ""));
    totalPrice += price;

    // Определяем статус заказа
    let statusText, statusClass;
    switch (item.status) {
      case "ready":
        statusText = "Готов к отправке";
        statusClass = "status-ready";
        break;
      case "shipping":
        statusText = "В пути";
        statusClass = "status-shipping";
        break;
      default:
        statusText = "В обработке";
        statusClass = "status-processing";
    }

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
              <div class="cart-item-image">
                  <img src="${item.image}" alt="${item.name}">
              </div>
              <div class="cart-item-details">
                  <h3>${item.name}</h3>
                  <p>${item.volume}</p>
                  <p class="price">${item.price}</p>
                  <div class="order-status ${statusClass}">${statusText}</div>
              </div>
              <button class="remove-btn" data-index="${index}">×</button>
          `;

    cartContainer.appendChild(cartItem);
  });

  totalPriceElement.textContent = `${totalPrice}₽`;

  // Добавляем обработчики для кнопок удаления
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      removeFromCart(index);
    });
  });
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}
document.addEventListener("DOMContentLoaded", function () {
  // Инициализация корзины с товарами по умолчанию
  if (!localStorage.getItem("cart")) {
    const defaultCart = [
      {
        name: "Chanel Chance Eau Tendre",
        price: "22 250₽",
        image: "./images/шанель.jpg",
        volume: "150мл",
        status: "processing",
      },
      {
        name: "GUCCI EAU DE PARFUM II",
        price: "2 300₽",
        image: "./images/гучи.webp",
        volume: "100мл",
        status: "ready",
      },
      {
        name: "Givenchy Fragrance Resistant",
        price: "8 354₽",
        image: "./images/живанши.jpg",
        volume: "50мл",
        status: "shipping",
      },
    ];
    localStorage.setItem("cart", JSON.stringify(defaultCart));
  }

  updateCartCount();
  displayCartItems();

  // Обработчик оформления заказа
  document
    .getElementById("checkout-btn")
    .addEventListener("click", function () {
      alert("Заказ оформлен! Спасибо за покупку!");
      localStorage.setItem("cart", JSON.stringify([]));
      displayCartItems();
      updateCartCount();
    });

  // Обработчики для кнопок "В корзину" в каталоге
  document.querySelectorAll(".feature-card .btn").forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".feature-card");
      const product = {
        name: card.querySelector("h3").textContent,
        price: card.querySelector("h2").textContent,
        image: card.querySelector("img").src,
        volume: card.querySelector("p").textContent,
        status: "processing",
      };

      addToCart(product);
    });
  });
});

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} добавлен в корзину!`);
  displayCartItems(); // Обновляем отображение корзины
}

function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Ваша корзина пуста</p>";
    totalPriceElement.textContent = "0₽";
    return;
  }

  let totalPrice = 0;

  cart.forEach((item, index) => {
    const price = parseInt(item.price.replace(/\D/g, ""));
    totalPrice += price;

    let statusText, statusClass;
    switch (item.status) {
      case "ready":
        statusText = "Готов к отправке";
        statusClass = "status-ready";
        break;
      case "shipping":
        statusText = "В пути";
        statusClass = "status-shipping";
        break;
      default:
        statusText = "В обработке";
        statusClass = "status-processing";
    }

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
              <div class="cart-item-image">
                  <img src="${item.image}" alt="${item.name}">
              </div>
              <div class="cart-item-details">
                  <h3>${item.name}</h3>
                  <p>${item.volume}</p>
                  <p class="price">${item.price}</p>
                  <div class="order-status ${statusClass}">${statusText}</div>
              </div>
              <button class="remove-btn" data-index="${index}">×</button>
          `;

    cartContainer.appendChild(cartItem);
  });

  totalPriceElement.textContent = `${totalPrice.toLocaleString()}₽`;

  // Добавляем обработчики для кнопок удаления
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      removeFromCart(index);
    });
  });
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const removedItem = cart.splice(index, 1)[0];
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${removedItem.name} удален из корзины`);
  displayCartItems();
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}
