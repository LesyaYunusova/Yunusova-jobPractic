//Функция для работы с корзиной
document.addEventListener("DOMContentLoaded", function () {
  // Инициализация корзины в localStorage, если ее нет
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  // Обновляем счетчик корзины
  updateCartCount();

  // Обработчики для кнопок "В корзину"
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".feature-card");
      const product = {
        name: card.querySelector("h3").textContent,
        price: card.querySelector("h2").textContent,
        image: card.querySelector("img").src,
        volume: card.querySelector("p").textContent,
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
  alert("Товар добавлен в корзину!");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  document.getElementById("cart-count").textContent = cart.length;
}
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

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}" width="100">
                    </div>
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>${item.volume}</p>
                        <p class="price">${item.price}</p>
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
// Функция для работы с корзиной
document.addEventListener("DOMContentLoaded", function () {
  // Инициализация корзины в localStorage, если ее нет
  if (!localStorage.getItem("cart")) {
    // Добавим несколько товаров по умолчанию
    const defaultCart = [
      {
        name: "Chanel Chance Eau Tendre",
        price: "22 250₽",
        image: "./images/шанель.jpg",
        volume: "150мл",
        status: "processing", // "processing", "ready", "shipping"
      },
      {
        name: "GUCCI EAU DE PARFUM II",
        price: "2 300₽",
        image: "./images/гучи.webp",
        volume: "100мл",
        status: "ready",
      },
    ];
    localStorage.setItem("cart", JSON.stringify(defaultCart));
  }

  // Обновляем счетчик корзины
  updateCartCount();

  // Обработчики для кнопок "В корзину"
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".feature-card");
      const product = {
        name: card.querySelector("h3").textContent,
        price: card.querySelector("h2").textContent,
        image: card.querySelector("img").src,
        volume: card.querySelector("p").textContent,
        status: "processing", // Новые товары добавляются со статусом "В обработке"
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
  alert("Товар добавлен в корзину!");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}
document.addEventListener("DOMContentLoaded", function () {
  const themeToggleBtn = document.querySelector(".lightdark");
  const body = document.body;

  // Проверяем сохраненную тему в localStorage
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
    updateThemeIcon("light");
  } else {
    updateThemeIcon("dark");
  }

  // Обработчик клика по кнопке смены темы
  themeToggleBtn.addEventListener("click", function () {
    body.classList.toggle("dark-theme");

    // Сохраняем выбор темы
    const isDark = body.classList.contains("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Обновляем иконку
    updateThemeIcon(isDark ? "light" : "dark");
  });

  // Функция для обновления иконки темы
  function updateThemeIcon(theme) {
    const img = themeToggleBtn.querySelector("img");
    if (theme === "light") {
      img.src = "./images/index_icons/Antu_eclipse.svg.png";
      img.alt = "Переключить на светлую тему";
    } else {
      img.src = "./images/index_icons/Antu_eclipse.svg.png";
      img.alt = "Переключить на темную тему";
    }
  }

  // Остальной JavaScript код (для корзины и т.д.)
});
