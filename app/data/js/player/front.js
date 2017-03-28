var audio;
(function () {
	var audioStr = Util.getParameterByName('d');
	var playing = true, looping = false;
	if (audioStr) {
		audio = new Audio(audioStr);
		audio.load();
		$('#ranger').val(0);
		audio.onloadeddata = function () {
			$('#name').text(audioStr.getFile());
			$('#ranger').attr('max', this.duration);
			$('#timing').text(0 + '/' + Math.round(this.duration));
		}
		audio.ontimeupdate = function () {
			$('#ranger').css({
				width: (this.currentTime / this.duration * 100) + '%'
			});
			$('#timing').text(Math.round(this.currentTime) + '/' + Math.round(this.duration));
		}
		audio.onended = function () {
			$('#ranger').css({
				width: '0%'
			});
			$('#play_pause').text('Play');
			this.currentTime = 0;
			playing = false;
			if (looping) {
				this.play();
				playing = true;
			}
		}
		$('#play_pause').click(function () {
			if (playing) {
				audio.pause();
				playing = false;
				$(this).text('Play');
			} else {
				$(this).text('Pause');
				audio.play();
				playing = true;
			}
		});
		$('#ranger').on('change', function () {
			audio.currentTime = this.value;
		});
		$('#play_pause').text('Pause');
		audio.play();
	}
})();