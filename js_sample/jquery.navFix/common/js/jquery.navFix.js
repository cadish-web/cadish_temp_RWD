$(window).on('load', function() {
	var nav = $('#gnav');						// 固定するナビ領域
	var con = $('#contents_wrap');	// ナビ領域の次の要素（ナビがfixedになった時に位置がずれないように上にpaddingを確保する要素）
	var navTop = nav.offset().top;	// 固定するナビまでの高さを算出
	var navHeight = $("#gnav").height(); // nav_wrap の高さを取得
	var storeNav = 600;							// ナビ固定を解除するウィンドウ幅

	function navFix() {
		if($(this).scrollTop() >= navTop && $(window).width() > storeNav) {
			if(!nav.hasClass('fixed')) {
				nav.addClass('fixed');	// fixed クラスを追加
				con.css('padding-top', parseInt(con.css('padding-top'))+parseInt(navHeight)+'px');	// コンテンツ領域上部にgnav分の余白を確保
			}
		} else if(nav.hasClass('fixed')) {
			nav.removeClass('fixed').css('top','');
			con.css('padding-top','');
		}
	}

	navFix();

	//リサイズ時の処理
	$(window).on('resize', function() {
		if(nav.hasClass('fixed')) {
			if(navTop != con.offset().top) {
				navTop = con.offset().top;
			}
		} else if(navTop != nav.offset().top) {
			navTop = nav.offset().top;
		}

		navFix();
	});

	//スクロール時の処理
	$(window).scroll(function () {
		var winTop = $(this).scrollTop();

		navFix();

		if(nav.hasClass('fixed')){
			//fixedの際に横スクロールする処理
			nav.css("left", -$(window).scrollLeft());
		}
	});
});
