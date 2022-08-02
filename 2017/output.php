<?php
    header("Content-Type: text/csv; charset=UTF-8");

    if (!(isset($_GET['filename']))) {
        return 0;
    }

    $filename = $_GET['filename'];

    $lineN = isset($_GET['lineN'][0])? (int)$_GET['lineN'] : 0;

    $file = file("csv/" . $filename);

    for ($i = $lineN; ($line = $file[$i]) != null; $i ++) {
        print $line;
    }

?>
