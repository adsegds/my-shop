let cart = JSON.parse(localStorage.getItem('cart') || '[]');

window.onload = () => {
    render();
};

function renderSection(gridId, cat) {
    const grid = document.getElementById(gridId);
    grid.innerHTML = '';
    PRODUCTS.filter(p => p.category === cat).forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img class="product-img" src="${p.image}" alt="${p.name}">
            <button class="add-btn" onclick="addToCart(${p.id})">+</button>
            <div class="product-price">¥${p.price}</div>
            <div class="product-name">${p.name}</div>
            <div class="sponsor">©${p.brand}</div>
        `;
        grid.appendChild(card);
    });
}

function render() {
    renderSection('drinks-grid', 1);
    renderSection('snacks-grid', 2);
    updateCartUI();
}

function addToCart(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (p.stock > 0) {
        p.stock--;
        let item = cart.find(i => i.id === id);
        if (!item) {
            item = { id, qty: 0 };
            cart.push(item);
        }
        item.qty++;
        localStorage.setItem('cart', JSON.stringify(cart));
        render();
    }
}

function updateCartUI() {
    const count = cart.reduce((s, i) => s + i.qty, 0, 0);
    document.getElementById('cart-count').textContent = count;
    document.querySelector('.checkout-btn').classList.toggle('show', count > 0);
}

function checkout() {
    alert('注文画面へ！ カート: ' + JSON.stringify(cart));
}
