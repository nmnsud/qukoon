(function (w, j) {
	var dir = j('#proj_folder');
	var name = j('#proj_name');
	var conf_1 = 0;
	var conf_2 = 0;
	function error(e) {
		if (e) {
			j('#err').show();
			j('#err').text(e);
		} else {
			j('#err').hide();
		}
	}
	function startBuilding(fdir) {
		var win = new remote.BrowserWindow({
			title: 'Building',
			width: 500,
			height: 170,
			show: false,
			minimizable: false,
			resizable: false
		});
		win.loadURL(__dirname + '\\build.html?argv=' + fdir.presentable());
		win.setMenuBarVisibility(false);
		win.on('close', function () {
			app.quit();
		});
		win.once('ready-to-show', function () {
			win.show();
			mWindow.hide();
		});
	}
	function disen() {
		if (conf_1 > 0 && conf_2 > 0) {
			j('#ok').attr('disabled', null);
		} else {
			j('#ok').attr('disabled', true);
		}
	}
	function checkDir(d) {
		var d = FileSystem.existsSync(d);
		if (d) {
			j('#ok').attr('disabled', null);
			error();
			j('#change').show();
			dir.attr('disabled', true);
			return true;
		} else {
			j('#ok').attr('disabled', true);
			error('Pointed project folder does not exists.');
			j('#change').hide();
			dir.attr('disabled', null);
			dir[0].focus();
		}
	}
	name.on('blur', function () {
		if (this.value != '') {
			conf_1 = 1;
		} else {
			conf_1 = 0;
		}
		disen();
	});
	name[0].select();
	dir.on('blur', function () {
		if (this.value != '') {
			conf_2 = 1;
			checkDir(this.value);
		} else {
			conf_2 = 0;
		}
		disen();
	});
	j('#change').click(function () {
		j(this).hide();
		dir.attr('disabled', null);
		dir[0].select();
	});
	dir.val(PROJECT_DIRECTORY);
	conf_2 = 1;
	j('#ok').click(function () {
		if (name[0].value && dir[0].value) {
			var full = dir[0].value + '\\' + name[0].value;
			if ($('#miasp').prop('checked')) {
				Util.writeFile(__dirname.getPrevious().getPrevious().getPrevious().getPrevious() + '\\project.dat', full);
			}
			startBuilding(full);
		}
	});
	j('#cancel').click(function () {
		mWindow.close();
		app.quit();
	});
	j('#open').click(function () {
		var win = new remote.BrowserWindow({
			width: 500,
			height: 350,
			x: mWindow.getPosition()[0],
			y: mWindow.getPosition()[1],
			show: false,
			minimizable: false,
			resizable: false
		});
		win.loadURL(__dirname.getPrevious() + '\\html\\openproject.html');
		win.setMenuBarVisibility(false);
		win.once('ready-to-show', function () {
			win.show();
			mWindow.hide();
		});
	});
})(window, $);