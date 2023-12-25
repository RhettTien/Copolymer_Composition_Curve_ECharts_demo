data_ = {}
series = []
series_ = [
    {
        "name": "r1=1_r2=1",
        "showSymbol": false,
        "data": [
            [0.0, 0.0],
            [1.0, 1.0]
        ],
        "type": "line",
        "smooth": true,
        "itemStyle": {
            "normal": {
                "lineStyle": {
                    "width": 2,
                    "type": "dotted"
                }
            }
        }
    }
]
series = series_

window.onload = function () {

    document.getElementById("resetbtn").onclick = function () {

        series = []

        var myChart = echarts.init(document.getElementById('container'));
        myChart.setOption({
            title: {
                text: 'Copolymer Composition Curve',
                left: 'center',
                top: 10,
            },
            legend: {
                itemHeight: 0,
                itemGap: 10,
                bottom: 10,
                itemWidth: 15,
                textStyle: {
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            xAxis: {
                name: 'f1',
                nameLocation: 'end',
                nameGap: 30,
                type: 'value',
                boundaryGap: false,
                interval: 0.1,
                nameTextStyle: {
                    fontSize: 15,
                    fontWeight: 'bold'
                }
            },
            yAxis: {
                name: 'F1',
                nameLocation: 'end',
                nameGap: 30,
                type: 'value',
                boundaryGap: false,
                interval: 0.1,
                nameTextStyle: {
                    fontSize: 15,
                    fontWeight: 'bold'
                }
            },
            series: [
                {
                    "name": "r1=r2=1",
                    "showSymbol": false,
                    "data": [
                        [0.0, 0.0],
                        [1.0, 1.0]
                    ],
                    "type": "line",
                    "smooth": true,
                    "itemStyle": {
                        "normal": {
                            "lineStyle": {
                                "width": 2,
                                "type": "dotted"
                            }
                        }
                    }
                }
            ]
        }, true)
    }
}

document.getElementById("clearbtn").onclick = function () {

    series = []

    var myChart = echarts.init(document.getElementById('container'));
    myChart.setOption({
        title: {
            text: 'Copolymer Composition Curve',
            left: 'center',
            top: 10,
        },
        legend: {
            itemHeight: 0,
            itemGap: 10,
            bottom: 10,
            itemWidth: 15,
            textStyle: {
                fontSize: 14,
                fontWeight: 'bold'
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        xAxis: {
            name: 'f1',
            nameLocation: 'end',
            nameGap: 30,
            type: 'value',
            boundaryGap: false,
            interval: 0.1,
            nameTextStyle: {
                fontSize: 15,
                fontWeight: 'bold'
            }
        },
        yAxis: {
            name: 'F1',
            nameLocation: 'end',
            nameGap: 30,
            type: 'value',
            boundaryGap: false,
            interval: 0.1,
            nameTextStyle: {
                fontSize: 15,
                fontWeight: 'bold'
            }
        },
        series: [
            {
                name: '',
                showSymbol: false,
                data: [[0, 0]],
                type: 'line',
                smooth: true,
            }
        ]
    }, true)
}

document.getElementById("plotbtn").onclick = function () {

    var r1 = parseFloat(document.getElementById("r1value").value)
    var r2 = parseFloat(document.getElementById("r2value").value)

    var name = "r1=" + r1 + "_r2=" + r2

    if (isNaN(r1) || isNaN(r2)) {
        return
    }
    if (r1 < 0 || r2 < 0) {
        return
    }

    for (var i = 0; i < series.length; i++) {
        if (series[i].name == name) {
            return
        }
    }

    data = []
    if (r1 == r2 && r1 == 0) {
        name = "r1=0_r2=0"
        data = [[0, 0.5], [1, 0.5]]
    }
    else if (r1 == r2 && r1 == 1) {
        name = "r1=1_r2=1"
        data = [[0, 0], [1, 1]]
    }
    else {
        var F1 = 0
        for (var f1 = 0; f1 < 1.001; f1 += 0.001) {
            F1 = getF1(r1, r2, f1)
            var df = new Intl.NumberFormat('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
            f1 = parseFloat(df.format(f1));
            data.push([f1, F1])
        }
    }

    data_ = {
        "name": name,
        "showSymbol": false,
        "data": data,
        "type": "line",
        "smooth": true,
        "itemStyle": {
            "normal": {
                "lineStyle": {
                    "width": 2,
                    "type": "solid"
                }
            }
        }
    }
    series.push(data_)

    var myChart = echarts.init(document.getElementById('container'));
    if(name == "r1=r2=0"){
        myChart.setOption(option = {
            xAxis: {
                max: 1.0,
                min: 0.0
            },
            yAxis: {
                max: 1.0,
                min: 0.0
            },
            series: series
        }, false)
    }else{
        myChart.setOption({
            series: series
        }, false)
    }
}

// F1 =  ((r1 * f1 * f1) + (f1 * f2) / ((r1 * f1 * f1) + (2 * f1 * f2) + (r2 * f2 * f2)));
function getF1(r1, r2, f1) {
    let F1;
    if (r1 === 1 && r1 === r2) {
        F1 = f1;
    } else if (r1 * r2 === 1 && r1 !== r2) {
        F1 = (r1 * f1) / (r1 * f1 + (1 - f1));
    } else if (r1 === r2 && r1 === 0) {
        F1 = 0.5;
    } else if (r1 > 0 && r2 === 0) {
        F1 = ((r1 * f1) + (1 - f1)) / ((r1 * f1) + 2 * (1 - f1));
    } else {
        F1 = ((r1 * f1 * f1) + (f1 * (1 - f1))) / ((r1 * f1 * f1) + (2 * f1 * (1 - f1)) + (r2 * (1 - f1) * (1 - f1)));
    }

    let df = new Intl.NumberFormat('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
    return parseFloat(df.format(F1));
}
