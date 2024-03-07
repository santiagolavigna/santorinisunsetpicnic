<?php
require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ .'/../');
$dotenv->load();

if (!isset($_ENV['SMTP_USERNAME']) || !isset($_ENV['SMTP_PASSWORD']) || !isset($_ENV['FINAL_ADDRESS'])) {
    
    ob_start();
    var_dump("DEFINIR VARIABLES .ENV");
    $data = ob_get_clean();        
    $date = date("Y/m/d - H:i:s");
    $fp = fopen('../logs/log.txt', "a+");
    fwrite($fp, $date . " & " . $data);
    fwrite($fp, "\n");
    fclose($fp);

    return false;    
}

$sending_email = $_ENV['SMTP_USERNAME'];

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.hostinger.com';
    $mail->SMTPAuth   = true; 
    $mail->Username   = $sending_email;
    $mail->Password   = $_ENV['SMTP_PASSWORD']; 
    $mail->SMTPSecure = 'tls'; 
    $mail->Port       = 587; 

    // Configuración del remitente y destinatario
    $mail->setFrom($sending_email, 'SantoriniSunsetPicnic'); // Dirección de correo electrónico y nombre del remitente
    $mail->addAddress($_ENV['FINAL_ADDRESS']); // Dirección de correo electrónico del destinatario

    $mail->isHTML(true); 
    $mail->Subject = $_POST['subject']; 
    $mail->Body = "
    <html>
    <body>
        <div class='logo d-flex'>
            <a href='index.html'><img src='../assets/img/logo.svg' alt='' class='img-fluid'></a>
            <h2>New Contact</h2>
        </div>
        <p><strong>Name:</strong> " . $_POST['name'] . "</p>
        <p><strong>Email:</strong> " . $_POST['email'] . "</p>
        <p><strong>Message:</strong><br>" . $_POST['message'] . "</p>
    </body>
    </html>
    ";
    
    $mail->send();
    echo true;
} catch (Exception $e) {
    
    ob_start();
    var_dump($mail->ErrorInfo);
    $data = ob_get_clean();        
    $date = date("Y/m/d - H:i:s");
    $fp = fopen('../logs/log.txt', "a+");
    fwrite($fp, $date . " & " . $data);
    fwrite($fp, "\n");
    fclose($fp);

    echo false;
}

?>
