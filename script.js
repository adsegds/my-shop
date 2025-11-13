// script.js
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

window.onload = () => {
    cart = JSON.parse(localStorage.getItem('cart') || '[]');
    render();
};

function getProductsByCat(cat) {
    return PRODUCTS.filter(p => p.category === cat);
}

function renderSection(gridId, cat) {
    const grid = document.getElementById(gridId);
    grid.innerHTML = '';
    getProductsByCat(cat).slice(0, 6).forEach(p => {
        const inCart = cart.find(i => i.id === p.id)?.qty || 0;
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img class="product-img" src="${p.image}" alt="${p.name}">
            <button class="add-btn" onclick="addToCart(${p.id})" ${p.stock === 0 ? 'disabled' : ''}>+</button>
            <div>
                <div class="product-price">¥${p.price}</div>
                <div class="product-name">${p.name}</div>
                <div class="sponsor">©${p.brand}</div>
            </div>
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
    if (!p || p.stock <= 0) return;

    p.stock--;
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty++;
    } else {
        cart.push({ id, qty: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    render();
}

function updateCartUI() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    const btn = document.querySelector('.checkout-btn');
    const countEl = document.getElementById('cart-count');
    countEl.textContent = count;

    if (count > 0) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('カートが空です！');
        return;
    }
    // cart.html に遷移（別タブで開く）
    const win = window.open('cart.html', '_blank');
    if (win) win.focus();
    else alert('ポップアップがブロックされました。許可してください。');
}

// タブ切り替え時も更新
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        cart = JSON.parse(localStorage.getItem('cart') || '[]');
        render();
    }
});
