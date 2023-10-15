<?php
// Starting session
session_start();

// ! kill the session
// session_destroy();

$request_route = $_SERVER["REQUEST_METHOD"] . "_" . $_SERVER["REQUEST_URI"];

switch ($request_route) {
    case 'GET_/':
        if(!isset($_SESSION["is_logged_in"]) || $_SESSION["is_logged_in"] != 1) {
            require "../views/login.php";
        } else {
            require "../views/home.php";
        }
        break;
    case "POST_/login":
        require "../process_login.php";
        break;
    default:
        require "../views/404.php";
        break;
}
