$(document).ready(function(){

var placeid = "";
var seoulMapWidth = 600;
var seoulMapHeight = 600;
var initialScale = 65000;
var initialX = seoulMapWidth/2+5;
var initialY = seoulMapHeight/2-30;
var centerX = 126.9895;
var centerY = 37.5651;
var mapSvg = d3.select("#mapShow").append("svg")
    .attr("width", seoulMapWidth)
    .attr("height", seoulMapHeight)
    .attr("id", "seoulMap");
var placeProjection, placePath, placeMap,
    seoulProjection, seoulPath, seoulMap,
    seoulPolitanProjection, seoulPolitanPath, seoulPolitanMap,
    riverProjection, riverPath, riverMap,
    lineProjection,  linePath,  lineMap;
var zoom;

function  displaySeoulMap(){
seoulPolitanMap = mapSvg.append("g").attr("id", "politan");
seoulMap = mapSvg.append("g").attr("id", "maps");
riverMap = mapSvg.append("g").attr("id", "river");
lineMap  = mapSvg.append("g").attr("id", "line");
placeMap = mapSvg.append("g").attr("id", "places");
riverProjection = d3.geo.mercator().center([centerX, centerY]).scale(initialScale)
    .translate([initialX, initialY]);
seoulPolitanProjection = d3.geo.mercator().center([centerX, centerY]).scale(initialScale)
    .translate([initialX, initialY]);
seoulProjection = d3.geo.mercator().center([centerX, centerY]).scale(initialScale)
    .translate([initialX, initialY]);
lineProjection  = d3.geo.mercator().center([centerX, centerY]).scale(initialScale)
    .translate([initialX, initialY]);
placeProjection = d3.geo.mercator().center([centerX, centerY]).scale(initialScale)
    .translate([initialX, initialY]);
riverPath = d3.geo.path().projection(riverProjection);
seoulPolitanPath = d3.geo.path().projection(seoulPolitanProjection);
seoulPath = d3.geo.path().projection(seoulProjection);
linePath  = d3.geo.path().projection(lineProjection);
placePath = d3.geo.path().projection(placeProjection);


// zoom and pan //
//줌기능탑재
zoom = d3.behavior.zoom()
	.center(null) /* zoom에서 center를 지정하지 않으면 즉, 값을 null로 하면 마우스가 있는 곳에서 확대, 축소 함 */
	.size([seoulMapWidth, seoulMapHeight])
	.scaleExtent([1, 10]) /* [0.5, 5] 확대 및 축소 범위 지정 */
    .on("zoom", function()
     { riverMap.attr("transform","translate("+ d3.event.translate + ")scale(" + d3.event.scale + ")");
       seoulPolitanMap.attr("transform","translate("+ d3.event.translate + ")scale(" + d3.event.scale + ")");
       seoulMap.attr("transform","translate("+ d3.event.translate + ")scale(" + d3.event.scale + ")");
       lineMap.attr("transform","translate("+ d3.event.translate + ")scale(" + d3.event.scale + ")");
       placeMap.attr("transform","translate("+ d3.event.translate + ")scale(" + d3.event.scale + ")");
     });
riverMap.call(zoom).call(zoom.event);
seoulPolitanMap.call(zoom).call(zoom.event);
seoulMap.call(zoom).call(zoom.event);
lineMap.call(zoom).call(zoom.event);
placeMap.call(zoom).call(zoom.event);
// zoom and pan //


//서울특별시 주변에 있는 지역들을 대충 시각화 해주는 코드
//딱히 필요없을듯..?

/*

d3.json("./seoulpolitan.json", function(json)
{ seoulPolitanMap.selectAll("path")
          .data(json.features).enter().append("path")
          .attr("d", seoulPolitanPath);
});

*/

//아래부터는 서울시 내에 있는 구의 이름을 명시해주는 명령어인듯

d3.json("./seoul.json", function(error, data)
{ var features = topojson.feature(data, data.objects.seoul_municipalities_geo).features;
  seoulMap.selectAll("path")
          .data(features).enter().append("path")
          .attr("class", function(d) { /* console.log(); */ return "municipality c" + d.properties.code })
          .attr("d", seoulPath);
  seoulMap.selectAll("text")
          .data(features).enter().append("text")
          .attr("transform", function(d) { return "translate(" + placePath.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .attr("class", "municipality-label")
          .text(function(d) { return d.properties.name; });
});

}
/* ------------------------------------------------------------------------ */


displaySeoulMap();

$( document )
 .on( "mouseenter", ".placeCircle", function()
  { placeid = $(this).attr('id')+"name";
    $(this).css({"fill" : "#ff0000"});
    $("#"+placeid).css({"display" : "block"}); 
  })
 .on( "mouseleave", ".placeCircle", function()
  { placeid = $(this).attr('id')+"name";
    $(this).css({"fill" : "#ffff00"});
    $("#"+placeid).css({"display" : "none"}); 
  })
 .on( "mouseenter", "#seoulMap #line path", function()
  { $(this).css({"stroke-width" : "6px", "opacity": "1"});
  })
 .on( "mouseleave", "#seoulMap #line path", function()
  { $(this).css({"stroke-width" : "2px", "opacity": "0.5"});
  });


});
