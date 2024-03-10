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
        $userpostdata = json_decode(file_get_contents("php://input"));

        if (isset($userpostdata->req) && $userpostdata->req === true) {
            // If login request
            $username = $userpostdata->username;
            $password = $userpostdata->password;
            $result = mysqli_query($db_conn, "SELECT * FROM user_info WHERE username='$username' AND password='$password'");
            if (mysqli_num_rows($result) > 0) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }
        } else {
            $username = $userpostdata->username;
            $useremail = $userpostdata->email;
            $userphone = $userpostdata->phone;
            $userpassword = $userpostdata->password;

            $result = mysqli_query($db_conn, "INSERT INTO user_info (username, email_id, phone_num, password) 
            VALUES ('$username', '$useremail', '$userphone', '$userpassword')");

            if ($result) {
                echo json_encode(["success" => "User Created"]);
            } else {
                echo json_encode(["error" => "Failed to add user. Please check the user data."]);
            }
        }
        break;
    default:
        echo json_encode(["error" => "Unsupported request method"]);
        break;
}
?>