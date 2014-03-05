var mapOptions = {
  scaleControl: true,
  center: new google.maps.LatLng(centerLan, centerLon),
  zoom: 14,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};

var miniMapOptions = {
  scaleControl: false,
  center: new google.maps.LatLng(centerLan, centerLon),
  zoom: 15,
  mapTypeId: google.maps.MapTypeId.SATELLITE
};

var miniMap = new google.maps.Map(document.getElementById('mini-map'), miniMapOptions);
var map = new google.maps.Map(document.getElementById('map'), mapOptions);
