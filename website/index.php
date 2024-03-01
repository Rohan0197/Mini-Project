<?php
    include("database.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="index.php" method="post">
        <h2>Welcome to Fakebook!</h2>
        username:<br>
        <input type="text" name="username"><br>
        password:<br>
        <input type="password" name="password"><br>
        <input type="submit" name="submit" value="register">
    </form>
</body>
</html>
<?php
        $username = $_POST["username"];
        $password = $_POST["password"];
    
        if(empty($username)){
            echo"Please enter a username";
        }
        elseif(empty($password)){
            echo"Please enter a password";
        }
        else{
            $sql = "INSERT INTO users (username, password)
                    VALUES ('$username', '$password')";
            
            try{
                mysqli_query($conn, $sql);
                echo"You are now registered!";
            }
            catch(mysqli_sql_exception){
                echo"That username is taken";
            }
        }

    mysqli_close($conn);
?>