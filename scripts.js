document.addEventListener('DOMContentLoaded', function() {
    const selectedFlower = JSON.parse(localStorage.getItem('selectedFlower'));
    if (selectedFlower) {
        document.getElementById('product-name').textContent = selectedFlower.name;
        document.getElementById('product-image').src = selectedFlower.imageUrl;
        document.getElementById('product-image').alt = selectedFlower.name;
        document.getElementById('subscription-price').textContent = `$${selectedFlower.price - 10}`;
        document.getElementById('one-time-price').textContent = `$${selectedFlower.price}`;
    } else {
        console.log('No flower selected');
    }
});

function addToBasket() {
    const deliveryDate = document.getElementById('delivery-date').value;
    const purchaseOption = document.querySelector('input[name="purchase-option"]:checked').value;

    if (!deliveryDate) {
        alert('Please select a delivery date.');
        return;
    }

    const basket = JSON.parse(localStorage.getItem('basket') || '[]');
    const selectedFlower = JSON.parse(localStorage.getItem('selectedFlower'));

    basket.push({
        name: selectedFlower.name,
        price: purchaseOption === 'subscription' ? selectedFlower.price - 10 : selectedFlower.price,
        deliveryDate: deliveryDate,
        purchaseOption: purchaseOption
    });

    localStorage.setItem('basket', JSON.stringify(basket));
    alert('Added to basket!');
    updateCartCount();
}

function updateCartCount() {
    const basket = JSON.parse(localStorage.getItem('basket') || '[]');
    document.getElementById('cart-count').textContent = basket.length;
}