FileSystem.createIfSync = function (d) {
	var plob = d.split(/[\\\/]/g);
	var arr = [];
	for (var x=0;x < plob.length;x++) {
		arr.push(plob[x]);
		var s = arr.join('//');
		if (!FileSystem.existsSync(s)) {
			FileSystem.mkdirSync(s);
		}
	}
}
Number.prototype.timify = function () {
	var t = this;
	var mins = Math.round(t / 59);
	var secs = Math.round(t * 2);
	return mins + ':' + secs;
}
Array.prototype.lastItem = function() {
	return this[this.length - 1];
}
String.prototype.getPrevious = function () {
	var splt = this.split(/[\/|\\]/g);
	splt.pop();
	return splt.join('\\');
}
String.prototype.getFile = function () {
	var splt = this.split(/[\/|\\]/g);
	return splt.lastItem();
}
String.prototype.presentable = function () {
	return this.replace(/(\/\/|\\\\|\/\\|\\\/)/, '\\');
}
Array.prototype.remove = function (index) {
	var arr = [];
	for (var x=0;x < this.length;x++) {
		if (x != index) {
			arr.push(this[x]);
		}
	}
	return arr;
}
String.prototype.EndsWith = function(und) {
	if (typeof und == 'string') {
		return this.endsWith(und);
	} else if (typeof und == 'object') {
		for (var x=0;x < und.length;x++) {
			if (this.endsWith(und[x])) {
				return true;
			}
		}
	}
}
String.prototype.StartsWith = function(und) {
	if (typeof und == 'string') {
		return this.startsWith(und);
	} else if (typeof und == 'object') {
		for (var x=0;x < und.length;x++) {
			if (this.startsWith(und[x])) {
				return true;
			}
		}
	}
}
Number.prototype.isMultipleOf = function (n) {
	return this % n < 1;
}
Number.prototype.animate = function (n, f, d) {
	var dur = 10;
	if (typeof d == 'number') {
		dur = d;
	}
	if (typeof f == 'function' && typeof n == 'number') {
		var t = this;
		var intr = setInterval(function () {
			if (n > t) {
				if (t < n) {
					t++;
					f(t);
				} else {
					clearInterval(intr);
				}
			} else {
				if (t > n) {
					t--;
					f(t);
				} else {
					clearInterval(intr);
				}
			}
		}, dur);
	}
}
Object.prototype.animate = function (_n, f, d) {
	var dur = 10;
	if (typeof d == 'number') {
		dur = d;
	}
	var keys = Object.keys(this);
	var _keys = Object.keys(_n);
	for (var x=0;x < keys.length;x++) {
		for (var i=0;i < _keys.length;i++) {
			if (typeof this[keys[x]] == 'number' && typeof _n[_keys[i]] == 'number') {
				if (typeof f == 'function') {
					var n = _n[_keys[i]];
					var t = this[keys[x]];
					var intr = setInterval(function () {
						if (n > t) {
							if (t < n) {
								t++;
								f(t);
							} else {
								clearInterval(intr);
							}
						} else {
							if (t > n) {
								t--;
								f(t);
							} else {
								clearInterval(intr);
							}
						}
					}, dur);
				}
			}
		}
	}
}