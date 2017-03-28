const electron = require('electron');
const {Menu, app, BrowserWindow, dialog} = require('electron');
const fs = require('fs');
const $dirname = __dirname;
const os = require('os');
var width = 800;
var height = 600;
/*
 * Getting local nodes.
 */
function localRequire(node) {
	var dir = $dirname + '\\nodes\\' + node;
	return require(dir);
}
/*
 * Getting apps' root directory
 */
function get_main_directory() {
	var d = __dirname.split(/\\/);
	var a = [];
	for (var x=0;x < d.length;x++) {
		if (d[x] != 'resources') {
			a.push(d[x]);
		} else {
			__dirname = a.join('\\');
			return 0;
		}
	}
}
get_main_directory();
function isDevMode() {
	return fs.existsSync(__dirname + '\\#devMode')
}
function last_project() {
	var fl;
	try {
		fl = fs.readFileSync(__dirname + '\\project.dat', 'utf-8');
	} catch (e) {
		fl = 'blank';
	}
	if (fs.existsSync(fl)) {
		var win = new BrowserWindow({
			title: 'Qukoon',
			width: width,
			height: height,
			maximized: true,
			show: false
		});
		win.loadURL($dirname + '\\data\\index.html?argv=' + fl);
		win.once('ready-to-show', function () {
			win.show();
			if (isDevMode()) {
				win.openDevTools();
			}
			splash.hide();
		});
	} else {
		var win = new BrowserWindow({
			title: 'New Project',
			width: 500,
			height: 350,
			show: false,
			minimizable: false,
			resizable: false
		});
		win.loadURL($dirname + '\\data\\html\\newproject.html');
		win.setMenuBarVisibility(false);
		win.once('ready-to-show', function () {
			win.show();
			if (isDevMode()) {
				win.openDevTools();
			}
			splash.hide();
		});

	}
}
var splash;
function splash_screen () {
	splash = new BrowserWindow({
		width: 566,
		height: 152,
		title: 'Qukoon',
		frame: false,
		show: false,
		resizable: false,
		thickFrame: false,
		transparent: true,
		alwaysOnTop: true
	});
	splash.loadURL($dirname + '\\data\\splash.html');
	splash.setHasShadow(false);
	splash.once('ready-to-show', function () {
		splash.show();
	});
	splash.on('close', function () {
		app.quit();
	});
	setTimeout(function () {
		__init__();
	}, 4000);
}
function __init__() {
	if (process.argv[1]) {
		var win = new BrowserWindow({
			title: "Qukoon",
			width: width,
			height: height,
			show: false
		});
		win.loadURL($dirname + '\\data\\index.html?argv=' + process.argv[1]);
		win.once('ready-to-show', function () {
			win.show();
			win.maximize();
			if (isDevMode()) {
				win.openDevTools();
			}
			splash.hide();
		});
	} else {
		last_project();
	}
}
app.on('ready', function () {
	width = electron.screen.getPrimaryDisplay().workAreaSize.width;
	height = electron.screen.getPrimaryDisplay().workAreaSize.height;
	splash_screen();
});

app.on('quit', function (e) {
	if (fs.existsSync(__dirname + '\\locales')) {
		fs.rmdirSync(__dirname + '\\locales');
	}
});
app.on('before-quit', function () {
	var msg = dialog.showMessageBox({
		title: "Quit",
		message: "Are you sure to quit?",
		button: ["Yes", "Cancel"]
	});
	if (msg == 1) {
		event.preventDefault();
	}
});
