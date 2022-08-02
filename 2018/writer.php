<?php
    header("Content-Type: text/html; charset=UTF-8");

    $input = file_get_contents('php://input');
    //$input = $_POST["data"];

    $content = mb_convert_encoding($input, "UTF-8");
    //print $content;
    $p = strpos($content, ",");
    $count = substr("$content", 0, $p);
    $replace = substr($content, $p + 1, strlen($content)-$p);

    $lines = explode("\n", $replace);
    file_put_contents("lastline.csv", $lines[0]);

    if (ctype_digit(strval($count))) {
        $filename = "csv/"."test".$count.".csv";
        if(!file_exists($filename)) {
            touch($filename);
            file_put_contents($filename, "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\n");
        }
        file_put_contents($filename, $replace, FILE_APPEND);
    }
?>
