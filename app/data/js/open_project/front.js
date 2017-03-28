(function () {
	var dir = __dirname.getPrevious();
	var snp = $('#snp');
	$('#cancel').click(function () {
		mWindow.close();
		app.quit();
	});
	$('#brz').click(function () {
		var fl = Dialog.showOpenDialog({
			properties: ['openDirectory']
		}) || [];
		if (fl.length > 0) {
			var p = fl[0];
			if (!FileSystem.existsSync(p + '\\imports')) {
				FileSystem.mkdirSync(p + '\\imports');
			}
			if (!FileSystem.existsSync(p + '\\list.json')) {
				Util.writeFile(p + '\\list.json', '[]');
			}
			var win = new remote.BrowserWindow({
				title: 'Qukoon',
				width: 800,
				height: 600,
				show: false
			});
			win.loadURL(__dirname.getPrevious() + '\\index.html?argv=' + p);
			win.once('ready-to-show', function () {
				win.show();
				win.setSize(screen.availWidth, screen.availHeight);
				win.setPosition(0, 0);
				mWindow.hide();
			});
		}
	});
	snp.click(function () {
		var win = new remote.BrowserWindow({
			width: 500,
			height: 350,
			x: mWindow.getPosition()[0],
			y: mWindow.getPosition()[1],
			show: false,
			minimizable: false,
			resizable: false
		});
		win.loadURL(dir + '\\html\\newproject.html');
		win.setMenuBarVisibility(false);
		win.once('ready-to-show', function () {
			win.show();
			mWindow.hide();
		});
	});
})();