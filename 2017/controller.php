<html>
    <head><title>contoroller</title></head>

    <body>

        <form action="controller.php" method="post">
               <select name="Count">
                   <option value="0">ALL</option>
                   <?php
                       for($i = 1; $i <= 40; $i ++) {
                           print("<option value=\"" . $i . "\">test" . $i . ".csv</option>");
                       }
                   ?>

            </select>
            <input type="submit" name="init" value="初期化" /><br>
        </form>

<?php

    $label = array("Time","Pitch","Yaw","Roll","Latitude","Longitude","GpsCnt","StraightDistance","IntegralDistance","Elevator","Rudder","Trim","Cadence","Ultsonic","Atmopress","Selector","Cadencevolt","Ultsonicvolt","servovolt");

    if(isset($_POST['init'])) {
        for($i = 1; $i <= 40; $i ++) {
            if($_POST['Count'] = 'ALL' || $_POST['Count'] = $i) {
                $file = "csv/".'test' . $i . '.csv';
                $content = "";
                file_put_contents($file, $content);
            }
        }
    } else if(isset($_POST['write'])) {
        $data;
        $data .= $_POST['Count'].",";
        for($i = 0; $i < 19; $i ++) {
            if($_POST[$label[$i]] != "") {
                $data .= $_POST[$label[$i]];
            } else {
                $data .= 0;
            }
            $data .= ",";
        }
        $data = substr($data, 0, -1);
        print($data);

    }
?>
    </body>

</html>
