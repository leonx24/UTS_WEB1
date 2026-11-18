<?php

$host = '127.0.0.1';
$dbName = 'rakitstudio_db';
$username = 'root';
$password = '';
$lamppSocket = '/opt/lampp/var/mysql/mysql.sock';

$dsn = file_exists($lamppSocket)
    ? "mysql:unix_socket=$lamppSocket;dbname=$dbName;charset=utf8mb4"
    : "mysql:host=$host;dbname=$dbName;charset=utf8mb4";

$pdo = new PDO($dsn, $username, $password, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);
