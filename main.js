// Пошук товарів
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

// Прокрутка до категорії
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

      const userMessageElement = document.createElement("p");
      userMessageElement.innerHTML = `<strong>Ви:</strong> ${userMessage}`;
      chatMessages.appendChild(userMessageElement);

      const consultantResponse = getConsultantResponse(userMessage);
      const consultantMessageElement = document.createElement("p");
      consultantMessageElement.innerHTML = `<strong>Консультант:</strong> ${consultantResponse}`;
      chatMessages.appendChild(consultantMessageElement);

      this.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
});

// Функція відповіді консультанта
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

// Додавання товару у кошик
function addToCart(title, price, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  let existingProduct = cart.find(item => item.title === title);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      title: title,
      price: price,
      image: image,
      quantity: 1
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Оновлення кількості товарів у кошику
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cart-count').innerText = cartCount;
}

// Завантаження кількості товарів при відкритті сторінки
window.onload = updateCartCount;

// Обробка кліку "Додати в кошик"
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', function() {
    const productCard = button.closest('.product-card');
    const title = productCard.querySelector('.product-title').innerText;
    const priceText = productCard.querySelector('.product-price').innerText;
    const price = parseInt(priceText);
    const image = productCard.querySelector('img').getAttribute('src');

    addToCart(title, price, image);
  });
});

// Відкриття та закриття модального кошика
const openCartBtn = document.querySelector('.open-cart-btn');
const closeCartBtn = document.querySelector('.close-cart-btn');
const cartModal = document.querySelector('.cart-modal');
const cartItemsList = document.querySelector('.cart-items-list');
const cartTotal = document.querySelector('.cart-total');

openCartBtn.addEventListener('click', () => {
  cartModal.style.display = 'flex';

  // Очищаємо список
  cartItemsList.innerHTML = '';
  let total = 0;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.forEach(item => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');
    cartItemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
      <span>${item.title} (x${item.quantity})</span>
      <span>${item.price * item.quantity} грн</span>
    `;
    cartItemsList.appendChild(cartItemDiv);

    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Загальна сума: ${total} грн`;
});

closeCartBtn.addEventListener('click', () => {
  cartModal.style.display = 'none';
});
