let input = document.querySelector(".form-control");
let form = document.getElementById("searchForm");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  let inputValue = input.value.trim().toLowerCase();

  let cards = document.querySelectorAll(".product-card");

  cards.forEach(card => {
    let title = card.querySelector('.product-title').textContent.toLowerCase();
    if (inputValue === "" || title.includes(inputValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const categories = document.querySelectorAll(".category");

  categories.forEach((category) => {
    category.addEventListener("click", function () {
      const targetId = category.getAttribute("data-category");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offset = 200;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
// Відкриття і закриття чату
document.getElementById("chat-button").addEventListener("click", () => {
  document.getElementById("chat-box").style.display = "flex";
});

document.getElementById("chat-close").addEventListener("click", () => {
  document.getElementById("chat-box").style.display = "none";
});

// Логіка чату
document.getElementById("chat-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const userMessage = this.value.trim();
    if (userMessage) {
      const chatMessages = document.getElementById("chat-messages");

      // Додаємо повідомлення користувача
      const userMessageElement = document.createElement("p");
      userMessageElement.innerHTML = `<strong>Ви:</strong> ${userMessage}`;
      chatMessages.appendChild(userMessageElement);

      // Генерація відповіді консультанта
      const consultantResponse = getConsultantResponse(userMessage);
      const consultantMessageElement = document.createElement("p");
      consultantMessageElement.innerHTML = `<strong>Консультант:</strong> ${consultantResponse}`;
      chatMessages.appendChild(consultantMessageElement);

      // Очищаємо поле введення
      this.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
});


// Функція для отримання відповіді консультанта
function getConsultantResponse(message) {
  const lowerCaseMessage = message.toLowerCase();

  if (lowerCaseMessage.includes("ціна")) {
    return "Ціна на кожен товар вказана в описі продукту.";
  } else if (lowerCaseMessage.includes("доставка")) {
    return "Доставка здійснюється по всій Україні. Більш детальну інформацію можна знайти на сторінці доставки.";
  } else if (lowerCaseMessage.includes("підтримка")) {
    return "Наші консультанти доступні 24/7. Як ще можемо вам допомогти?";
  } else {
    return "Вибачте, я не зрозумів ваше питання. Спробуйте уточнити!";
  }
}










  // Лайки і кошик
  let favorites = new Set();
  let cartItems = [];

  document.querySelectorAll(".add-to-favorites").forEach(button => {
    button.addEventListener("click", function () {
      const card = this.closest(".product-card");
      const title = card.querySelector(".product-title").textContent;
      if (favorites.has(title)) {
        favorites.delete(title);
        button.textContent = "❤️";
      } else {
        favorites.add(title);
        button.textContent = "💖";
      }
    });
  });

  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
      const card = this.closest(".product-card");
      const title = card.querySelector(".product-title").textContent;
      const priceText = card.querySelector(".product-price").textContent.replace("₴", "");
      const price = parseFloat(priceText);
      cartItems.push({ title, price });
      updateCartModal();
      openCartModal();
    });
  });

  function updateCartModal() {
    const cartList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartList.innerHTML = "";
    let total = 0;
    cartItems.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.title} - ₴${item.price}`;
      cartList.appendChild(li);
      total += item.price;
    });
    cartTotal.textContent = `Загальна сума: ₴${total}`;
  }

  function openCartModal() {
    const modal = document.getElementById("cart-modal");
    modal.style.display = "block";
  }

  document.getElementById("close-cart-modal").addEventListener("click", function () {
    document.getElementById("cart-modal").style.display = "none";
  });

  // Поява кнопок на картці при наведенні
  document.querySelectorAll(".product-card").forEach(card => {
    const overlay = card.querySelector(".overlay-buttons");
    card.addEventListener("mouseenter", () => {
      overlay.style.opacity = "1";
    });
    card.addEventListener("mouseleave", () => {
      overlay.style.opacity = "0";
    });
  });
});














const openCartBtn = document.querySelector('.open-cart-btn');
const closeCartBtn = document.querySelector('.close-cart-btn');
const cartModal = document.querySelector('.cart-modal');
const cartItemsList = document.querySelector('.cart-items-list');
const cartTotal = document.querySelector('.cart-total');

// Приклад товарів у кошику (може бути отримано з локального сховища або серверу)
const cartItems = [
    { name: 'Товар 1', price: 100, quantity: 2 },
    { name: 'Товар 2', price: 200, quantity: 1 },
    { name: 'Товар 3', price: 150, quantity: 3 }
];

// Функція для відкриття модального вікна
openCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'flex';

    // Додаємо товари до списку в модальному вікні
    cartItemsList.innerHTML = ''; // Очищаємо список
    let total = 0;

    cartItems.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>${item.price * item.quantity} грн</span>
        `;
        cartItemsList.appendChild(cartItemDiv);

        total += item.price * item.quantity;
    });

    // Оновлюємо загальну суму
    cartTotal.textContent = `Загальна сума: ${total} грн`;
});

// Функція для закриття модального вікна
closeCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});









let cart = []; // Масив для кошика
let favorites = []; // Масив для обраних товарів

// Додавання товару в кошик
function addToCart(productName, productPrice) {
  cart.push({ name: productName, price: productPrice });
  updateCart();
}

// Додавання товару в обрані
function addToFavorites(productName) {
  if (!favorites.includes(productName)) {
    favorites.push(productName);
    updateFavorites();
  }
}

// Оновлення кошика
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = ""; // Очищаємо вміст кошика
  let totalPrice = 0;

  cart.forEach(item => {
    cartItems.innerHTML += `<p>${item.name} - $${item.price}</p>`;
    totalPrice += item.price;
  });

  document.getElementById("totalPrice").textContent = `$${totalPrice.toFixed(2)}`;
}

// Оновлення обраних товарів
function updateFavorites() {
  const favoritesItems = document.getElementById("favoritesItems");
  favoritesItems.innerHTML = "";

  favorites.forEach(item => {
    favoritesItems.innerHTML += `<p>${item}</p>`;
  });
}

// Відкриття модального вікна для кошика
function openCart() {
  document.getElementById("cartModal").style.display = "block";
}

// Відкриття модального вікна для обраних товарів
function openFavorites() {
  document.getElementById("favoritesModal").style.display = "block";
}

// Закриття модальних вікон
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}
