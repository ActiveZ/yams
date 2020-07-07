<?php
//fichier sur le serveur
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: GET, POST, OPTION');
// header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//header('Access-Control-Allow-Headers: application/json');

require_once 'bdd.php';
// require_once 'bdd' . DIRECTORY_SEPARATOR . 'bdd.php';

$_POST = json_decode(file_get_contents('php://input'), true);

if ($_POST['action'] === 'getMessages') {
    $req = $pdo->prepare('SELECT * FROM yamScore ORDER BY dateTimestamp DESC LIMIT 0,100');
    $req->execute();
    $data = $req->fetchAll();

    echo json_encode($data);
}


elseif ($_POST['action'] === 'sendMessages') {
    //$date = new DateTime();
    $req = $pdo->prepare('INSERT INTO yamScore (pseudo, score) VALUES (:pseudo, :score)'); // date générée par bdd
    $req->execute([
        'pseudo' => $_POST['pseudo'],
        'score' => $_POST['score'],
        // 'dateTimestamp' => $date->getTimestamp()
    ]);
}