var dom = document.getElementById('container');
var myChart = echarts.init(dom, 'light', {
    renderer: 'canvas',
    useDirtyRect: false,
    // width: 300,
    // height: 300
});

var app = {};
var option;

option = {
    title: {
        text: 'Copolymer Composition Curve',
        left: 'center',
        top: 10,
    },
    legend: {
        itemHeight: 0,
        itemGap: 10,
        bottom: 5,
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
        max: 1.0,
        min: 0.0,
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
        max: 1.0,
        min: 0.0,
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
};

if (option && typeof option === 'object') {
    myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);
