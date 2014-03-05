function setProjectionUI() {

    $('#fovstatus').text(panoramaView.getFov());

    $('#distortion-switch').click(function() {
        if (panoramaView.getDistortionStatus()) {
            panoramaView.disableDistortion();
            switchState('#distortion-switch', false);
        }
        else {
            panoramaView.enableDistortion();
            switchState('#distortion-switch', true);
        }
    });

    $('#autorotate-switch').click(function() {
        if (panoramaView.getAutorotateStatus()) {
            panoramaView.disableAutorotate();
            switchState('#autorotate-switch', false);
        }
        else {
            panoramaView.enableAutorotate();
            switchState('#autorotate-switch', true);
        }
    });
}

slidebars = new $.slidebars({
    siteClose: false
});
windowManager = new WindowManager();
windowManager.add('#locations');
windowManager.add('#map');
windowManager.add('#about-project');
windowManager.add('#gallery');

// events

$('#menu-item-slidebar').on('click', function(e) {
    e.preventDefault();
    if (isSlidebarVisible) {
        isSlidebarVisible = false;
        slidebars.close();
    }
    else {
        isSlidebarVisible = true;
        slidebars.open('left');
    }

});

// functions

function switchState(id, state) {
    var s1, s2;
    if (state) {
        s1 = 'off';
        s2 = 'on';
    }
    else {
        s1 = 'on';
        s2 = 'off';
    }
    $(id + ' .switch').removeClass('switch-' + s1).addClass('switch-' + s2);
}

function toggleLocationList() {
    windowManager.toggleWindow(0);
}

function toggleMiniMap() {

    if ($('#mini-map').is(':visible')) {
        switchState('#minimap-switch', false);
        $("#mini-map").fadeOut('slow');
    }
    else {
        switchState('#minimap-switch', true);
        $("#mini-map").fadeIn('slow');
        google.maps.event.trigger(miniMap, 'resize');
        if (miniMapCenter)
            miniMap.setCenter(miniMapCenter);
    }
}

function toggleMenu() {

    if ($('#menu').is(':visible')) {
        switchState('#info-switch', false);
        $("#menu").fadeOut('slow');
    }
    else {
        switchState('#info-switch', true);
        $("#menu").fadeIn('slow');
    }
}

function toggleAboutWindow() {
    windowManager.toggleWindow(2);
}

function toggleGalleryWindow() {
    windowManager.toggleWindow(3);
}

function toggleMapWindow() {
    windowManager.toggleWindow(1, function() {
        google.maps.event.trigger(map, 'resize');
        if (!mapInited)
            initMap();
    });
}

function initMap() {
    google.maps.event.trigger(map, 'resize');
    map.setCenter(new google.maps.LatLng(centerLan, centerLon));
    mapInited = false;
}

function addLocations() {

    var locationsTable = '<table><tr><td>#</td><td>nazwa lokalizacji</td><td>ilość panoram</td><td>data wykonania</td></tr>';
    var gallery = "";

    for (locationIndex in locations) {

        var currentLocation = locations[locationIndex];

        for (panoramaIndex in currentLocation.panorama) {

            var currentPanorama = currentLocation.panorama[panoramaIndex];
            panoramaMap[currentPanorama.id] = [locationIndex, panoramaIndex];
            
            gallery += '<div class="panorama-box">';
            gallery += '<img onclick="loadPanorama(\'gallery\',\'' + locationIndex + '\',' + panoramaIndex + ')" src="data/' + currentLocation.file_name + '-' + currentPanorama.file_id + '.small.jpg">';
            gallery += '<div class="location-name">' + currentLocation.full_name + '</div>';
            gallery += '</div>';

            locationsTable += '<tr onclick="loadPanorama(\'locations\',\'' + locationIndex + '\',' + panoramaIndex + ')">';
            locationsTable += '<td>' + (parseInt(locationIndex) + 1) + '</td>';
            locationsTable += '<td class="location-name">' + currentLocation.full_name + '</td>';
            locationsTable += '<td>' + currentLocation.panorama.length + '</td>';
            locationsTable += '<td>' + currentLocation.date + '</td>';
            locationsTable += '</tr>';
        }

        marker[locationIndex] = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(currentLocation.lat, currentLocation.lon),
            title: currentLocation.full_name,
            icon: markerImage,
            animation: google.maps.Animation.DROP,
            id: locationIndex
        });

        markerMini[locationIndex] = new google.maps.Marker({
            map: miniMap,
            position: new google.maps.LatLng(currentLocation.lat, currentLocation.lon),
            title: currentLocation.full_name,
            icon: markerImage
        });

        google.maps.event.addListener(marker[locationIndex], 'click', function() {
            loadPanorama('map', this.id, 0);
        });

    }
    locationsTable += '</table>';
    $("#locations").append(locationsTable);
    $("#gallery").append(gallery);
}

//function saveCanvas() {
//    var dataURL = renderer.domElement.toDataURL('image/png');
//    var w = window.open('about:blank');
//    w.document.write("<img src='" + dataURL + "' alt='image from panorama'/>");
//}