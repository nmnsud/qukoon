(function (w, p, f) {
	w[p] = f();
})(window, 'Eval', function () {
	var __eval = {};
	var c = /console\.([a-z]+)\((.*)\)/gi;
	var _c = 'log($2, "$1")';
	__eval.main = function (s) {
		var i = s.replace(c, _c);
		eval(i);
	}
	return __eval.main;
});