<?php
// upload_product.php
include('db.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $category = $_POST['category'];
    $image_url = $_POST['image_url'];

    $sql = "INSERT INTO products (name, description, price, category, image_url) VALUES ('$name', '$description', '$price', '$category', '$image_url')";
    if ($conn->query($sql) === TRUE) {
        echo "Product uploaded successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>

<form action="php/upload_product.php" method="post">
    <input type="text" name="name" placeholder="Product Name" required>
    <input type="text" name="description" placeholder="Description" required>
    <input type="number" step="0.01" name="price" placeholder="Price" required>
    <input type="text" name="category" placeholder="Category" required>
    <input type="text" name="image_url" placeholder="Image URL" required>
    <button type="submit">Upload Product</button>
</form>