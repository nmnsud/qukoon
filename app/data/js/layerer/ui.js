(function () {
	if (Layerer && Layerer.view) {
		var view = Layerer.view;
		var holder = Layerer.holder;
		var preX, preY;
		var nextX, nextY;
		function update_list (lst, wp) {
			var fl = wp + '\\list.json';
			var arr = [];
			for (var x=0;x < lst.length;x++) {
				for (var i=0;i < lst[x].contains.length;i++) {
					arr.push(lst[x].contains[i]);
				}
			}
			var json = JSON.stringify(arr);
			try {
				FileSystem.writeFileSync(fl, json);
			} catch (e) {
				console.log(e);
			}
		}
		function create_new_frame(dir, id, t, x, y) {
			var pmgr = new ProjectManager();
			if (typeof dir == 'string' && typeof id == 'number' && typeof t == 'string') {
				function spawn(dir, id, t, width, cid) {
					var frm = $('<div class="layrer_cell item hoxi" custom-id="'+cid+'" parent-id="'+id+'" title="'+dir+'" dir="'+dir+'" type="'+t+'"><div>'+dir.getFile()+'</div></div>');
					if (width) {
						frm.css({
							width: width,
							left: x || Layerer.cursorX,
							top: y || 0
						});
					}
					var parent = holder[id].element.children().first();
					parent.append(frm);
					var dragging = false;

					frm.on('mousedown', function (e) {
						preX = e.pageX - $(this).offset().left;
						preY = e.pageY - $(this).offset().top;
						Layerer.dragging = $(this);
						$('.masterFrameSelected').removeClass('masterFrameSelected');
						$(this).addClass('masterFrameSelected');
					});
					$(window).on('mouseup', function (e) {
						Layerer.dragging = false;
						update_list(Layerer.holder, WORKPLACE);
					});
					$(window).on('mousemove', function (e) {
						if (Layerer.dragging && !Layerer.isPlaying) {
							var cid = parseInt(Layerer.dragging.attr('custom-id'));
							var id = parseInt(Layerer.dragging.attr('parent-id'));
							nextX = e.pageX - preX - (Layerer.dragging.parent().parent().parent()[0].offsetLeft);
							nextY = (e.pageY - preY) - ($('#layrer_timescale').offset().top + Layerer.dragging.parent()[0].offsetTop);
							if (nextY >= (-1 * (Layerer.dragging.parent()[0].offsetTop - 13))) {
								Layerer.dragging.css({
									top: nextY
								});
							} else {
								Layerer.dragging.css({
									top: (-1 * (Layerer.dragging.parent()[0].offsetTop - 13))
								});
							}
							if (nextX >= Layerer.scaleWidth) {
								Layerer.dragging.css({
									left: nextX
								});
							} else {
								Layerer.dragging.css({
									left: Layerer.scaleWidth
								});
							}
							Layerer.holder[id].contains[cid].delay = nextX - Layerer.scaleWidth;
						}
					});
					return frm;
				}
				var fld = pmgr.loadAsset(dir);
				switch (t) {
					case 'vid':
						var vid = $('#temp_video')[0];
						vid.src = fld;
						vid.load();
						vid.onloadeddata = function () {
							var i = spawn(dir, id, t, this.duration, Layerer.holder[id].contains.length);
							Layerer.holder[id].contains.push({
								dir: dir,
								duration: this.duration,
								delay: i.offset().left - Layerer.scaleWidth,
								type: 'vid'
							});
							update_list(Layerer.holder, WORKPLACE);
						}
						break;
					case 'aud':
						var aud = new Audio(fld);
						aud.load();
						aud.onloadeddata = function () {
							var i = spawn(dir, id, t, this.duration, Layerer.holder[id].contains.length);
							Layerer.holder[id].contains.push({
								dir: dir,
								duration: this.duration,
								delay: i.offset().left - Layerer.scaleWidth,
								type: 'aud'
							});
							update_list(Layerer.holder, WORKPLACE);
						}
						break;
					default:
						return 0;
				}
			}
		}
		function new_layer(type, name) {
			if (['vid', 'aud'].includes(type)) {
				var row = $('<div class="layerer_row '+type+'"></div>');
				var left = $('<div class="layrer_cell item intro"></div>');
				var add_file = $('<div><button index="'+(Layerer.holder.length)+'" icon="add" title="Add file..."></button></div>');
				left.append(add_file);
				row.append(left);
				view.append(row);
				if (type == 'vid') {
					add_file.children().first().click(function () {
						var str = $(this).attr('index');
						var out = Dialog.showOpenDialog({
							properties: ['openFile'],
							filters: [
								{name: 'All Files', extensions: ['*']},
								{name: 'MP4', extensions: ['mp4']}
							]
						}) || [];
						if (out.length > 0) {
							var index = parseInt(str);
							create_new_frame(out[0], index, type);
						}
					});
				} else {
					add_file.children().first().click(function () {
						var str = $(this).attr('index');
						var out = Dialog.showOpenDialog({
							properties: ['openFile'],
							filters: [
								{name: 'All Files', extensions: ['*']},
								{name: 'MP3', extensions: ['mp3']},
								{name: 'WAV', extensions: ['wav']},
								{name: 'OGG', extensions: ['ogg']}
							]
						}) || [];
						if (out.length > 0) {
							var index = parseInt(str);
							create_new_frame(out[0], index, type);
						}
					});
				}
				Layerer.holder.push({
					element: row,
					type: type,
					contains: []
				});
			}
		}
		new_layer('vid');
		new_layer('aud');
	}
})();