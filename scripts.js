function selectFlower(name, price, imageUrl) {
    const flowerData = { name, price, imageUrl };
    localStorage.setItem('selectedFlower', JSON.stringify(flowerData));
    window.location.href = 'add_to_basket.html'; 
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

function updateCartCount() {
    const basket = JSON.parse(localStorage.getItem('basket') || '[]');
    const cartCount = basket.length;
    document.getElementById('cart-count').textContent = cartCount;
}
//push