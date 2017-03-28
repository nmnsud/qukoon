var WORKPLACE;
var currentUsages = {};
(function (w, f, n) {
	w[n] = f();
})(window, function () {
	function icon(dir) {
		try {
			var stt = FileSystem.statSync(dir);
			if (stt.isDirectory()) {
				return 'folder';
			} else {
				return dir.split(/[\/|\\]/g).lastItem().split('.').lastItem();
			}
		} catch (e) {}
		return 'any';
	}
	function convertToObject (dir) {
		return {
			label: dir.getFile(),
			id: dir,
			icon: icon(dir)
		}
	}
	function readall(dir) {
		var o = [];
		var ls = FileSystem.readdirSync(dir);
		for (var x=0;x < ls.length;x++) {
			o.push(convertToObject(dir + '\\' + ls[x]));
		}
		return o;
	}
 	function i() {
		this.init = true;
	}
	i.prototype.playAudio = function (dir) {
		Util.setTitle(dir.getFile(), dir.getPrevious());
		this.loadAsset(dir);
		Play(dir);
	}
	i.prototype.playVideo = function (dir) {
		Util.setTitle(dir.getFile(), dir.getPrevious());
		$('#selected_video_launcher_wrapper')[0].src = dir;
		$('#selected_video_launcher_wrapper')[0].play();
		this.loadAsset(dir);
	}
	i.prototype.makeWorkplace = function (dir) {
		WORKPLACE = dir;
		Util.setTitle(dir.presentable());
	}
	i.prototype.createEntity = function (def, type) {
		var types = ['folder', 'file'];
		if (types.include(type) && typeof def == 'string') {

		}
	}
	i.prototype.loadAsset = function (dir) {
		if (this.init) {
			if (typeof dir == 'string') {
				dir = convertToObject(dir);
			}
			if (typeof dir == 'object') {
				currentUsages[dir.id] = dir;
				function __in() {
					var temp = [], n;
					for (var k in currentUsages) {
						temp.push(currentUsages[k]);
					}
					n = new List('method_list');
					n.useTemplate(temp);
					$('#imported_files_option').hide();
					n.onSelectListener(function (ls, id, parent) {
						var sel_dir = ls.getItem(id, parent).id;
						Breadcrumb(sel_dir);
						$('#imported_files_option').show();
						$('#imported_file_remove_sel').click(function () {
							if (currentUsages[sel_dir]) {
								delete currentUsages[sel_dir];
								Breadcrumb('');
								__in();
							}
						});
					});
					n.populate();
				}
				__in();
			}
			if (WORKPLACE) {
				var copied = WORKPLACE + '\\imports\\' + dir.id.getFile();
				if (!FileSystem.existsSync(copied)) {
					FileSystem.copyFileSync(dir.id, copied);
				}
			}
			return copied;
		}
	}
	i.prototype.openFolder = function (dir) {
		var $this = this;
		if (dir != ':computer:') {
			try {
				var i = FileSystem.statSync(dir);
			} catch (e) {
				DiskCheck();
				$this.openFolder(':computer:');
				return;
			}
			if (FileSystem.existsSync(dir) && i.isDirectory()) {
				var ls = [];
				if (dir.getPrevious() != '') {
					ls = [{
						label: "...",
						id: dir.getPrevious(),
						icon: 'upFolder',
						title: 'Previous folder'
					}];
				} else {
					if (process.platform == 'win32') {
						ls = [{
							label: "...",
							id: ':computer:',
							icon: 'upFolder',
							title: 'Previous folder'
						}];
					}
				}
				ls = ls.concat(readall(dir));
			}
		} else {
			var ls = [];
			for (var x=0;x < disks.length;x++) {
				ls.push({
					label: disks[x].toUpperCase() + ':\\',
					title: disks[x].toUpperCase() + ':\\',
					id: disks[x] + ':',
					icon: 'folder'
				});
			}
		}
		var n = new List('project_files_list');
		n.useTemplate(ls);
		n.onClickListener(function (i, o, u) {
			var item = i.getItem(o, u);
			if (item.icon == 'folder' || item.icon == 'upFolder') {
				$this.openFolder(item.id);
			} else {
				switch (item.icon) {
					case 'exe':
						var ask = Dialog.showMessageBox({
							title:"Open?",
							message:"Do you want to open '" + item.label + "'?",
							buttons:["Yes", "Cancel"],
							type:"info"
						});
						if (ask == 0) {
							var cp = require('child_process').exec;
							console.log(cp(item.id));
						}
						break;
					case 'wmv':
					case 'mp4':
					case 'mpeg':
					case 'wav':
					case 'mp3':
					case 'ogg':
						if (!currentUsages[item.id]) {
							var ask = Dialog.showMessageBox({
								title:"Add?",
								message:"Are you sure to add '"+item.label+"' to your project?",
								buttons:["Yes", "Cancel"],
								type:"info"
							});
							if (ask == 0) {
								var pm = new ProjectManager();
								pm.loadAsset(item);
							}
						}
						break;
					default:
						var msg = Dialog.showMessageBox({
							title:"Error",
							message:"Unknown file extension type '"+item.icon.toUpperCase()+"'.",
							buttons:["Ok"],
							type:"error"
						});
				}
			}
		});
		n.populate();
	}
	// window.addEventListener('beforeunload', function () {
	// 	if (Object.keys(currentUsages).length > 0) {
	// 		var db = Dialog.showMessageBox({
	// 			title: "Save project?",
	// 			message: "You are currently working on a video/audio file, are you sure to quit?",
	// 			buttons:["Yes", "Cancel"],
	// 			type: "info"
	// 		});
	// 		if (db == 1) {
	// 			return true;
	// 		} else {
	// 			return false
	// 		}
	// 	}
	// });
	return i;
}, 'ProjectManager');