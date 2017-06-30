define(['jquery', 'echarts', 'bmap',
    'async!bmap_api', // 异步加载处理百度api
    'map_sh',
    'json!../data/price_location-2017-06-30.json' // 加载json格式数据
], function($, echarts, bmap, bmap_api, map_sh,
    props
) {

    function run() {
        console.log("各位观众");
        $(document).ready(function() {
            console.log("大家好");
            console.log(props);
            dd = props.map(function(e, i){
                o = {};
                value = [];
                value[0] = e["lng"];
                value[1] = e["lat"];
                value[2] = e["unit_price"];
                o.name = e["town"];
                o.value = value;
                return o;
            });

            console.debug(dd);

            var bmapChart = echarts.init(document.getElementById('map-wrap'));
            var myData = [{
                name: '海门',
                value: [121.15, 31.89, 90]
            }, {
                name: '鄂尔多斯',
                value: [109.781327, 39.608266, 120]
            }, {
                name: '招远',
                value: [120.38, 37.35, 142]
            }, {
                name: '舟山',
                value: [122.207216, 29.985295, 123]
            }, ]

            var option = {
                bmap: {
                    center: [121.452058472, 31.2294031411],
                    zoom: 10,
                    roam: true,
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
                        color: '#fff'
                    }
                },
                series: [
                {
                    name: '销量', // series名称
                    type: 'scatter', // series图表类型
                    coordinateSystem: 'bmap', // series坐标系类型
                    data: dd
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
        });

    }

    return {
        run: run
    }

});
