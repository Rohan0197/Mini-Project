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
    case "POST":
        $requestBody = json_decode(file_get_contents("php://input"));

        if (isset($requestBody->action) && $requestBody->action === "placeOrder") {
            $username = $requestBody->username;
            $total_cost = $requestBody->total_cost;
            $cartItems = $requestBody->cartItems;

            $orderNumber = 'ORDER_' . rand(1000, 9999);

            $orderQuery = "INSERT INTO orders (order_number, username, total_amount) VALUES ('$orderNumber','$username', '$total_cost')";
            $result = mysqli_query($db_conn, $orderQuery);

            if ($result) {
                foreach ($cartItems as $item) {
                    if (isset($item->product_id) && isset($item->quantity)) {
                        $productId = $item->product_id;
                        $quantity = $item->quantity;
                        $amount = $item->cost;
                        $orderItemsQuery = "INSERT INTO order_items (order_number, product_id, quantity, amount) VALUES ('$orderNumber', '$productId', '$quantity','$amount')";
                        $result = mysqli_query($db_conn, $orderItemsQuery);
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
        case "GET":
            $username = $_GET['username'];
            $result = mysqli_query($db_conn, "SELECT * FROM orders WHERE username='$username'");
            
            if ($result === false) {
                echo json_encode(["error" => "Error executing query: " . mysqli_error($db_conn)]);
                exit;
            }
    
            $orders = [];
    
            while ($row = mysqli_fetch_assoc($result)) {
                $orders[] = $row;
            }
    
            echo json_encode($orders);
            break;
        
        default:
            echo json_encode(["error" => "Unsupported request method"]);
            break;
    }
    ?>