(function dskchk() {
	if (process.platform == 'win32') {
		disks = [];
		var maybe = 'abcdefghijklmnopqrstuvwxyz'.split('');
		for (var x=0;x < maybe.length;x++) {
			try {
				FileSystem.readdirSync(maybe[x] + ':/');
				disks.push(maybe[x]);
			} catch (e) {}
		}
	}
	window['DiskCheck'] = dskchk;
})();