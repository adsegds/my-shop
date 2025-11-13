// products.js
const PRODUCTS = [
    { id: 1, name: "クラフトボス甘くないイタリアーノ (500ml)", price: 258, image: "https://i.imgur.com/boss.jpg", stock: 10, cat: 1 },
    { id: 2, name: "コカ・コーラ (500ml)", price: 248, image: "https://i.imgur.com/coke.jpg", stock: 20, cat: 1 },
    { id: 3, name: "サントリー 天然水 (2L)", price: 188, image: "https://i.imgur.com/water.jpg", stock: 15, cat: 1 },
    { id: 4, name: "プリングルズ<サワークリーム&オニオン> (26g)", price: 398, image: "https://i.imgur.com/pringles.jpg", stock: 8, cat: 2 },
    { id: 5, name: "金のとりから からあげくん", price: 88, image: "https://i.imgur.com/torikara.jpg", stock: 12, cat: 2 },
    { id: 6, name: "LW こんがり焼しそチップス (47g)", price: 178, image: "https://i.imgur.com/chips.jpg", stock: 0, cat: 2 }
];

// カテゴリー別フィルター
function getProductsByCat(cat) {
    return PRODUCTS.filter(p => p.cat === cat);
}
