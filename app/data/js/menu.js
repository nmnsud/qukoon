(function (w, p, f) {
	w[p] = f();
})(window, "ContextMenu", function () {
	var _context = {};
	var dir = __dirname + '\\json\\';
	_context.main = function (vname) {
		this.name = vname;
		this.defination = {};
	}
	_context.main.prototype.defineRole = function (a) {
		if (typeof a == 'object') {
			this.defination = a;
		}
	}
	_context.main.prototype.build = function() {
		var u = dir + this.name + '.json';
		var $this = this;
		if (FileSystem.existsSync(u)) {
			var d = FileSystem.readFileSync(u);
			d = JSON.parse(d);
			var menu = new Menu();
			for (var x=0;x < d.length;x++)	{
				var u = d[x];
				u['click'] = function (_this, x) {
					var roleF = $this.defination[_this.role];
					if (typeof roleF == 'function') {
						roleF(_this);
					}
				}
				menu.append(new MenuItem(u));
			}
			this.menu = menu;
			console.log(menu);
		} else {
			throw Error('Given name "' + this.name + '", is not a valid menu.');
		}
	}
	_context.main.prototype.pop = function() {
		this.menu.popup(remote.getCurrentWindow());
	}
	return _context.main;
});