require.config({
    shim: {
        'bmap_api': {
            deps: ['jquery'],
            exports: 'bmap_api'
        }
    },
    baseUrl: "js",
    paths: {
        // 注意这里别写错了
        async: "requirejs/async",
        json: "requirejs/json",
        text: "requirejs/text",
        jquery: "https://cdn.bootcss.com/jquery/3.2.1/jquery.min",
        echarts: "echarts/echarts.min",
        bmap: "https://cdn.bootcss.com/echarts/3.6.2/extension/bmap.min",
        bmap_api: "http://api.map.baidu.com/api?v=2.0&ak=cvENTqYHfb5sLjXMQ4yWHKIPmx38ACs3",
        map_sh: "map/shanghai",
        map_china: "map/china",
        app: "app/app"
    },
    waitSeconds: 60

});

require(["app"], function(app) {

    app.run();

});
