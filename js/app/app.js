define([ 'jquery', 'echarts', 'bmap', 'async!bmap_api', 'map_sh',
		'json!../data/props.json'
	], function($, echarts, bmap, bmap_api, map_sh, props) {

  function run() {
	  console.log("各位观众");
	  $(document).ready(function(){
		  console.log("大家好");
		  console.log(props);

		    var bmapChart = echarts.init(document.getElementById('map-wrap'));
		         var myData = [
		              {name: '海门', value: [121.15, 31.89, 90]},
		              {name: '鄂尔多斯', value: [109.781327, 39.608266, 120]},
		              {name: '招远', value: [120.38, 37.35, 142]},
		              {name: '舟山', value: [122.207216, 29.985295, 123]},
		          ]

		        var option = {
		                bmap: {
		                  center: [121.5883, 31.1902873],
		                  zoom: 14,
		                  roam: true,
		              },
		              visualMap: { // 视觉映射组件
		                type: 'continuous',
		                min: 0,
		                max: 200,
		                calculable: true,
		                inRange: {
		                          color: ['#50a3ba','#eac736','#d94e5d']
		                      },
		                textStyle: {
		                  color: '#fff'
		                }
		              }
		          };

		        bmapChart.setOption(option);
		  });

  }

  return {
    run: run
  }

});
