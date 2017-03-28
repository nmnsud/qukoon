var Interface = {};
Interface.search_files_from_project = function (val) {
	console.log(val);
}
Interface.mkdir = function () {
	var pj = new ProjectManager();
	pj.createEntity('New folder', 'folder');
}