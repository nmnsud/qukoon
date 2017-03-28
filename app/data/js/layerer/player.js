(function (w) {
	var played = {}, interval;
	if (Layerer) {
		function reset() {
			for (var k in played) {
				if (k.match(/(\/|\\)/)) {
					played[k].pause();
				}
			}
			played = {};
		}
		function checkAndPlay(j) {
			for (var x=0;x < Layerer.holder.length;x++) {
				for (var i=0;i < Layerer.holder[x].contains.length;i++) {
					var box = Layerer.holder[x].contains[i];
					if (j >= box.delay) {
						if (box.type == 'aud') {
							if (!played[box.dir]) {
								var aud = new Audio(box.dir);
								aud.load();
								aud.onloadeddata = function () {
									aud.volume = box.volume || 1;
									aud.play();
									aud.currentTime = j - box.delay;
								}
								played[box.dir] = aud;
								return true;
							} else {
								if (played[box.dir].paused) {
									played[box.dir].currentTime = j - box.delay;
									played[box.dir].play();
								}
							}
						} else {

						}
					}
				}
			}
		}
		function pause() {
			reset();
			Layerer.isPlaying = false;
			clearInterval(interval);
		}
		function play() {
			if (!Layerer.isPlaying) {
				Layerer.isPlaying = true;
				interval = setInterval(function () {
					var inc = Layerer.increaseCursor(1);
					if (!inc) {
						Layerer.updateCursor(Layerer.scaleWidth + Layerer.scrollLength);
					}
					checkAndPlay(Layerer.cursorX);
				}, 1000);
			}
		}
		Layerer.play = function () {
			reset();
			play();
		}
		Layerer.pause = function () {
			pause();
		}
	}
})(window);