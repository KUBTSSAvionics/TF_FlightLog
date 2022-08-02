<?php
    header("Content-Type: text/html; charset=UTF-8");
        $fp = fopen("lastline.csv", 'r');
        $line = fgets($fp);
        print $line;
?>
