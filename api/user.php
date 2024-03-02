<?php
error_reporting(E_ALL);
ini_set('display_errors',1);
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$db_conn= mysqli_connect("localhost","root", "", "reactphp");
if($db_conn===false)
{
  die("ERROR: Could Not Connect".mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];
//  echo "test----".$method; die;
switch($method)
{
    case "POST":
        $userpostdata= json_decode(file_get_contents("php://input"));
        //echo "sucess data";
        //print_r($userpostdata); die;
        $username= $userpostdata->username;
        $useremail= $userpostdata->email;
        $userphone= $userpostdata->phone;
        $userpassword= $userpostdata->password;
        $result= mysqli_query($db_conn, "INSERT INTO user_info (username, email_id, phone_num, password) 
        VALUES('$username', '$useremail', '$userphone', '$userpassword')");
    
        if($result)
        {
          echo json_encode(["success"=>"User Added Successfully"]);
          return;
        } else {
            echo json_encode(["success"=>"Please Check the User Data!"]);
            return; 
        }
        break;
    }



?>