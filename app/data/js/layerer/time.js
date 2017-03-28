(function () {
	if (Layerer) {
		var s = $('#layrer_timescale');
		var count = -1;
		var count2 = 0
		var h = 50;
		s[0].innerHTML = '';
		while (h < document.body.clientWidth) {
			var m = $('<div class="layrer_timeholder"></div>');
			if (count > -1) {
				m.text(count);
			}
			s.append(m);
			h += 50;
			count++;
			count2++;
		}
		Layerer.scaleWidth = Layerer.view.width() / count2;
		console.log(Layerer.scaleWidth, count2, Layerer.view.width());
		if ('function' == typeof Layerer.updateCursor) {
			Layerer.updateCursor(Layerer.scaleWidth);
		}
		function resetTimeScroll() {
			Layerer.scrollLength = $('#layrer_view').offset().left - Layerer.scroll;
			Layerer.view.css({
				left: $('#layrer_view').offset().left - Layerer.scroll
			});
			Layerer.cursor.css({
				left: $('#layrer_cursor').offset().left - Layerer.scroll
			});
		}
		if (!Layerer['resetTimeScroll']) {
			Layerer['resetTimeScroll'] = resetTimeScroll;
		}
	}
})();