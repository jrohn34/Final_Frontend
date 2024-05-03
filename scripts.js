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
    const form = document.getElementById('deliveryForm');

    if (form.checkValidity()) {
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
    } else {
        form.reportValidity();
    }
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: email, password: password })
    })
    .then(response => {
        if (response.ok) return response.json();
        throw new Error('Login failed.');
    })
    .then(data => {
        localStorage.setItem('authToken', data.token);
        window.location.href = 'index.html';  
    })
    .catch(error => alert(error.message));
});

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: email, password: password, email: email })
    })
    .then(response => {
        if (response.ok) return response.json();
        throw new Error('Signup failed.');
    })
    .then(data => {
        alert('Signup successful.');
        window.location.href = 'index.html';  // Redirect or handle appropriately
    })
    .catch(error => alert(error.message));
});

document.getElementById('showPassword').onclick = function() {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const selectedFlower = JSON.parse(localStorage.getItem('selectedFlower'));
    const deliveryInfo = JSON.parse(localStorage.getItem('deliveryInfo'));
    if (selectedFlower && deliveryInfo) {
        document.getElementById('flower-name').textContent = selectedFlower.name;
        document.getElementById('flower-image').src = selectedFlower.imageUrl;
        document.getElementById('flower-image').alt = selectedFlower.name;

        document.getElementById('delivery-date').textContent = deliveryInfo.deliveryDate;
        document.getElementById('item-price').textContent = `$${selectedFlower.price}`;
        document.getElementById('delivery-address').textContent = `${deliveryInfo.address}, ${deliveryInfo.city}, ${deliveryInfo.state}, ${deliveryInfo.zip}`;

        const subtotal = parseFloat(selectedFlower.price);
        const deliveryDiscount = localStorage.getItem('isLoggedIn') === 'true' ? 10 : 0;
        const totalPrice = subtotal + 25 - deliveryDiscount;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('delivery-discount').textContent = `-$${deliveryDiscount.toFixed(2)}`;
        document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
    } else {
        alert('No flower or delivery information found');
        window.location.href = 'index.html'; 
    }
});

function placeOrder() {
    const deliveryInfo = JSON.parse(localStorage.getItem('deliveryInfo'));
    const selectedFlower = JSON.parse(localStorage.getItem('selectedFlower'));
    if (!deliveryInfo || !selectedFlower) {
        alert('No delivery information or selected flower found');
        return;
    }

    const orderData = {
        flowerId: selectedFlower.id,
        recipientName: deliveryInfo.firstName + " " + deliveryInfo.lastName,
        totalCost: document.getElementById('total-price').textContent.replace('$', ''),
        customerUserName: localStorage.getItem('username') // Assuming you store username in localStorage upon login
    };

    fetch('/orders/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken') // Assuming token storage upon login
        },
        body: JSON.stringify(orderData)
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to place order');
        return response.json();
    })
    .then(data => {
        alert('Order successfully placed with ID: ' + data);
        localStorage.removeItem('selectedFlower'); // Clear selected flower after order
        localStorage.removeItem('deliveryInfo'); // Clear delivery info
        window.location.href = 'order_confirmation.html'; // Redirect to confirmation page
    })
    .catch(error => {
        console.error('Error placing order:', error);
        alert('Failed to place order: ' + error.message);
    });
}