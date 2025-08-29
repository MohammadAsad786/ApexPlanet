const products = [
    { name: 'Laptop', category: 'Electronics', price: 1000, rating: 4.5 },
    { name: 'Smartphone', category: 'Electronics', price: 500, rating: 4.2 },
    { name: 'Book: JS Guide', category: 'Books', price: 20, rating: 4.8 },
    { name: 'Book: CSS Mastery', category: 'Books', price: 15, rating: 4.0 },
    { name: 'Headphones', category: 'Electronics', price: 100, rating: 4.3 }
];

const categoryFilter = document.getElementById('categoryFilter');
const maxPrice = document.getElementById('maxPrice');
const sortBy = document.getElementById('sortBy');
const applyFiltersBtn = document.getElementById('applyFilters');
const productList = document.getElementById('productList');

function renderProducts(filteredProducts) {
    productList.innerHTML = '';
    filteredProducts.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: $${product.price}</p>
            <p>Rating: ${product.rating}</p>
        `;
        productList.appendChild(div);
    });
}

function applyFilters() {
    let filtered = [...products];
    
    // Filter by category
    const selectedCategory = categoryFilter.value;
    if (selectedCategory) {
        filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Filter by max price
    const maxP = parseFloat(maxPrice.value);
    if (!isNaN(maxP)) {
        filtered = filtered.filter(p => p.price <= maxP);
    }
    
    // Sort
    const sortValue = sortBy.value;
    if (sortValue === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortValue === 'price') {
        filtered.sort((a, b) => a.price - b.price);
    }
    
    renderProducts(filtered);
}

applyFiltersBtn.addEventListener('click', applyFilters);
renderProducts(products); // Initial render