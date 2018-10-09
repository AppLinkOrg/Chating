$(function () {
    'use strict'
    var bodyheight = $("#bodycontent").height() - 51;
    $("#map").height(bodyheight);
    var map = new AMap.Map('map', {
        zoom: 12,//级别
        center: [114.061882, 22.534653],//中心点坐标
        viewMode: '3D'//使用3D视图
    });
    AMap.plugin([
        'AMap.ToolBar',
        'AMap.Scale',
        'AMap.OverView',
        'AMap.MapType',
        'AMap.Geolocation'
    ], function () {
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        map.addControl(new AMap.ToolBar());
        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
        map.addControl(new AMap.Scale());
        // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
        map.addControl(new AMap.OverView({ isOpen: true }));
        // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
        map.addControl(new AMap.MapType());
        // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
        map.addControl(new AMap.Geolocation());
    });

    var stataapi = new StataApi();
    var icons = [];
    icons.push("http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/aze/resource/296bd3a9d35b091c88e327d17333127f_18091920033.png");
    icons.push("http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/aze/resource/8a2b426439ca91e3ccf05334d7b250c2_18091920021.png");
    icons.push("http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/aze/resource/ba62463512a1279b9d590faf456ba1e7_18091920013.png");
    icons.push("http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/aze/resource/c7e6f98fd3908fa4c3d7e5b1bdbda502_18091920003.png");


    stataapi.dashboard({}, (ret) => {
        var objects = ret.objects;
        var markers = [];
        for (var i = 0; i < objects.length; i++) {
            var zoomStyleMapping1 = {
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: 0,
                11: 0,
                12: 0,
                13: 0,
                14: 0,
                15: 0,
                16: 0,
                17: 0,
                18: 0,
                19: 0,
                20: 0
            };
            var imgurl=icons[objects[i].index % 4];
            //console.log(objects[i]);
            var position=new AMap.LngLat(parseFloat(objects[i].lng), parseFloat(objects[i].lat));
            var icon = new AMap.Icon({
                size: new AMap.Size(50, 50),    // 图标尺寸
                image: icons[objects[i].index % 4],  // Icon的图像
                imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
                imageSize: new AMap.Size(50, 50)   // 根据所设置的大小拉伸或压缩图片
            });
            
            var marker = new AMap.ElasticMarker({
                position:position,
                zooms:[12,20],
                styles:[{
                        icon:{
                            img:imgurl,
                            size:[30,30],//可见区域的大小
                            ancher:[8,16],//锚点
                            fitZoom:12,//最合适的级别
                            scaleFactor:10,//地图放大一级的缩放比例系数
                            maxScale:2,//最大放大比例
                            minScale:0.125//最小放大比例
                        }
                    }],
                zoomStyleMapping:zoomStyleMapping1,
                clickable:true
            });
            marker.on('click', function(ev) {
                
                var target = ev.target;// 触发事件的对象
                var lnglat = ev.lnglat;// 触发事件的地理坐标，AMap.LngLat 类型
                var pixel = ev.pixel;// 触发事件的像素坐标，AMap.Pixel 类型
                var type = ev.type;// 触发事件类型
                $("#modal-default").modal("show");
                
              });
            markers.push(marker);
        }
        //alert(markers.length);
        map.add(markers);
    });
})
