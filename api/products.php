<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

$db_conn = mysqli_connect("localhost", "root", "", "mini_project");

if ($db_conn === false) {
    die(json_encode(["error" => "ERROR: Could Not Connect " . mysqli_connect_error()]));
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        // Fetch product data from database
        $result = mysqli_query($db_conn, "SELECT product_name as name, Cost as cost, Stock as stock, img_url as img FROM products");

        if ($result === false) {
            die(json_encode(["error" => "Error executing query: " . mysqli_error($db_conn)]));
        }

        $products = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $products[] = $row;
        }

        // Echo the data
        echo json_encode($products);
        break;

    default:
        echo json_encode(["error" => "Unsupported request method"]);
        break;
}
?>