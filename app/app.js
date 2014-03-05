window.onload = function() {
    if (webgl) {
        panoramaView = new Engine360("#container");
        panoramaView.setLoadingContainer('#loading-window');
        panoramaView.onPortalEnter(onPortalEnter);
        panoramaView.start();
        setEvents();
        setProjectionUI();
    }
    getLocations();
}

function onPortalEnter(panoramaID) {
    var locationIndex = panoramaMap[panoramaID][0];
    var panoramaIndex = panoramaMap[panoramaID][1];
    loadPanoramaCore(locationIndex, panoramaIndex);
}

function loadPanorama(element2hide, locationIndex, panoramaIndex) {

    if (!webgl)
        return;

    if (!$('#splash').is(':hidden'))
        $('#splash').fadeOut('slow');

    $('#' + element2hide).fadeOut('slow', function() {
        loadPanoramaCore(locationIndex, panoramaIndex);
    });
}

function loadPanoramaCore(locationIndex, panoramaIndex) {
    blocked = false;
    
    if (isSlidebarVisible) {
        isSlidebarVisible = false;
        slidebars.close();
    }
    
    var location = locations[locationIndex];
    var panorama = location.panorama[panoramaIndex];

    var fileName = 'data/' + location.file_name + '-' + panorama.file_id;
    var previewURL = fileName + '.small.jpg';
    var panoramaURL = fileName + '.4096.jpg';

    $('#location-name').text(location.full_name);
    if (location.panorama.length > 1)
        $('#panorama-index').text((parseInt(panorama.file_id) + 1) + '/' + location.panorama.length);

    panoramaView.loadPanorama(previewURL, panoramaURL, panorama.portal);
    miniMapCenter = new google.maps.LatLng(location.lat, location.lon);
    google.maps.event.trigger(miniMap, 'resize');

    if (currentMarker) {
        marker[currentMarker].setIcon(markerImage);
        markerMini[currentMarker].setIcon(markerImage);
    }
    currentMarker = locationIndex;
    marker[currentMarker].setIcon(currentMarkerImage);
    markerMini[currentMarker].setIcon(currentMarkerImage);
    miniMap.setCenter(miniMapCenter);
}

function getLocations() {
    $.getJSON("http://kielce360.pl/api/locations", function(json) {
        locations = json.location;
        addLocations();
    });
}