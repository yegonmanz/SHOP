// Simulated user database
const users = [];

document.getElementById('registrationForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const fullName = this[0].value;
    const email = this[1].value;
    const password = this[2].value;

    users.push({ fullName, email, password });
    alert('Registration successful! You can now log in.');
    window.location.href = 'login.html';
});

document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this[0].value;
    const password = this[1].value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        window.location.href = 'items.html';
    } else {
        alert('Invalid email or password!');
    }
});

// Function to load items on items.html
async function loadItems() {
    const items = [
        {
            name: 'Item 1',
            price: 10,
            description: 'Description for Item 1',
            stock: 5,
            images: [
                'https://via.placeholder.com/100?text=Item+1+Image+1',
                'https://via.placeholder.com/100?text=Item+1+Image+2',
                'https://via.placeholder.com/100?text=Item+1+Image+3',
                'https://via.placeholder.com/100?text=Item+1+Image+4',
            ]
        },
        {
            name: 'Item 2',
            price: 20,
            description: 'Description for Item 2',
            stock: 0,
            images: [
                'https://via.placeholder.com/100?text=Item+2+Image+1',
                'https://via.placeholder.com/100?text=Item+2+Image+2',
                'https://via.placeholder.com/100?text=Item+2+Image+3',
                'https://via.placeholder.com/100?text=Item+2+Image+4',
            ]
        },
        // Add more items as needed
    ];

    const itemDisplay = document.getElementById('itemDisplay');
    itemDisplay.innerHTML = '';

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        // Image slider HTML
        const sliderHtml = `
            <div class="image-slider">
                ${item.images.map((img, index) => `
                    <img src="${img}" class="slider-image" style="display: ${index === 0 ? 'block' : 'none'};">
                `).join('')}
            </div>
        `;

        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            ${sliderHtml}
            <p>${item.description}</p>
            <p>Price: $<span class="item-price">${item.price}</span></p>
            <p>Stock: <span class="item-stock">${item.stock}</span></p>
            <input type="number" placeholder="Quantity" min="1" max="${item.stock}" class="item-quantity">
            <button class="add-to-cart">Add to Cart</button>
        `;

        let currentSlide = 0;
        const slides = itemDiv.querySelectorAll('.slider-image');
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = (i === index) ? 'block' : 'none';
            });
        }

        function changeSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        setInterval(changeSlide, 5000);

        itemDiv.querySelector('.add-to-cart').addEventListener('click', function() {
            const quantity = parseInt(itemDiv.querySelector('.item-quantity').value);
            if (quantity > 0 && quantity <= item.stock) {
                item.stock -= quantity;
                itemDiv.querySelector('.item-stock').innerText = item.stock;
                alert('Item added to cart!');
                if (item.stock === 0) {
                    itemDiv.innerHTML += `<p style="color: red;">Sold Out</p>`;
                }
            } else {
                alert('Invalid quantity!');
            }
        });

        itemDisplay.appendChild(itemDiv);
    });
}

// Call loadItems when items.html is loaded
if (document.getElementById('itemDisplay')) {
    loadItems();
}
