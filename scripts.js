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

function saveData() {
    const form = document.getElementById('deliveryForm');
    const formData = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        relationship: form.relationship.value,
        address: form.address.value,
        city: form.city.value,
        state: form.state.value,
        zip: form.zip.value
    };
    localStorage.setItem('deliveryInfo', JSON.stringify(formData));
    window.location.href = 'place_order.html'; 
}

function redirectToLogin() {
    saveData(); 
    window.location.href = 'login.html';
}

function redirectToSignup() {
    saveData();
    window.location.href = 'signup.html';
}

function togglePasswordVisibility() {
    var passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const selectedFlower = JSON.parse(localStorage.getItem('selectedFlower'));
    if (selectedFlower) {
        document.getElementById('flower-name').textContent = selectedFlower.name;
        document.getElementById('flower-price').textContent = `$${selectedFlower.price}`;
    } else {
        document.getElementById('flower-name').textContent = 'No flower selected';
        document.getElementById('flower-price').textContent = '';
    }

    window.saveDeliveryInfo = function() {
        alert('Delivery information saved!');
    };
});