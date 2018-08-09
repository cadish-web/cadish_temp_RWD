$(window).on('load', function() {
	// urlパラメータの取得
	var moveArg = new Object;
	var movePrm = location.search.substring(1).split('&');
	var moveFlg = false;
	for(var i=0 ; movePrm[i] ; i++) {
		var kv = movePrm[i].split('=');
		moveArg[kv[0]]=kv[1];

		if(kv[0] == 'id') {
			moveFlg = true;
		}
	}

	if( moveFlg ) {
		var target = $('#' + moveArg['id']);
		var hHeight = '';
		var position = target.offset().top - hHeight;

		$("html, body").animate({scrollTop:position}, 500, "swing");
	}
});