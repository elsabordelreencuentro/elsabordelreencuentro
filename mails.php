<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $from = 'From:'; 
    $to = 'herrerasantiagoal@gmail.com';
    $subject = 'me gusto tu landing page';

    $body = "From: $name\n E-Mail: $email\n Message:\n $message";

	mail ($to, $subject, $body, $from);


?>
