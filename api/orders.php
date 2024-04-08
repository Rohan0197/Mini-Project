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
    case "POST":
        $orderpostdata = json_decode(file_get_contents("php://input"));

        if (isset($orderpostdata->action) && $orderpostdata->action === "placeOrder") {
            $username = $orderpostdata->username;
            $total_cost = $orderpostdata->total_cost; 
            $cartItems = $orderpostdata->cartItems;

            $randomNumber = rand(1000, 9999);
            $orderNumber = 'ORDER_' . $randomNumber;

            $result = mysqli_query($db_conn, "INSERT INTO orders (order_number, username, total_amount) VALUES ('$orderNumber','$username', '$total_cost')");

            if ($result) {
                foreach ($cartItems as $item) {
                    if (isset($item->product_id) && isset($item->quantity)) {
                        $productId = $item->product_id;
                        $quantity = $item->quantity;
                        $amount = $item->cost;
                        $result = mysqli_query($db_conn, "INSERT INTO order_items (order_number, product_id, quantity,amount) VALUES ('$orderNumber', '$productId', '$quantity','$amount')");
                        if (!$result) {
                            echo json_encode(["error" => "Failed to add order items. Please check the cart data."]);
                            exit;
                        }
                    } else {
                        echo json_encode(["error" => "Invalid item data. Product ID or quantity is missing."]);
                        exit;
                    }
                }

                echo json_encode(["success" => "Order placed successfully", "order_number" => $orderNumber]);
            } else {
                echo json_encode(["error" => "Failed to place order"]);
            }
        } else {
            echo json_encode(["error" => "Invalid action or action not specified"]);
        }
        break;
    default:
        echo json_encode(["error" => "Unsupported request method"]);
        break;
}
?>