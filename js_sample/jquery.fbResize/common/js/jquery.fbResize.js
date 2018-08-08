$(window).on('load', function() {
	var fbTimer = false;	// タイマー準備
	var fbWrap = $('#fb_col');	// page pluginの親要素（ここの幅に合わせてpage pluginをリサイズします）
	var fbSize = fbWrap.width(); // 親要素の横幅初期幅
	var fbSize_re;

	$(window).on("orientationchange resize",function() {
		// リサイズ後の放置時間が指定ミリ秒以下なら何もしない(リサイズ中に何度も処理が行われるのを防ぐ)
		if (fbTimer !== false) {
			clearTimeout(fbTimer);
		}

		// 放置時間が指定ミリ秒以上なので処理を実行
		fbTimer = setTimeout(function() {
			// リサイズ後の親要素の横幅を取得
			fbSize_re = fbWrap.width();

			// リサイズ前の親要素の横幅とリサイズ後の親要素の横幅が異なる場合
			if ( fbSize !== fbSize_re ) {
				//facebookのリサイズ処理
				boxWidth=Math.floor(fbSize_re); // 親要素の横幅から小数点を切り捨て
				currentWidth=fbWrap.find('.fb-page').attr('data-width');
				if(boxWidth != currentWidth){
					fbWrap.find('.fb-page').attr('data-width', boxWidth);
					FB.XFBML.parse();
				}

				// 次回以降使えるようにリサイズ後の幅を保存
				fbSize = $(window).width();
			}
		}, 200);
	});
});
