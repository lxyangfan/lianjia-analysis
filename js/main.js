require.config({
  baseUrl : "js",
  paths : {
    jquery : "https://cdn.bootcss.com/jquery/3.2.1/jquery.min",
    echarts : "https://cdn.bootcss.com/echarts/3.6.2/echarts.min",
    map_sh: "map/shanghai",
    map_china: "map/china",
  },
    waitSeconds: 10

});

require([ 'jquery', 'echarts', 'map_china'], function($, echarts, map_china) {

  console.log("Hello here")

  $(document).ready(function(){

    var chart = echarts.init(document.getElementById('mapChart'));
    var option = {
            geo: {
                  map: 'china'
              }
          }
    chart.setOption(option);
    console.log("Load Finished here");
  });

});
