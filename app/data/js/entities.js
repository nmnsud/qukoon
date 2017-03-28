(function (w, p, f) {
	w[p] = f();
})(window, 'Entities', function () {
	var entities = {
		search: function (el) {
			var field = document.createElement('input');
			var cross = document.createElement('button');
			var aimer = $('#' + $(el).attr('aimer'));
			var target = Util.getObjectedFunction($(el).attr('target'));
			if (aimer) {
				if ($(el).attr('placeholder')) {
					$(field).attr('placeholder', $(el).attr('placeholder'));
				}
				field.addEventListener('input', function () {
					if (typeof target == 'function') {
						target(this.value);
					}
				});
				cross.addEventListener('click', function () {
					field.value = '';
					aimer.click();
				});
				el.appendChild(field);
				el.appendChild(cross);
			}
		}
	}
	function rl() {
		var els = document.getElementsByTagName('*');
		for (var x=0;x < els.length;x++) {
			for (var i in entities) {
				var tn = els[x].tagName.toLowerCase();
				if (tn == i) {
					entities[i](els[x]);
				} else {
					var id = $(els[x]).attr('target');
					var dondo = $(els[x]).attr('dondo');
					if (id && dondo) {
						var el = document.getElementById(id);
						var self = els[x];
						if (!$(this).attr('trigered')) {
							$(this).attr('trigered', true);
							self.addEventListener('click', function () {
								var visible = $(this).css('display') != 'none';
								if (visible) {
									$(this).hide();
									$(el).show();
								} else {
									$(this).show();
									$(el).hide();
								}
							});
						}
					}
				}
			}
		}
	}
	var i = function () {
		this.init = true;
	}
	i.prototype.reload = function () {
		if (this.init) {
			rl();
		}
	}
	return i;
});