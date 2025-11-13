let cart = JSON.parse(localStorage.getItem('cart') || '[]');

window.onload = () => {
    renderAllSections();
    activateTab(1); // 初期表示
};

function renderSection(cat) {
    const grid = document.getElementById(`cat-${cat}-grid`);
    grid.innerHTML = '';
    const products = PRODUCTS.filter(p => p.category === cat);
    products.forEach(p => {
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

function renderAllSections() {
    [1, 2, 3, 4].forEach(cat => renderSection(cat));
}

function activateTab(cat) {
    // タブ切り替え
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.toggle('active', parseInt(tab.dataset.cat) === cat);
    });
    // セクション切り替え
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.toggle('active', parseInt(sec.dataset.cat) === cat);
    });
}

// タブクリックで本格切り替え！
document.querySelectorAll('.tab-item').forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = parseInt(tab.dataset.cat);
        activateTab(cat);
    });
});

// カート系関数
function addToCart(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (p && p.stock > 0) {
        p.stock--;
        let item = cart.find(i => i.id === id);
        if (!item) {
            item = { id, qty: 0 };
            cart.push(item);
        }
        item.qty++;
        localStorage.setItem('cart', JSON.stringify(cart));
        const activeCat = document.querySelector('.tab-item.active').dataset.cat;
        renderSection(parseInt(activeCat)); // 現在表示中のカテゴリだけ更新
        updateCartUI();
    }
}

function updateCartUI() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    document.getElementById('cart-count').textContent = count;
    document.querySelector('.checkout-btn').classList.toggle('show', count > 0);
}

function checkout() {
    alert('注文画面へ！ カート: ' + JSON.stringify(cart));
}
