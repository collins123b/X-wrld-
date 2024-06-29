<?php
// admin_login.php
include('db.php');

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE username='$username' AND is_admin=1";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            $_SESSION['admin'] = $username;
            echo "Login successful!";
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "No admin user found.";
    }
}

$conn->close();
?>