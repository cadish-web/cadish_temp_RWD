$(window).on('load', function() {
	var fade_pos = 200; // このpx分スクロールしたらpagetopを表示させる

	// bodyのid名でfadeInするタイミングを変更することができます
	if($('body').attr('id') == 'home') {
		// bodyのid名がhomeの場合、500pxスクロールでpagetop表示
		fade_pos = 500;
	}

	if ($(this).scrollTop() <= fade_pos) {
		$("#pagetop").css({"display":"none"});
	}
	$(window).on('scroll',function() {
		if ($(this).scrollTop() > fade_pos) {
			$('#pagetop').fadeIn(500);
		} else {
			$('#pagetop').fadeOut(500);
		}
	});
});
