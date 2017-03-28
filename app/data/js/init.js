const {remote} = require('electron');
const mWindow = remote.getCurrentWindow();
const app = remote.app;
const {Menu, MenuItem} = remote;
const Dialog = remote.dialog;
const FileSystem = require('fs');
const PROJECT_DIRECTORY = process.env.USERPROFILE + '\\Documents\\Qukoon Projects\\';
var disks = [];
FileSystem.copyFileSync = function (a, b, options) {
	if ('string' == typeof a && typeof a == typeof b) {
		var data = FileSystem.readFileSync(a);
		FileSystem.writeFileSync(b, data);
	}
	return b;
}
if (!FileSystem.existsSync(PROJECT_DIRECTORY)) {
	FileSystem.mkdirSync(PROJECT_DIRECTORY);
}
window.addEventListener('beforeunload', function () {
	if (currentWorkingOn) {
		var d = Dialog.showMessageBox({type:"question",message:"Do you want to save "+currentWorkingOn+"?", buttons: ["Yes", "No", "Cancel"]});
		if (d == 2 || d == 0) { 
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
});
var currentWorkingOn = false;
var tabsList = {};
var tabScroller;