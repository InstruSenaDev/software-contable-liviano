<?php

// Include Composer autoload file to load Resend SDK classes...
require __DIR__ . '/vendor/autoload.php';

// Assign a new Resend Client instance to $resend variable, which is automatically autoloaded...
$resend = Resend::client('re_3WYFfoRX_jgMpkmg6qt97vvfhjK3P2JT6');

try {
    $result = $resend->emails->send([
        'from' => 'Acme <onboarding@resend.dev>',
        'to' => ['laucamilavega@gmail.com'],
        'subject' => 'Hello world',
        'html' => '<strong>It works!</strong>',
    ]);
} catch (\Exception $e) {
    exit('Error: ' . $e->getMessage());
}

// Show the response of the sent email to be saved in a log...
echo $result->toJson();
