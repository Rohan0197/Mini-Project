<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

$db_conn = mysqli_connect("localhost", "root", "", "mini_project");

if ($db_conn === false) {
    echo json_encode(["error" => "ERROR: Could Not Connect " . mysqli_connect_error()]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        $order_number = $_GET['order_number'];

        $stmt = mysqli_prepare($db_conn, "SELECT oi.*, p.* FROM order_items oi JOIN products p ON oi.product_id = p.product_id WHERE oi.order_number = ?");

        mysqli_stmt_bind_param($stmt, "s", $order_number);

        mysqli_stmt_execute($stmt);

        $result = mysqli_stmt_get_result($stmt);
        
        if ($result === false) {
            echo json_encode(["error" => "Error executing query: " . mysqli_error($db_conn)]);
            exit;
        }

        $order_items = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $order_items[] = $row;
        }

        echo json_encode($order_items);
        break;
    
    default:
        echo json_encode(["error" => "Unsupported request method"]);
        break;
}
?>