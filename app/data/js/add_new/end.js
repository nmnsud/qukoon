(function (w, j) {
	var menuJson = loadJSON('file_types_list');
	var selected = 'HTML';
	var ls = j('#listview').populateList(menuJson, function (list, index, parent) {
		selected = list.getItem(index, parent).label;
	});
	ls.select(0);
})(window, $);