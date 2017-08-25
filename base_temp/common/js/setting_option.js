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
	640で切り替え → class="switch" data-size="sp"
	-------------------------------------------------------- */
	var $setElem = $('.switch'),
		pcName = '_pc',
		spName = '_sp',
		replaceWidth = 641,
		replaceWidth2 = 769;
		$setElem.each(function(){
			var $this = $(this);
			function imgSize(){
				if($this.attr('data-size')=='sp' && window.innerWidth > replaceWidth) {
					$this.attr('src',$this.attr('src').replace(spName,pcName)).css({visibility:'visible'});
				} else if($this.attr('data-size')=='tab' && window.innerWidth > replaceWidth2) {
					$this.attr('src',$this.attr('src').replace(spName,pcName)).css({visibility:'visible'});
				} else {
					$this.attr('src',$this.attr('src').replace(pcName,spName)).css({visibility:'visible'});
				}
			}
			$(window).resize(function(){imgSize();});
			imgSize();
		});

		/* スムーススクロール
		-------------------------------------------------------- */
		$('a[href^=#]').click(function(){
			var speed = 500;
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var position = target.offset().top;
			$("html, body").animate({scrollTop:position}, speed, "swing");
			return false;
		});

		/* スムーススクロール＆同一ページ内リンクでナビの高さ分だけずらす
		-------------------------------------------------------- */
		// $('a[href^=#]').click(function() {
		// 	var speed = 500;
		// 	var href= $(this).attr("href");
		// 	var target = $(href == "#" || href == "" ? 'html' : href);
		// 	var hHeight = $('#h_wrap').height(); //固定ヘッダーの高さ（ #h_wrap の箇所は固定ヘッダーのid名に合わせてください ）
		// 	var position = target.offset().top - headerHeight; //ターゲットの座標からヘッダの高さ分引く
		// 	$('body,html').animate({scrollTop:position}, speed, 'swing');
		// 	return false;
		// });

/* ----- Setting End ----------------------------------- */
});



// ページが完全に読み込まれたら実行
$(window).on('load',function(){
	/* 指定した要素の高さを揃える
	-------------------------------------------------------- */
	$(".item").lineUp();

	/* グローバルナビ途中から上部固定にする
	-------------------------------------------------------- */
	var nav = $('#gnav');      // 固定するナビ領域の名前
	var con = $('#contents_wrap'); // コンテンツ領域の名前
	var navTop = nav.offset().top; // 固定するナビまでの高さを算出
	var navHeight = $("#gnav").height(); // nav_wrap の高さを取得
	var storeNav = 1100; //gnavが格納される幅
	if( $(this).scrollTop() >= navTop && $(window).width() >= storeNav) {
		nav.addClass('fixed');
		con.css('padding-top', navHeight+'px');
	}
	//リサイズしたらナビの位置を再取得
	$(window).on('resize', function() {
		navTop = nav.offset().top;
	});
	//スクロール時の処理
	$(window).scroll(function () {
		var winTop = $(this).scrollTop();
		if (winTop >= navTop && $(window).width() >= storeNav ) {
			nav.addClass('fixed').css('top','0');
			con.css( 'padding-top', navHeight+'px');
			//PC用は下記1行を追記してください
			//nav.css("left", -$(window).scrollLeft());
		} else if (winTop < navTop) {
			nav.removeClass('fixed').css('top','');
			con.css('padding-top','');
		}
	});

	/* ページトップへ戻る / fadein & fadeout
	-------------------------------------------------------- */
	var fade_pos = 700; //ページトップボタンを表示させたい位置（上からのpx）

	/* トップページのみ表示位置を変えたい場合はここの数字を変更 */
	if($('#home').length){
		fade_pos = 1000;
	}
	if ($(this).scrollTop()+$(window).height() <= fade_pos) {
		$("#page_top").css({"display":"none"});
	}
	$(window).on('scroll',function() {
		if ($(this).scrollTop()+$(window).height() > fade_pos) {
			$('#page_top').fadeIn(500);
		} else {
			$('#page_top').fadeOut(500);
		}
	});

	/* アコーディオンメニュー
	-------------------------------------------------------- */
	var timer = false;
	var winWidth = $(window).width();
	var winWidth_resized;
	var tab = 768;
	var sp = 640;

	$('.acc_contents').hide();
	$('.acc_tit').on("click",function(){
		var acc = $(this);
		acc.toggleClass("active").next(".acc_contents").slideToggle(300);
	});

	if( winWidth <= sp) {
		//スマホ用
		$('#footer .acc_tit').next().addClass('acc_contents');
		$('#footer .acc_contents').hide();
	} else if ( winWidth <= tab ) {
		//タブ用

	} else {
		$('#footer .acc_contents').show();
		$('#footer .acc_tit').next().removeClass('acc_contents');
	}

	$(window).on("orientationchange resize",function() {
		// リサイズ後の放置時間が指定ミリ秒以下なら何もしない(リサイズ中に何度も処理が行われるのを防ぐ)
		if (timer !== false) {
			clearTimeout(timer);
		}
		// 放置時間が指定ミリ秒以上なので処理を実行
		timer = setTimeout(function() {
			// リサイズ後のウインドウの横幅を取得
			winWidth_resized = $(window).width();

			// リサイズ前のウインドウ幅とリサイズ後のウインドウ幅が異なる場合
			if ( winWidth !== winWidth_resized ) {
				//facebook用の処理
				// boxWidth=$('#fb_col').width();
				// currentWidth=$('#fb_col .fb-page').attr('data-width');
				// if(boxWidth != currentWidth){
				// 	$('#fb_col .fb-page').attr('data-width', boxWidth);
				// 	FB.XFBML.parse(document.getElementById('fb_col'));
				// }

				// ここにやりたい処理書く
				if($('.acc_tit').hasClass('active')){
					$('.acc_tit').removeClass('active');
					$('.acc_contents').hide();
				}

				if( winWidth_resized <= sp) {
					//スマホ用
					$('#footer .acc_tit').next().addClass('acc_contents');
					$('#footer .acc_contents').hide();
				} else if ( winWidth_resized <= tab ) {
					//タブ用

				} else {
					$('#footer .acc_contents').show();
					$('#footer .acc_tit').next().removeClass('acc_contents');
				}

				// 次回以降使えるようにリサイズ後の幅をウインドウ幅に設定する
				winWidth = $(window).width();
			}
		}, 200);
	});

//	/* 別ページから特定ID箇所へ移動するときの処理
//	 * aタグのリンクを下記のように修正してください。
//	 * <a href="hoge/?id=id名">hogehoge</a>
//	-------------------------------------------------------- */
//	var speed = 500;
//	var id = location.href.indexOf("?id=");
//	if( id !== -1 ) {
//		var target = $('#' + location.href.slice(id+4));
//		//固定ヘッダーの高さ分をマイナス（ #h_wrap の箇所は固定ヘッダーのid名に合わせてください）
//		var position = target.offset().top - $('#h_wrap').height();
//
//		//以下はレスポンシブ時固定ヘッダーが無くなる時の処理です　必要ない場合は削除
//		if ( winWidth <= 1100 ) { //1100 の箇所は固定ヘッダーが無くなるウィンドウサイズを入れてください
//			position = target.offset().top; //固定ヘッダーの高さ分マイナスしたのを元に戻す
//		}
//
//		$("html, body").animate({scrollTop:position}, speed, "swing");
//	}



/* ----- Setting End ----------------------------------- */
});
