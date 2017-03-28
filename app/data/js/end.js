(function () {
	var argv = Util.getParameterByName('argv');
	var pm = new ProjectManager();
	var ents = new Entities();
	if (argv) {
		try {
			var stat = FileSystem.statSync(argv);
			if (!stat.isDirectory()) {
				if (argv.EndsWith(['mp4'])) {
					pm.playVideo(argv);
				} else if (argv.EndsWith(['mp3', 'wav', 'ogg'])) {
					pm.playAudio(argv);
				}
			} else {
				pm.makeWorkplace(argv);
			}
		} catch (e) {}
	}
	ents.reload();
	pm.openFolder(':computer:');
})();