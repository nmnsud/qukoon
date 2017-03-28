(function (resizers) {
	var resizingPanel, resizer;
	window.addEventListener('mouseup', function () {
		if (resizingPanel) {
			resizingPanel = false;
		}
	});
	resizers.each(function (count, node) {
		node.addEventListener('mousedown', function () {
			var $parent = $(this).parent();
			resizingPanel = $parent;
			resizer = this;
		});
	});
	window.addEventListener('mousemove', function () {
		var curX = event.pageX;
		var curY = event.pageY;
		if (resizingPanel) {
			if (true) {
				var offsetLeft = resizingPanel.offset().left;
				if (resizingPanel.hasClass('left') || resizingPanel.hasClass('main')) {
					if (resizingPanel.width() <= 280 || resizingPanel.hasClass('main')) {
						resizingPanel.css({
							width: curX - (offsetLeft - 2)
						});
					} else {
						resizingPanel.css({
							width: 280
						})
					}
				}
				if (resizingPanel.hasClass('top') || resizingPanel.hasClass('bottom') || resizer.getAttribute('dir') == 'y') {
					resizingPanel.css({
						height: curY
					});
				}
			}
		}
	});
})($('panel-resizer'));