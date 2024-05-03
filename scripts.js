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

    // Redirect to the delivery information page
    window.location.href = 'delivery_info.html';
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

function saveDeliveryInfo() {
    const deliveryForm = document.getElementById('deliveryForm');    
    const formData = {
        firstName: deliveryForm.firstName.value,
        lastName: deliveryForm.lastName.value,
        relationship: deliveryForm.relationship.value,
        address: deliveryForm.address.value,
        city: deliveryForm.city.value,
        state: deliveryForm.state.value,
        zip: deliveryForm.zip.value
    };

    localStorage.setItem('deliveryInfo', JSON.stringify(formData));
    const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems') || '[]');
    if (checkoutItems.length > 0) {
    }
}