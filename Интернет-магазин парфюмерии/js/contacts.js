// Переключение между вкладками
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Удаляем активный класс у всех кнопок и контента
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((c) => c.classList.remove("active"));

    // Добавляем активный класс к выбранной кнопке и соответствующему контенту
    btn.classList.add("active");
    const tabId = btn.getAttribute("data-tab");
    document.getElementById(tabId).classList.add("active");
  });
});

// Проверка авторизации (в реальном проекте это должно быть на сервере)
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

if (isLoggedIn) {
  // Показываем вкладку профиля, если пользователь авторизован
  document.querySelector('[data-tab="profile"]').click();

  // Загружаем данные пользователя (в реальном проекте это должно быть с сервера)
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  document.getElementById("profile-name").textContent =
    userData.name || "Не указано";
  document.getElementById("profile-email").textContent =
    userData.email || "Не указано";
  document.getElementById("profile-phone").textContent =
    userData.phone || "Не указано";
  document.getElementById("profile-city").textContent =
    userData.city || "Не указано";
  document.getElementById("profile-address").textContent =
    userData.address || "Не указано";
} else {
  // Показываем вкладку входа, если пользователь не авторизован
  document.querySelector('[data-tab="login"]').click();
}

// Обработка формы входа
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // В реальном проекте здесь должен быть запрос к серверу
  // Для демонстрации просто проверяем, что поля заполнены
  if (email && password) {
    localStorage.setItem("isLoggedIn", "true");
    alert("Вы успешно вошли!");
    document.querySelector('[data-tab="profile"]').click();

    // Обновляем данные профиля
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    document.getElementById("profile-name").textContent =
      userData.name || "Не указано";
    document.getElementById("profile-email").textContent =
      userData.email || "Не указано";
    document.getElementById("profile-phone").textContent =
      userData.phone || "Не указано";
    document.getElementById("profile-city").textContent =
      userData.city || "Не указано";
    document.getElementById("profile-address").textContent =
      userData.address || "Не указано";
  } else {
    alert("Пожалуйста, заполните все поля");
  }
});

// Обработка формы регистрации
document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const phone = document.getElementById("reg-phone").value;
    const password = document.getElementById("reg-password").value;
    const confirm = document.getElementById("reg-confirm").value;

    if (password !== confirm) {
      alert("Пароли не совпадают");
      return;
    }

    // В реальном проекте здесь должен быть запрос к серверу
    // Для демонстрации просто сохраняем данные
    const userData = {
      name,
      email,
      phone,
      password,
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");

    alert("Регистрация успешна! Вы вошли в систему.");
    document.querySelector('[data-tab="profile"]').click();

    // Обновляем данные профиля
    document.getElementById("profile-name").textContent = name;
    document.getElementById("profile-email").textContent = email;
    document.getElementById("profile-phone").textContent = phone;
    document.getElementById("profile-city").textContent = "Не указано";
    document.getElementById("profile-address").textContent = "Не указано";
  });

// Кнопка редактирования профиля
document
  .getElementById("edit-profile-btn")
  .addEventListener("click", function () {
    alert("Функция редактирования профиля будет реализована в будущем");
  });
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
      img.src = "./images/index_icons/Antu_eclipse.svg.png"; // Нужно добавить иконку солнца
      img.alt = "Переключить на темную тему";
    }
  }

  // Остальной JavaScript код (для корзины и т.д.)
});
