<?php
// place_order.php
include('db.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_POST['user_id'];
    $product_id = $_POST['product_id'];
    $quantity = $_POST['quantity'];
    $total_price = $_POST['total_price'];

    $sql = "INSERT INTO orders (user_id, product_id, quantity, total_price) VALUES ('$user_id', '$product_id', '$quantity', '$total_price')";
    if ($conn->query($sql) === TRUE) {
        echo "Order placed successfully!";
        // Send email notification to cbawa83@gmail.com
        $to = "cbawa83@gmail.com";
        $subject = "New Order Received";
        $message = "Order Details:\nProduct ID: $product_id\nQuantity: $quantity\nTotal Price: $total_price";
        $headers = "From: no-reply@kontonkyisupply.com";

        mail($to, $subject, $message, $headers);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>

<form action="php/place_order.php" method="post">
    <input type="hidden" name="user_id" value="1"> <!-- This should be dynamically set based on the logged-in user -->
    <input type="hidden" name="product_id" value="1"> <!-- This should be dynamically set based on the selected product -->
    <input type="number" name="quantity" placeholder="Quantity" required>
    <input type="number" step="0.01" name="total_price" placeholder="Total Price" required>
    <button type="submit">Place Order</button>
</form>