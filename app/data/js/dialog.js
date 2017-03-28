(function (g, w, p) {
	g[p] = w();
})(window, function () {
	var list;
	function startOverlay(win) {
		var overlay = $('<div class="window_backlay"></div>');
		$('body').append(overlay);
		overlay.on('mousedown', function () {
			win.focus();
		});
		return overlay;
	}
	var __private = {};

	__private.dialog = function (name) {
		this.__name = name;
	}

	__private.dialog.prototype.onLoaded = function (f) {
		if ('function' != typeof f) {
			this.__action = f;
		}
	}

	__private.dialog.prototype.build = function () {
		if (typeof this.__name == 'string') {
			var act = this.__action;
			var obj = Util.loadJson(this.__name + '_dialog');
			if (typeof obj.url == 'string') {
				this.__url = obj.url;
				if (typeof obj.window == 'object') {
					var w = obj.window;
					w['show'] = false;
					var isUrgent = obj.urgent;
					var overlay;
					var win = new remote.BrowserWindow(w);
					list = win;
					win.loadURL(__dirname + '\\html\\' + obj.url);
					win.setMenuBarVisibility(false);
					win.once('ready-to-show', function () {
						win.show();
						if (isUrgent) {
							overlay = startOverlay(win); 
						}
						if (typeof act == 'function') {
								act();
						}
					});
					win.on('close', function () {
						if (overlay[0]) {
							overlay[0].remove();
						}
						list = undefined;
						win.destroy();
					});
					this.__win = win;
				}
			}
		}
		return win;
	}
	return __private.dialog;
}, 'WindowManager');