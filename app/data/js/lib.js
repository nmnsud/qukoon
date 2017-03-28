function localRequire (req) {
	var dir = __dirname.replace(/[\\\/](html)/, '') + '/libs/' + req;
	var r = require(dir);
	return r;
}
var $ = localRequire('jquery');
var jQuery = $;
var isMainWindow = true;