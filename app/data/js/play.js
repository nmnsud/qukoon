(function (w, p) {
	w[p] = function (v) {
		var win = new remote.BrowserWindow({
			title: 'Player',
			width: 370,
			height: 120,
			show: false,
			minimizable: false,
			resizable: false
		});
		win.loadURL(__dirname + '\\html\\audplayer.html?d=' + v);
		win.setMenuBarVisibility(false);
		win.once('ready-to-show', function () {
			win.show();
			win.openDevTools();
		});
	}
})(window, 'Play');