<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit();
}

$conn = new mysqli('localhost', 'root', '', 'login_system');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$user_id = $_SESSION['user_id'];
$sql = "SELECT * FROM users WHERE id='$user_id'";
$result = $conn->query($sql);
$user = $result->fetch_assoc();

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h2>Welcome, <?php echo $user['name']; ?></h2>
        <table>
            <tr>
                <th>Name</th>
                <td><?php echo $user['name']; ?></td>
            </tr>
            <tr>
                <th>Email</th>
                <td><?php echo $user['email']; ?></td>
            </tr>
            <tr>
                <th>Phone</th>
                <td><?php echo $user['phone']; ?></td>
            </tr>
        </table>
        <a href="logout.php" class="button">Logout</a>
        
        <form action="upload.php" method="post" enctype="multipart/form-data">
            <label for="file">Upload Document:</label>
            <input type="file" id="file" name="file" required>
            <button type="submit">Upload</button>
        </form>
    </div>
</body>
</html>
