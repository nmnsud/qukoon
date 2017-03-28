(function (w, m, f) {
	w[m] = f();
})(window, 'List', function () {
	function create_item(d) {
		var i = typeof d.icon == 'string' ? ' icon="' + d.icon + '"':'';
		var id = typeof d.id == 'string' ? ' data-id="' + d.id + '"':'';
		if (typeof d == 'object') {
			if (typeof d.label == 'string') {
				if (!d.isEditable) {
					var h = $('<div'+id+' class="list-item show_label"'+i+' label="'+d.label+'" title="'+(typeof d.title == 'string' ? d.title:d.label)+'"></div>');
				} else {
					var h = $('<div'+id+' class="list-item show_label"'+i+'></div>');
					var j = $('<input type="text" value="'+d.label+'"/>');
					h.append(j);
					j[0].select();
				}
			} else {
				var h = $('<div class="list-separator"></div>');
			}
		}
		return h;
	}
	function ls(list, el, callback, callback2) {
		var ls = {
			getItem: function (i, p) {
				if (Util.requireArguments(2, arguments)) {
					var label, icon;
					var el = $(p.children()[i]);
					if (el[0]) {
						label = el.attr('label');
						icon = el.attr('icon');
						id = el.data('id');
						return {
							label: label,
							icon: icon,
							id: id
						}
					}
				}
			}
		}
		var o = {
			select: function (i) {
				el.children()[i].click();
			},
			onselect: function (a, b, c) {},
			onclick: function (a, b, c) {}
		};
		if (typeof callback == 'function') {
			o.onselect = callback;
		}
		if (typeof callback2 == 'function') {
			o.onclick = callback2;
		}
		for (var x=0;x < list.length;x++) {
			var d = create_item(list[x]);
			if (d) {
				el.append(d);
				function _us(el) {
					el.children().each(function (count, node) {
						$(node).removeClass('selected');
					});
				}
				d.on('mousedown', function () {
					// if (typeof d.click == 'function') {
					// 	d.click($(this));
					// }
					o.onselect(ls, $(this).index(), $(this).parent());
					_us($(this).parent());
					$(this).addClass('selected');
				});
				d.on('click', function () {
					// if (typeof d.click == 'function') {
					// 	d.click($(this));
					// }
					o.onclick(ls, $(this).index(), $(this).parent());
					_us($(this).parent());
					$(this).addClass('selected');
				});
			}
		}
		return o;
	}
	var i = function (parentId) {
		this.parent = $('#' + parentId);
		this.init = true;
	}
	i.prototype.useTemplate = function (obj) {
		if ('object' == typeof obj) {
			this.list = obj;
		}
	}
	i.prototype.loadFrom = function (url) {
		this.list = Util.loadJson(url);
	}
	i.prototype.onSelectListener = function (f) {
		this.callback = f;
	}
	i.prototype.onClickListener = function (f) {
		this.callback2 = f;
	}
	i.prototype.append = function (item) {
		var d = create_item(item);
		if (d) {
			this.parent.append(d);
		}
	}
	i.prototype.populate = function () {
		if (this.list && this.init && this.parent) {
			this.parent[0].innerHTML = '';
			this.parent[0].scrollTop = 0;
			ls(this.list, this.parent, this.callback, this.callback2);
		}
	}
	return i;
});