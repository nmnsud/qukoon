var Layerer = Layerer || {};
(function () {
	var isAdjusting = false;
	function update_cursor(x) {
		Layerer.cursorX = x;
		Layerer.cursor.css({
			left: x
		});
		if (Layerer.cursor.offset().left <= ((Layerer.scaleWidth) + Layerer.scrollLength)) {
			Layerer.cursorX = Layerer.scaleWidth + Layerer.scrollLength;
			Layerer.cursor.css({
				left: Layerer.scaleWidth + Layerer.scrollLength
			});
		}
		if (Layerer.cursor.offset().left >= Layerer.view.width() + Layerer.scrollLength) {
			Layerer.cursor.css({
				left: Layerer.view.width() + Layerer.scrollLength
			});
			return false;
		}
		return true;
	}
	Layerer.updateCursor = function (x) {
		return update_cursor(x);
	}
	Layerer.increaseCursor = function (delta) {
		var x = Layerer.cursorX + delta;
		return update_cursor(x);
	}
	Layerer.view[0].addEventListener('mousedown', function (e) {
		if (!Layerer.dragging && !Layerer.isPlaying) {
			if (e.pageX >= (Layerer.scaleWidth + Layerer.scrollLength)) {
				isAdjusting = true;
				Layerer.cursorX = e.pageX;
				Layerer.cursor.css({
					left: e.pageX
				});
			}
		}
	});
	window.addEventListener('mouseup', function (e) {
		isAdjusting = false;
	});
	window.addEventListener('mousemove', function (e) {
		if (isAdjusting) {
			update_cursor(e.pageX);
		}
	});
	update_cursor(Layerer.scaleWidth * 2);
})();