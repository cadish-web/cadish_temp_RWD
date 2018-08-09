/* --------------------------------------------------------
	[Setting Option] ※全ページに関わるものだけ記載
-------------------------------------------------------- */
$(document).ready(function() {
	/* 電話番号へのリンク指定
	   PC     →  「span」で囲む (リンクにしない)
	   スマホ  →  「class="tel-link"」をつけたリンク
	-------------------------------------------------------- */
	if(!navigator.userAgent.match(/(iPhone|iPad|Android)/)){
		$("a.tel-link").each(function(){
			$(this).replaceWith('<span class="tel-link">' + $(this).html() + '</span>');
		});
	}


	/* ウィンドウサイズによって読み込む画像を切り替え
	▼画像：2パターン用意し、PC用に「_pc」タブレット＆スマホ用に「_sp」を追加。
	▼HTML：下記クラス+データサイズを該当する画像のimgタグに追加
	768で切り替え → class="switch" data-size="tab"
	600で切り替え → class="switch" data-size="sp"
	-------------------------------------------------------- */
	var $setElem = $('.switch'),
			pcName = '_pc',
			spName = '_sp',
			spSize = window.matchMedia('(max-width: 600px)'),
			tabSize = window.matchMedia('(max-width: 768px)');

	const imgSize = function(){
		$setElem.each(function(){
			if($(this).attr('data-size')=='sp' && spSize.matches) {
				$(this).attr('src',$(this).attr('src').replace(pcName,spName));
			} else if($(this).attr('data-size')=='tab' && tabSize.matches) {
				$(this).attr('src',$(this).attr('src').replace(pcName,spName));
			} else {
				$(this).attr('src',$(this).attr('src').replace(spName,pcName));
			}
		});
	};
	spSize.addListener(imgSize);
	tabSize.addListener(imgSize);
	imgSize();


	/* スムーススクロール
	-------------------------------------------------------- */
	$('a[href^="#"]:not(.nosmooth)').click(function(){
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var hHeight = '';

		/* ▽ 固定ヘッダーありの場合の処理 ▽ */
		// // ヘッダー固定が解除されるウィンドウ幅
		// var hFixSize = window.matchMedia('(max-width: 768px)');
		// // 固定ヘッダーの高さ
		// if(!hFixSize.matches) {
		// 	// 固定ヘッダー（ #header_wrap の箇所は固定ヘッダーのid名に合わせてください ）
		// 	hHeight = $('#header_wrap').outerHeight() + 20;
		// }
		/* △ 固定ヘッダーありの場合の処理 ▽ */

		var position = target.offset().top - hHeight;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});

/* ----- Setting End ----------------------------------- */
});

// ページが完全に読み込まれたら実行
$(window).on('load',function(){
	/* 指定した要素の高さを揃える
	-------------------------------------------------------- */
	$(".item").matchHeight();


	/* グローバルナビ途中から上部固定にする
		※最初から一番上にくっついてる場合はこのjsいらないので消してください。
	-------------------------------------------------------- */
	var nav = $('#gnav');						// 固定するナビ領域
	var con = $('#contents_wrap');	// ナビ領域の次の要素（ナビがfixedになった時に位置がずれないように上にpaddingを確保する要素）
	var navTop = nav.offset().top;	// 固定するナビまでの高さを算出
	var navHeight = $("#gnav").height(); // nav_wrap の高さを取得
	var storeNav = 768;							// ナビ固定を解除するウィンドウ幅
	function navFix() {
		if($(this).scrollTop() >= navTop && $(window).width() >= storeNav) {
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


	/* ページトップへ戻るをフェードインで表示
	-------------------------------------------------------- */
	// var fade_pos = 200; // このpx分スクロールしたらpagetopを表示させる
	//
	// // bodyのid名でfadeInするタイミングを変更することができます
	// if($('body').attr('id') == 'home') {
	// 	// bodyのid名がhomeだったら500pxスクロールでpagetop表示
	// 	fade_pos = 500;
	// }
	//
	// if ($(this).scrollTop() <= fade_pos) {
	// 	$("#pagetop").css({"display":"none"});
	// }
	// $(window).on('scroll',function() {
	// 	if ($(this).scrollTop() > fade_pos) {
	// 		$('#pagetop').fadeIn(500);
	// 	} else {
	// 		$('#pagetop').fadeOut(500);
	// 	}
	// });


	/* アコーディオンメニュー
	-------------------------------------------------------- */
	var accTrigger = $('.acc_tit'),
			accSpSize = window.matchMedia('(max-width: 600px)'),
			accTabSize = window.matchMedia('(max-width: 768px)');
	const accChange = function() {
		accTrigger.each(function() {
			if($(this).attr('data-size')){
				if(accSpSize.matches && $(this).attr('data-size') == 'sp') {
					// 600px以下でアコーディオンにしたい時はこっち
					$(this).next().addClass('acc_contents').hide();
					return true;
				}

				if(accTabSize.matches && $(this).attr('data-size') == 'tab') {
					// 768px以下でアコーディオンにしたい時はこっち
					$(this).next().addClass('acc_contents').hide();
					return true;
				}

				$(this).next().css('display','').removeClass('acc_contents');
			}
		});
	}
	accSpSize.addListener(accChange);
	accTabSize.addListener(accChange);
	accChange();
	$('.acc_contents').hide();
	$('.acc_tit').on("click",function(){
		var acc = $(this);
		acc.toggleClass("active").next(".acc_contents").slideToggle(300);
	});


	/* facebook / page plugin のリサイズ処理
	-------------------------------------------------------- */
	// var fbTimer = false;	// タイマー準備
	// var fbWrap = $('#fb_col');	// page pluginの親要素（ここの幅に合わせてpage pluginをリサイズします）
	// var fbSize = fbWrap.width(); // 親要素の横幅初期幅
	// var fbSize_re;
	//
	// $(window).on("orientationchange resize",function() {
	// 	// リサイズ後の放置時間が指定ミリ秒以下なら何もしない(リサイズ中に何度も処理が行われるのを防ぐ)
	// 	if (fbTimer !== false) {
	// 		clearTimeout(fbTimer);
	// 	}
	//
	// 	// 放置時間が指定ミリ秒以上なので処理を実行
	// 	fbTimer = setTimeout(function() {
	// 		// リサイズ後の親要素の横幅を取得
	// 		fbSize_re = fbWrap.width();
	//
	// 		// リサイズ前の親要素の横幅とリサイズ後の親要素の横幅が異なる場合
	// 		if ( fbSize !== fbSize_re ) {
	// 			//facebookのリサイズ処理
	// 			boxWidth=Math.floor(fbSize_re); // 親要素の横幅から小数点を切り捨て
	// 			currentWidth=fbWrap.find('.fb-page').attr('data-width');
	// 			if(boxWidth != currentWidth){
	// 				fbWrap.find('.fb-page').attr('data-width', boxWidth);
	// 				FB.XFBML.parse();
	// 			}
	//
	// 			// 次回以降使えるようにリサイズ後の幅を保存
	// 			fbSize = $(window).width();
	// 		}
	// 	}, 200);
	// });


	/* 別ページから特定ID箇所へ移動するときに固定ヘッダー分位置をずらす
	 * aタグのリンクを下記のように設定してください。
	 * <a href="hoge/?id=id名">hogehoge</a>
	-------------------------------------------------------- */
	// // urlパラメータの取得
	// var moveArg = new Object;
	// var movePrm = location.search.substring(1).split('&');
	// var moveFlg = false;
	// for(var i=0 ; movePrm[i] ; i++) {
	// 	var kv = movePrm[i].split('=');
	// 	moveArg[kv[0]]=kv[1];
	//
	// 	if(kv[0] == 'id') {
	// 		moveFlg = true;
	// 	}
	// }
	//
	// if( moveFlg ) {
	// 	var target = $('#' + moveArg['id']);
	// 	var hHeight = '';
	//
	// 	/* ▽ 固定ヘッダー有りの場合の処理 ▽ */
	// 	// // ヘッダー固定が解除されるウィンドウ幅
	// 	// var hFixSize = window.matchMedia('(max-width: 768px)');
	// 	// // 固定ヘッダーの高さ
	// 	// if(!hFixSize.matches) {
	// 	// 	// 固定ヘッダー（ #header_wrap の箇所は固定ヘッダーのid名に合わせてください ）
	// 	// 	hHeight = $('#header_wrap').outerHeight() + 20;
	// 	// }
	// 	/* △ 固定ヘッダー有りの場合の処理 △ */
	//
	// 	var position = target.offset().top - hHeight;
	// 	$("html, body").animate({scrollTop:position}, 500, "swing");
	// }


/* ----- Setting End ----------------------------------- */
});
