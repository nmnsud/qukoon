(function () {
	function openProject(p) {
		var win = new remote.BrowserWindow({
			title: 'Qukoon',
			width: 800,
			height: 600,
			show: false
		});
		win.loadURL(__dirname.getPrevious() + '\\index.html?argv=' + p);
		win.once('ready-to-show', function () {
			win.show();
			win.openDevTools();
			win.setSize(screen.availWidth, screen.availHeight);
			win.setPosition(0, 0);
			mWindow.hide();
		});
	}
	var build = Util.getParameterByName('argv');
	if (build) {
		FileSystem.createIfSync(build.getPrevious());
		if (!FileSystem.existsSync(build)) {
			FileSystem.mkdirSync(build);
		}
		if (!FileSystem.existsSync(build + '\\imports')) {
			FileSystem.mkdirSync(build + '\\imports');
		}
		if (!FileSystem.existsSync(build + '\\list.json')) {
			Util.writeFile(build + '\\list.json', '[]');
		}
		$('.loader_main_title').text('Building '+build+'...');
		setTimeout(function () {
			$('.loader_main_title').text('Opening...');
		}, 3000);
		setTimeout(function () {
			openProject(build);
		}, 6000);
	}
	$('#cancel').click(function () {
		mWindow.close();
		app.quit();
	});
})();