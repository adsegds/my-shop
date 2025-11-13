// script.js
let cart = [];

// エラーチェック
if (typeof PRODUCTS === 'undefined') {
    document.body.innerHTML = '<h1 style="text-align:center;margin:50px;color:red;">products.js が読み込まれていません！</h1>';
    throw new Error('PRODUCTS is not defined');
}

window.onload = () => {
    cart = JSON.parse(localStorage.getItem('cart') || '[]');
    render();
};

function getProductsByCat(cat) {
    return PRODUCTS.filter(p => p.category === cat);
}

function renderSection(gridId, cat) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.innerHTML = '';
    getProductsByCat(cat).slice(0, 6).forEach(p => {
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
    if (countEl) countEl.textContent = count;

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
    alert('注文画面に移動します！（cart.html）');
    // window.open('cart.html', '_blank');
}

// タブ戻り時も更新
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        cart = JSON.parse(localStorage.getItem('cart') || '[]');
        render();
    }
});
