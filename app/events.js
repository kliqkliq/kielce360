function setEvents() {

//    var element = document.getElementById("container"); 

    window.addEventListener('resize', panoramaView.onWindowResize, false);
// mouse events
    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseup', onMouseUpTouchEnd, false);
    document.addEventListener('mousewheel', onMouseWheel, false);
    document.addEventListener('DOMMouseScroll', onMouseWheel, false);
// touch events
    document.addEventListener('touchstart', onTouchStart, false);
    document.addEventListener('touchmove', onTouchMove, false);
    document.addEventListener('touchend', onMouseUpTouchEnd, false);
//    document.addEventListener('gestureend', onGestureEnd, false);

    function onMouseDown(event) {

        if (!blocked) {
            panoramaView.startInteraction(event.clientX, event.clientY);
            event.preventDefault();
        }
        onMouseDownTouchStart();
    }

    function onMouseMove(event) {

        if (!blocked && panoramaView.getInteractionStatus())
            panoramaView.setRotation(event.clientX, event.clientY, 0.1);
    }

    function onMouseUpTouchEnd(event) {

        isScaling = false;
        if (!blocked)
            panoramaView.stopInteraction();
    }

    function onMouseWheel(event) {

        if (!blocked) {

            var fov = panoramaView.getFov();
            // WebKit
            if (event.wheelDeltaY)
                fov -= event.wheelDeltaY * 0.05;
            // Opera & IE9
            else if (event.wheelDelta)
                fov -= event.wheelDelta * 0.5;
            // Mozilla
            else if (event.detail)
                fov += event.detail * 1.0;
            panoramaView.changePerpsective(fov);
        }
    }

    function onTouchStart(event) {

        if (!blocked) {
            if (event.touches.length == 1)
                panoramaView.startInteraction(event.touches[ 0 ].pageX, event.touches[ 0 ].pageY);
            else if (event.touches.length == 2) {
                var x1 = event.touches[ 0 ].pageX;
                var y1 = event.touches[ 0 ].pageY;
                var x2 = event.touches[ 1 ].pageX;
                var y2 = event.touches[ 1 ].pageY;
                startScalingDistance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
                isScaling = true;
            }
        }
        onMouseDownTouchStart();
    }

    function onTouchMove(event) {

        if (!blocked) {
            if (event.touches.length == 1 && panoramaView.getInteractionStatus()) {
                event.preventDefault();
                panoramaView.setRotation(event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, 0.3);
            }
            else if (event.touches.length == 2 && isScaling) {
                event.preventDefault();
                var x1 = event.touches[ 0 ].pageX;
                var y1 = event.touches[ 0 ].pageY;
                var x2 = event.touches[ 1 ].pageX;
                var y2 = event.touches[ 1 ].pageY;
                var scalingDistance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
                var fov = panoramaView.getFov();
                fov += (startScalingDistance - scalingDistance) / 100;
                panoramaView.changePerpsective(fov);
            }
        }
    }

    function onGestureEnd(event) {

        if (!blocked) {
            event.preventDefault();
            var fov = event.scale * panoramaView.getFov();
            panoramaView.changePerpsective(fov);
        }
    }

    function onMouseDownTouchStart() {

//        if (isSlidebarVisible) {
//            isSlidebarVisible = false;
//            slidebars.close();
//        }
//        windowManager.hideAll();
//        $('#info').hide();
//        $('#photo').hide();

    }
}