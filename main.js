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

// Прокрутка до потрібної категорії
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

// Відкрити/закрити чат
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

// Відповіді консультанта
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

document.addEventListener('click', function(e) {
  if (e.target.closest('.add-to-cart')) {
    const button = e.target.closest('.add-to-cart');
    const productCard = button.closest('.product-card');
    const title = productCard.querySelector('.product-title').innerText;
    const priceText = productCard.querySelector('.product-price').innerText;
    const price = parseInt(priceText); // Можливо, треба видаляти "грн"
    const image = productCard.querySelector('img').getAttribute('src');

    addToCart(title, price, image);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  fetch('store_db.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Не вдалося завантажити файл');
    }
    return response.json(); // Це автоматично парсить JSON
  })
  .then(categories => {
        console.log(categories); // Тут ви отримуєте об'єкт з JSON

    categories.forEach((category) => {
      category.products.forEach(product => {
                  let productHTML = `<div class="product-card ${category.id}">
          <h3 class="product-title">${product.title}</h3>
          <div class="product-image-wrapper">
            <img src="${product.image}" alt="Товар" class="product-image1">
            <div class="overlay-buttons">
              <button class="add-to-cart">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <p class="product-description">${product.description}</p>
          <p class="product-price">${product.price}</p>
        </div>`
    
            document.getElementById(`${category.id}`).insertAdjacentHTML("beforeend", productHTML);
                 });
    })
  })
})

  console.log('Скрипт завантажено');

function toggleTheme() {
    const body = document.body;

    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        console.log('Перемкнуто на світлу тему');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        console.log('Перемкнуто на темну тему');
    }
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

function init() {
    loadSavedTheme();

    const button = document.getElementById('toggle-theme');
    if (button) {
        button.addEventListener('click', toggleTheme);
    } else {
        console.warn('Кнопка не знайдена!');
    }
}

document.addEventListener('DOMContentLoaded', init);

