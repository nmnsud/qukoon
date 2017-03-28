(function () {
	if (Layerer) {
		window.addEventListener('resize', function () {
			Layerer.resetTimeScroll();
		});
		$('#layrer_scroll')[0].addEventListener('mousewheel', function(e){
		    isUp = e.wheelDelta < 0 ? false : true;
		    if (isUp) {
		    	Layerer.scroll = -20;
		    } else {
		    	Layerer.scroll = 20;
		    }
		    Layerer.resetTimeScroll();
		});
	}
})();