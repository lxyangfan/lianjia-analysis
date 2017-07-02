define(['jquery', 'echarts', 'bmap',
    'async!bmap_api', // 异步加载处理百度api
    'map_sh',
    'json!../data/price_location-2017-06-30.json', // 加载json格式数据,
    'json!../data/location_price-2017-06-30.json' // 加载json格式数据
], function($, echarts, bmap, bmap_api, map_sh,
    props,
    all_preowned_sales
) {

    function show_preowned_sales_map() {

        console.log("开始运行");
        $(document).ready(function() {
            console.log("DocumentReady...");

            dd = all_preowned_sales.map(function(e, i) {
                o = {};
                value = [];
                value[0] = e["lng"];
                value[1] = e["lat"];
                value[2] = e["unit_size"];
                o.name = e["addr"];
                o.value = value;
                return o;
            });
            $("#num").html(dd.length);

            console.debug("数据ready");


            var bmapChart = echarts.init(document.getElementById('map-wrap'));

            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: function(param) {
                        // 显示保留2位小数的房价
                        return param.name + ' : ' + Math.round(param.data.value[2] * 100) / 100 + ' 万/平';
                    }
                },
                bmap: {
                    center: [121.452058472, 31.2294031411],
                    zoom: 10,
                    roam: true,
                    mapStyle: {
                        styleJson: [{
                            'featureType': 'water',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'land',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#f3f3f3'
                            }
                        }, {
                            'featureType': 'railway',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'highway',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#fdfdfd'
                            }
                        }, {
                            'featureType': 'highway',
                            'elementType': 'labels',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'arterial',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#fefefe'
                            }
                        }, {
                            'featureType': 'arterial',
                            'elementType': 'geometry.fill',
                            'stylers': {
                                'color': '#fefefe'
                            }
                        }, {
                            'featureType': 'poi',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'green',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'subway',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'manmade',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'local',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'arterial',
                            'elementType': 'labels',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'boundary',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#fefefe'
                            }
                        }, {
                            'featureType': 'building',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'label',
                            'elementType': 'labels.text.fill',
                            'stylers': {
                                'color': '#999999'
                            }
                        }]
                    }
                },
                visualMap: { // 视觉映射组件
                    type: 'continuous',
                    min: 0,
                    max: 10,
                    calculable: true,
                    inRange: {
                        color: ['#50a3ba', '#eac736', '#d94e5d']
                    },
                    textStyle: {
                        color: '#000'
                    }
                },
                series: [{
                    name: '6月均价',
                    type: 'effectScatter',
                    coordinateSystem: 'bmap',
                    data: dd,
                    symbolSize: function(val) {
                        return val[2] * 1.3;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: function(param) {
                                // 显示保留2位小数的房价
                                return param.name + '' + Math.round(param.data.value[2] * 100) / 100 + '万';
                            },
                            position: 'top',
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'purple',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                }],
                mapStyle: { // 百度地图自定义样式
                    styleJson: [
                        // 陆地
                        {
                            "featureType": "land",
                            "elementType": "all",
                            "stylers": {
                                "color": "#073763"
                            }
                        },
                        // 水系
                        {
                            "featureType": "water",
                            "elementType": "all",
                            "stylers": {
                                "color": "#073763",
                                "lightness": -54
                            }
                        },
                        // 国道与高速
                        {
                            "featureType": "highway",
                            "elementType": "all",
                            "stylers": {
                                "color": "#45818e"
                            }
                        },
                        // 边界线
                        {
                            "featureType": "boundary",
                            "elementType": "all",
                            "stylers": {
                                "color": "#ffffff",
                                "lightness": -62,
                                "visibility": "on"
                            }
                        },
                        // 行政标注
                        {
                            "featureType": "label",
                            "elementType": "labels.text.fill",
                            "stylers": {
                                "color": "#ffffff",
                                "visibility": "on"
                            }
                        }, {
                            "featureType": "label",
                            "elementType": "labels.text.stroke",
                            "stylers": {
                                "color": "#444444",
                                "visibility": "on"
                            }
                        }
                    ]
                }
            };

            bmapChart.setOption(option);
            // var bmap = bmapChart.getModel().getComponent('bmap').getBMap(); // 百度地图实例
            // bmap.setMapStyle({ style: 'dark' });
        });

    }

    function run() {

        console.log("开始运行");
        $(document).ready(function() {
            console.log("DocumentReady...");

            dd = props.map(function(e, i) {
                o = {};
                value = [];
                value[0] = e["lng"];
                value[1] = e["lat"];
                value[2] = e["unit_price"];
                o.name = e["town"];
                o.value = value;
                return o;
            });

            console.debug("数据ready")

            var bmapChart = echarts.init(document.getElementById('map-wrap'));

            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: function(param) {
                        // 显示保留2位小数的房价
                        return param.name + ' : ' + Math.round(param.data.value[2] * 100) / 100 + ' 万/平';
                    }
                },
                bmap: {
                    center: [121.452058472, 31.2294031411],
                    zoom: 10,
                    roam: true,
                    mapStyle: {
                        styleJson: [{
                            'featureType': 'water',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'land',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#f3f3f3'
                            }
                        }, {
                            'featureType': 'railway',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'highway',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#fdfdfd'
                            }
                        }, {
                            'featureType': 'highway',
                            'elementType': 'labels',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'arterial',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#fefefe'
                            }
                        }, {
                            'featureType': 'arterial',
                            'elementType': 'geometry.fill',
                            'stylers': {
                                'color': '#fefefe'
                            }
                        }, {
                            'featureType': 'poi',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'green',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'subway',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'manmade',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'local',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'arterial',
                            'elementType': 'labels',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'boundary',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#fefefe'
                            }
                        }, {
                            'featureType': 'building',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'label',
                            'elementType': 'labels.text.fill',
                            'stylers': {
                                'color': '#999999'
                            }
                        }]
                    }
                },
                visualMap: { // 视觉映射组件
                    type: 'continuous',
                    min: 0,
                    max: 10,
                    calculable: true,
                    inRange: {
                        color: ['#50a3ba', '#eac736', '#d94e5d']
                    },
                    textStyle: {
                        color: '#000'
                    }
                },
                series: [{
                    name: '6月均价',
                    type: 'effectScatter',
                    coordinateSystem: 'bmap',
                    data: dd,
                    symbolSize: function(val) {
                        return val[2] * 1.3;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: function(param) {
                                // 显示保留2位小数的房价
                                return param.name + '' + Math.round(param.data.value[2] * 100) / 100 + '万';
                            },
                            position: 'top',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'purple',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                }],
                mapStyle: { // 百度地图自定义样式
                    styleJson: [
                        // 陆地
                        {
                            "featureType": "land",
                            "elementType": "all",
                            "stylers": {
                                "color": "#073763"
                            }
                        },
                        // 水系
                        {
                            "featureType": "water",
                            "elementType": "all",
                            "stylers": {
                                "color": "#073763",
                                "lightness": -54
                            }
                        },
                        // 国道与高速
                        {
                            "featureType": "highway",
                            "elementType": "all",
                            "stylers": {
                                "color": "#45818e"
                            }
                        },
                        // 边界线
                        {
                            "featureType": "boundary",
                            "elementType": "all",
                            "stylers": {
                                "color": "#ffffff",
                                "lightness": -62,
                                "visibility": "on"
                            }
                        },
                        // 行政标注
                        {
                            "featureType": "label",
                            "elementType": "labels.text.fill",
                            "stylers": {
                                "color": "#ffffff",
                                "visibility": "on"
                            }
                        }, {
                            "featureType": "label",
                            "elementType": "labels.text.stroke",
                            "stylers": {
                                "color": "#444444",
                                "visibility": "on"
                            }
                        }
                    ]
                }
            };

            bmapChart.setOption(option);
            // var bmap = bmapChart.getModel().getComponent('bmap').getBMap(); // 百度地图实例
            // bmap.setMapStyle({ style: 'dark' });
        });


    }

    return {
        run: run,
        show_preowned_sales_map: show_preowned_sales_map
    }

});
