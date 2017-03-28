(function (bcc, bci, bc) {
	function _bc(url) {
		if (typeof url == 'string') {
			url = url.replace(/\//g, '\\');
			var s = url.split('\\');
			bcc();
			for (var x=0;x < (s.length - 1);x++) {
				bci(s[x]);
			}
		}
	}
	var bc = function (c) {_bc(c)}
	window['Breadcrumb'] = bc;
})(function () {
	var bc = $('#breadCrumb');
	var i = $('<div class="breadcrumb_item sample" icon="home"></div>');
	bc.html('');
	bc.append(i);
}, function (label) {
	var bc = $('#breadCrumb');
	var i = $('<div class="breadcrumb_item sample show_label" label="'+label+'" icon="folder"></div>');
	bc.append(i);
})