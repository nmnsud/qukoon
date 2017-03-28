var errors = [];
(function (w) {
	var errorBlock = $('<div class="err_block"></div>');
	$('body').prepend(errorBlock);
	w.addEventListener('error', function (error) {
		errors.push(error);
		var errorItem = $('<div class="err_item"><span class="main"><b>'+error.error+'</b></span><span class="float_right">'+error.filename.getFile()+':'+error.lineno+'/'+error.colno+'</span></div>');
		errorBlock.prepend(errorItem);
	});
})(window);