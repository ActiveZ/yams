<?php
// fichier sur le serveur free
// $host = 'sql.free.fr';
// $charset = 'utf8';
// $db = 'frugysoft';
// $username = 'frugysoft';
// $password = 'ArnO2000';

// localhost
$host = 'localhost';
$db   = 'yams';
$username = 'root';
$password = 'cnam2020';
$charset = 'utf8';

$options = [
    \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
    \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
    \PDO::ATTR_EMULATE_PREPARES   => false,
];
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
try {
     $pdo = new \PDO($dsn, $username, $password, $options);
} catch (\PDOException $e) {
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
}