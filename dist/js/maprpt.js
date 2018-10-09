$(document).ready(function () {
    var data = [];
    var tday = 24 * 6 * 3;
    var timestart = new Date().getTime() - 60 * 1000 * 10 * tday;

    for (var i = 0; i < tday; i++) {
        data.push([timestart + 60 * 1000 * 10 * i, i + (Math.random() * 100)]);
    }
    if($("#p1").length>0){
        
    var chart = Highcharts.chart('p1', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: '污染物数据历史走势图'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                '鼠标拖动可以进行缩放' : '手势操作进行缩放'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        tooltip: {
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%Y-%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        yAxis: {
            title: {
                text: 'TPS'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: [{
            type: 'area',
            name: 'TPS',
            data: data
        }]
    });
}




if($("#p2").length>0){

    Highcharts.data({
        csv: document.getElementById('p2tsv').innerHTML,
        itemDelimiter: '\t',
        parsed: function (columns) {
            var brands = {},
                brandsData = [],
                versions = {},
                drilldownSeries = [];
            // 解析百分比字符串
            columns[1] = Highcharts.map(columns[1], function (value) {
                if (value.indexOf('%') === value.length - 1) {
                    value = parseFloat(value);
                }
                return value;
            });
            $.each(columns[0], function (i, name) {
                var brand,
                    version;
                if (i > 0) {
                    // Remove special edition notes
                    name = name.split(' -')[0];
                    // 拆分
                    version = name.match(/([0-9]+[\.0-9x]*)/);
                    if (version) {
                        version = version[0];
                    }
                    brand = name.replace(version, '');
                    //创建主数据
                    if (!brands[brand]) {
                        brands[brand] = columns[1][i];
                    } else {
                        brands[brand] += columns[1][i];
                    }
                    // 创建版本数据
                    if (version !== null) {
                        if (!versions[brand]) {
                            versions[brand] = [];
                        }
                        versions[brand].push(['v' + version, columns[1][i]]);
                    }
                }
            });
            $.each(brands, function (name, y) {
                brandsData.push({
                    name: name,
                    y: y,
                    drilldown: versions[name] ? name : null
                });
            });
            $.each(versions, function (key, value) {
                drilldownSeries.push({
                    name: key,
                    id: key,
                    data: value
                });
            });
            // 创建图例
            var chart = Highcharts.chart('p2', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: '大气污染物组成实时数据'
                },
                subtitle: {
                    text: '单击每个污染物种类获取具体组成'
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },
                series: [{
                    name: '类型',
                    colorByPoint: true,
                    data: brandsData
                }],
                drilldown: {
                    series: drilldownSeries
                }
            });
        }
    });
}





if($("#p3").length>0){
    var chart = Highcharts.chart('p3', {
        chart: {
            polar: true,
            type: 'line'
        },
        title: {
            text: '污染来源预测',
            x: -80
        },
        pane: {
            size: '80%'
        },
        xAxis: {
            categories: ['工厂排放', '汽车尾气', '农垦烧荒', '森林失火',
                '炊烟', '尘土'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical'
        },
        series: [{
            name: '预算拨款',
            data: [72, 54, 18, 32, 45, 67],
            pointPlacement: 'on'
        }]
    });

}


if($("#p4").length>0){


    var categories = ['SO2', 'PM25', 'PM10', 'CO',
        'NO', 'TPS', 'O3', 'SO2', 'PM25', 'PM10', 'CO',
        'NO', 'TPS', 'O3',
        'SO2', 'PM25', 'PM10', 'CO',
        'NO', 'TPS', 'O3'];
    var chart = Highcharts.chart('p4', {
        chart: {
            type: 'bar'
        },
        title: {
            text: '污染物浓度同期比较'
        },
        subtitle: {
            useHTML: true,
            text: '本月于上月数据同步对比'
        },
        xAxis: [{
            categories: categories,
            reversed: false,
            labels: {
                step: 1
            }
        }, {
            // 显示在右侧的镜像 xAxis （通过 linkedTo 与第一个 xAxis 关联）
            opposite: true,
            reversed: false,
            categories: categories,
            linkedTo: 0,
            labels: {
                step: 1
            }
        }],
        yAxis: {
            title: {
                text: null
            },
            labels: {
                formatter: function () {
                    return (Math.abs(this.value) / 1000000) + 'M';
                }
            },
            min: -4000000,
            max: 4000000
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                    '人口: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
            }
        },
        series: [{
            name: '本月',
            data: [-1746181, -1884428, -2089758, -2222362, -2537431, -2507081, -2443179,
            -2664537, -3556505, -3680231, -3143062, -2721122, -2229181, -2227768,
            -2176300, -1329968, -836804, -354784, -90569, -28367, -3878]
        }, {
            name: '上月',
            data: [1656154, 1787564, 1981671, 2108575, 2403438, 2366003, 2301402, 2519874,
                3360596, 3493473, 3050775, 2759560, 2304444, 2426504, 2568938, 1785638,
                1447162, 1005011, 330870, 130632, 21208]
        }]
    });
}
});