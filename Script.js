// Event listener for admin panel button
document.getElementById('admin-button').addEventListener('click', function() {
    document.getElementById('admin-panel').style.display = 'block';
});

// Fetch and display users, products, and orders on page load
document.addEventListener('DOMContentLoaded', function() {
    fetchUsers();
    fetchProducts();
    fetchOrders();
});

// Function to fetch and display users
function fetchUsers() {
    fetch('php/fetch_users.php')
        .then(response => response.json())
        .then(data => {
            let usersList = document.getElementById('users-list');
            usersList.innerHTML = '<ul>' + data.map(user => `
                <li>${user.username} - ${user.email} <button onclick="deleteUser(${user.id})">Delete</button></li>`).join('') + '</ul>';
        })
        .catch(error => console.error('Error fetching users:', error));
}

// Function to fetch and display products
function fetchProducts() {
    fetch('php/fetch_products.php')
        .then(response => response.json())
        .then(data => {
            let productsList = document.getElementById('products-list');
            productsList.innerHTML = '<ul>' + data.map(product => `
                <li>
                    ${product.name} - ${product.price}
                    <button onclick="editProduct(${product.id}, '${product.name}', '${product.description}', ${product.price}, '${product.category}', '${product.image_url}')">Edit</button>
                </li>`).join('') + '</ul>';
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Function to fetch and display orders
function fetchOrders() {
    fetch('php/fetch_orders.php')
        .then(response => response.json())
        .then(data => {
            let ordersList = document.getElementById('orders-list');
            ordersList.innerHTML = '<ul>' + data.map(order => `<li>Order ID: ${order.id} - Status: ${order.status}</li>`).join('') + '</ul>';
        })
        .catch(error => console.error('Error fetching orders:', error));
}

// Function to delete a user
function deleteUser(userId) {
    fetch('php/delete_user.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `user_id=${userId}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Show success message or handle response
        fetchUsers(); // Refresh users list after deletion
    })
    .catch(error => console.error('Error deleting user:', error));
}

// Function to edit a product
function editProduct(productId, name, description, price, category, imageUrl) {
    let newName = prompt("Enter new name", name);
    let newDescription = prompt("Enter new description", description);
    let newPrice = prompt("Enter new price", price);
    let newCategory = prompt("Enter new category", category);
    let newImageUrl = prompt("Enter new image URL", imageUrl);

    fetch('php/edit_product.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `product_id=${productId}&name=${newName}&description=${newDescription}&price=${newPrice}&category=${newCategory}&image_url=${newImageUrl}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Show success message or handle response
        fetchProducts(); // Refresh products list after edit
    })
    .catch(error => console.error('Error editing product:', error));
}

// Example function for admin login (assuming form submission)
document.getElementById('admin-login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    fetch('php/admin_login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${username}&password=${password}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Show response message (e.g., "Login successful")
        // Additional logic to handle successful login, e.g., redirect or show admin panel
    })
    .catch(error => console.error('Error logging in:', error));
});

// Example function for user registration (assuming form submission)
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    let formData = new FormData(this);

    fetch('php/registration.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Show response message (e.g., "Registration successful")
        // Additional logic after successful registration, e.g., redirect to login page
    })
    .catch(error => console.error('Error registering user:', error));
});

// Example function for placing an order (assuming form submission)
document.getElementById('place-order-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    let formData = new FormData(this);

    fetch('php/place_order.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Show response message (e.g., "Order placed successfully")
        // Additional logic after successful order placement, e.g., update UI
    })
    .catch(error => console.error('Error placing order:', error));
});