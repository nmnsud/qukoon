var Util = Util || {};
(function (u, f) {
	var j = f();
	for (var k in j) {
		u[k] = j[k];
	}
})(Util, function () {
	return {
		loadJson: function (jn) {
			var dir = __dirname + '\\json\\' + jn + '.json';
			return JSON.parse(FileSystem.readFileSync(dir, 'utf-8'));
		},
		requireArguments: function (n, a) {
			if (a.length == n) {
				return true;
			} else {
				throw Error('Argument requirements not reached!');
			}
		},
		getObjectedFunction: function (f) {
			var s = f.split('.');
			var temp;
			for (var x=0;x< s.length;x++) {
				if (window[s[x]] && !temp) {
					temp = window[s[x]];
				} else {
					return temp[s[x]];
				}
			}
		},
		getParameterByName: function (n) {
			var url = location.href;
			var parameters = url.split('?')[1];
			if (parameters) {
				var everyTerm = parameters.split('&');
				for (var x=0;x < everyTerm.length;x++) {
					var termSplit = everyTerm[x].split('=');
					var name = termSplit[0];
					var value = termSplit[1];
					value = decodeURIComponent(value);
					if (name == n) {
						return value;
					}
				}
			}
		},
		Timer: function () {
			var counted = 0;
			var mCounterEnabled = false;
			function i() {
				if (mCounterEnabled && counted < 1) {
					counted += 0.1;
					i();
				}
			}
			return {
				start: function () {
					mCounterEnabled = true;
					i();
				},
				stop: function () {
					mCounterEnabled = false;
					return counted;
				}
			}
		},
		setTitle: function () {
			var args = arguments;
			var title = '';
			for (var x=0;x < args.length;x++) {
				title += args[x] + ' - ';
			}
			document.title = title + 'Qukoon';
		},
		writeFile: function (path, chunk, enc) {
			var ws = FileSystem.WriteStream(path);
			ws.write(chunk, (typeof enc != 'string' ? 'utf-8':enc));
			ws.close();
			return ws;
		}
	}
});