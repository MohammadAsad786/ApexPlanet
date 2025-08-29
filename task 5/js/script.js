// Shared Nav Functionality
document.querySelector('.hamburger')?.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Cart Logic (Shared across pages)
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function updateCartCount() {
    document.querySelectorAll('#cartCount').forEach(el => el.textContent = cart.length);
}
updateCartCount();

// Products Page Specific
if (document.getElementById('productList')) {
    const products = [
        { id: 1, name: 'Fiction Book 1', category: 'Fiction', price: 15, rating: 4.5, image: 'images/book1.jpg' },
        { id: 2, name: 'Non-Fiction Book 1', category: 'Non-Fiction', price: 20, rating: 4.8, image: 'images/book2.jpg' },
        { id: 3, name: 'Fiction Book 2', category: 'Fiction', price: 12, rating: 4.2, image: 'images/book3.jpg' },
        { id: 4, name: 'Non-Fiction Book 2', category: 'Non-Fiction', price: 18, rating: 4.6, image: 'images/book4.jpg' }
    ];

    function renderProducts(filtered) {
        const productList = document.getElementById('productList');
        productList.innerHTML = '';
        filtered.forEach(product => {
            const div = document.createElement('div');
            div.classList.add('product');
            div.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p>Price: $${product.price}</p>
                <p>Rating: ${product.rating}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productList.appendChild(div);
        });
    }

    function applyFilters() {
        let filtered = [...products];
        const category = document.getElementById('categoryFilter').value;
        if (category) filtered = filtered.filter(p => p.category === category);
        const maxP = parseFloat(document.getElementById('maxPrice').value);
        if (!isNaN(maxP)) filtered = filtered.filter(p => p.price <= maxP);
        const sort = document.getElementById('sortBy').value;
        if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
        else if (sort === 'price') filtered.sort((a, b) => a.price - b.price);
        renderProducts(filtered);
    }

    document.getElementById('applyFilters').addEventListener('click', applyFilters);
    renderProducts(products);
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('Added to cart!');
    }
}

// Cart Page Specific
if (document.getElementById('cartList')) {
    function renderCart() {
        const cartList = document.getElementById('cartList');
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - $${item.price}
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartList.appendChild(li);
            total += item.price;
        });
        document.getElementById('cartTotal').textContent = total.toFixed(2);
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }

    document.getElementById('clearCart').addEventListener('click', () => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    });

    renderCart();
}

// Contact Form
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! (Demo)');
});