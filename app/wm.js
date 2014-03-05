function WindowManager() {

    var window = [];

    this.add = function(id) {
        window.push(id);
    };

    this.toggleWindow = function(id, callback) {
        isSlidebarVisible = false;
        slidebars.close();
        if ($(window[id]).is(':visible')) {
            blocked = false;
            $(window[id]).fadeOut('slow');
        }
        else {
            var showed = false;
            for (w in window) {
                if (!showed && id != w && $(window[w]).is(':visible')) {
                    $(window[w]).fadeOut('slow', function() {
                        $(window[id]).fadeIn('slow');
                        showed = true;
                    });
                }
            }
            if (!showed)
                $(window[id]).fadeIn('slow');
            blocked = true;
            if (callback != undefined)
                callback();
        }
    };

    this.hideAll = function() {
        for (w in window) {
            if ($(window[w]).is(':visible')) {
                $(window[w]).fadeOut('slow');
            }
        }
        blocked = false;
    };

}