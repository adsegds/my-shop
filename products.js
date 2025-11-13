// ================================
// 商品データベース
// ================================
const PRODUCTS = [
    // ---- ペットボトル飲料 (cat:1) ----
    {
        id: 1,
        name: "クラフトボス 甘くないイタリアーノ (500ml)",
        price: 258,
        image: "./img/boss.jpg",
        stock: 10,
        cat: 1
    },
    {
        id: 2,
        name: "コカ・コーラ (500ml)",
        price: 248,
        image: "./img/coke.jpg",
        stock: 20,
        cat: 1
    },
    {
        id: 3,
        name: "サントリー 天然水 (2L)",
        price: 188,
        image: "./img/water.jpg",
        stock: 15,
        cat: 1
    },

    // ---- お菓子系 (cat:2) ----
    {
        id: 4,
        name: "プリングルズ サワークリーム&オニオン (26g)",
        price: 398,
        image: "./img/pringles.jpg",
        stock: 8,
        cat: 2
    },
    {
        id: 5,
        name: "金のとりから からあげくん",
        price: 88,
        image: "./img/torikara.jpg",
        stock: 12,
        cat: 2
    },
    {
        id: 6,
        name: "LW こんがり焼しそチップス (47g)",
        price: 178,
        image: "./img/chips.jpg",
        stock: 0,
        cat: 2
    }
];

// ================================
// カテゴリ別取得（キャッシュ付き）
// ================================
const PRODUCT_CACHE = {};

function getProductsByCat(cat) {
    if (!PRODUCT_CACHE[cat]) {
        PRODUCT_CACHE[cat] = PRODUCTS.filter(p => p.cat === cat);
    }
    return PRODUCT_CACHE[cat];
}

// ================================
// 商品をIDから取得
// ================================
function getProductById(id) {
    return PRODUCTS.find(p => p.id === id) || null;
}

