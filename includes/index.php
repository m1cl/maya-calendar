<?php 
require __DIR__ . '/../vendor/autoload.php';

$config = array(
    'host' => 'localhost',
    'user' => 'wp',
    'password' => 'admin',
    'database' => 'maya'
);

$dbConn = new \Simplon\Mysql\Mysql(
    $config['host'],
    $config['user'],
    $config['password'],
    $config[database]
);
$result = $dbConn->fetchColumn('SELECT name description id from maya where id = :id', array('id' => 1));
var_dump($result);
?>
