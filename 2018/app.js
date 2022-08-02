var last_length = 0;
var Time = [];
var Pitch = [];
var Yaw = [];
var Roll = [];
var StraightDistance = [];
var Elevator = [];
var Rudder = [];
var Airspeed = [];
var Cadence = [];
var Ultsonic = [];
var flag = 1;

var a = 0.05; //指数移動平均 平滑化係数

var data = {
    "Time": Time,
    "Pitch": Pitch,
    "Yaw": Yaw,
    "Roll": Roll,
    "StraightDistance": StraightDistance,
    "Elevator": Elevator,
    "Rudder": Rudder,
    "Airspeed": Airspeed,
    "Cadence": Cadence,
    "Ultsonic": Ultsonic
};

var last_filename = "test1.csv";

var chart1 = new CanvasJS.Chart("chartContainer1", {

    axisY: {
        title: "大気速〔m/s〕",
    },
    axisY2: {
        title: "回転数〔rpm〕"
    },

    data: [{
        name: "Airspeed",
        legendText: "大気速",
        showInLegend: true,
        type: 'line',
        dataPoints: data["Airspeed"]
    }, {
        neme: "Cadence",
        legendText: "回転数",
        showInLegend: true,
        type: 'line',
        axisYType: "secondary",
        dataPoints: data["Cadence"]
    }]
});

var chart2 = new CanvasJS.Chart("chartContainer2", {

    axisY: {
        title: "姿勢角〔°〕",
    },
    axisY2: {
        title: "尾翼角〔°〕"
    },

    data: [{
        name: "Pitch",
        legendText: "Pitch",
        showInLegend: true,
        type: 'line',
        dataPoints: data["Pitch"]
    }, {
        neme: "Yaw",
        legendText: "Yaw",
        showInLegend: true,
        type: 'line',
        dataPoints: data["Yaw"]
    }, {
        neme: "Roll",
        legendText: "Roll",
        showInLegend: true,
        type: 'line',
        dataPoints: data["Roll"]
    }, {
        name: "Elevator",
        legendText: "Elevator",
        showInLegend: true,
        type: 'line',
        axisYType: "secondary",
        dataPoints: data["Elevator"]
    }, {
        name: "Rudder",
        legendText: "Rudder",
        showInLegend: true,
        type: 'line',
        axisYType: "secondary",
        dataPoints: data["Rudder"]
    }]
});

var chart3 = new CanvasJS.Chart("chartContainer3", {

    axisY: {
        title: "高度〔m〕",
    },
    axisY2: {
        title: "直線距離〔m〕"
    },

    data: [{
        name: "Ultsonic",
        legendText: "高度",
        showInLegend: true,
        type: 'line',
        dataPoints: data["Ultsonic"]
    }, {
        neme: "StraightDistance",
        legendText: "スタート位置からの直線距離",
        showInLegend: true,
        type: 'line',
        axisYType: "secondary",
        dataPoints: data["StraightDistance"]
    }]
});

function getData() {
    var filename = document.filename.Count.value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                flag = 0;

                //var elem = document.getElementById("a");
                //elem.innerText = "";

                var content = xmlhttp.responseText;
                var result = [];

                var tmp = content.split("\n");
                var length = tmp.length - 1;
                var time = tmp[0].substr(tmp[0].indexOf(","));

                if (length > 0) {

                    for (var i = 0; i < length; i++) {
                        result[i] = tmp[i].split(',');
                    }

                    for (var i = 0; i < length; i++) {
                        if (last_length + i >= 50) {
                            data["Pitch"].push({
                                x: last_length + i,
                                y: Number(result[i][1]) * a + (1 - a) * data["Pitch"][last_length + i - 1]['y']
                            });
                            data["Yaw"].push({
                                x: last_length + i,
                                y: Number(result[i][2]) * a + (1 - a) * data["Yaw"][last_length + i - 1]['y']
                            });
                            data["Roll"].push({
                                x: last_length + i,
                                y: Number(result[i][3]) * a + (1 - a) * data["Roll"][last_length + i - 1]['y']
                            });
                        } else {
                            data["Pitch"].push({
                                x: last_length + i,
                                y: Number(result[i][1])
                            });
                            data["Yaw"].push({
                                x: last_length + i,
                                y: Number(result[i][2])
                            });
                            data["Roll"].push({
                                x: last_length + i,
                                y: Number(result[i][3])
                            });
                        }
                        data["StraightDistance"].push({
                            x: last_length + i,
                            y: Number(result[i][7])
                        });
                        data["Elevator"].push({
                            x: last_length + i,
                            y: Number(result[i][9])
                        });
                        data["Rudder"].push({
                            x: last_length + i,
                            y: Number(result[i][10])
                        });

                        var as = Number(result[i][12]);
                        if (as >= 0 && as < 14) {
                            data["Airspeed"].push({
                                x: last_length + i,
                                y: as
                            });
                        }

                        var cdc = Number(result[i][13]);
                        if (cdc >= 0 && cdc < 180) {
                            data["Cadence"].push({
                                x: last_length + i,
                                y: cdc
                            });
                        }

                        data["Ultsonic"].push({
                            x: last_length + i,
                            y: Number(result[i][14])
                        });
                    }
                    last_length += length;
                }
                flag = 1;
            } else {
                alert("status = " + xmlhttp.status);
            }
        }
    }
    if (flag || last_filename != filename) {
        if (last_filename != filename) {
            last_length = 0;
            last_filename = filename;
            data["Time"].length = 0;
            data["Pitch"].length = 0;
            data["Yaw"].length = 0;
            data["Roll"].length = 0;
            data["StraightDistance"].length = 0;
            data["Elevator"].length = 0;
            data["Rudder"].length = 0;
            data["Airspeed"].length = 0;
            data["Cadence"].length = 0;
            data["Ultsonic"].length = 0;
        }
        url = "http://quatronic.php.xdomain.jp/birdman/output.php?filename=" + filename + "&lineN=" + last_length;
        xmlhttp.open("GET", url);
        xmlhttp.send();
        flag = 0;
    }
}

var label = ["Time", "Pitch", "Yaw", "Roll", "Latitude", "Longitude", "GpsCnt", "StraightDistance", "IntegralDistance", "Elevator", "Rudder", "Trim", "Airspeed", "Cadence", "Ultsonic", "Atmopress", "Selector", "Cadencevolt", "Ultsonicvolt", "servovolt"];
var unit = ["秒", "°", "°", "°", "", "", "", "m", "m", "°", "°", "", "m/s", "rpm", "m", "hPa", "", "V", "V", "V"];

function render() {
    chart1.render();
    chart2.render();
}

setInterval('getData()', 250);
setInterval('render()', 250);
