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

	/* グローバルナビ上部固定
	-------------------------------------------------------- */
	var nav = $('#gnav');      // 固定するナビ領域の名前
	var con = $('#contents_wrap'); // コンテンツ領域の名前
	var navTop = nav.offset().top; // 固定するナビまでの高さを算出
	var navHeight = $("#gnav").height(); // nav_wrap の高さを取得
	if( $(this).scrollTop() >= navTop ) {
		nav.addClass('fixed');
		con.css('padding-top', navHeight+'px');
	}
	$(window).scroll(function () {
		var winTop = $(this).scrollTop();
		if (winTop >= navTop) {
			nav.addClass('fixed').css('top','0');
			con.css( 'padding-top', navHeight+'px');
			//PC用は下記1行を追記してください
			//nav.css("left", -$(window).scrollLeft());
		} else if (winTop < navTop) {
			nav.removeClass('fixed').css('top','');
			con.css('padding-top','');
		}
	});

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


		/* スムーススクロール＆ページ内リンクでナビの高さ分だけずらす
		-------------------------------------------------------- */
		$('a[href^=#]').click(function() {
			var speed = 500;
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var headerHeight = 100; //固定ヘッダーの高さ
			var position = target.offset().top - headerHeight; //ターゲットの座標からヘッダの高さ分引く
			$('body,html').animate({scrollTop:position}, speed, 'swing');
			return false;
		});


		/* スムーススクロールのみ
		-------------------------------------------------------- */
		// $('a[href^=#]').click(function(){
		// 	var speed = 500;
		// 	var href= $(this).attr("href");
		// 	var target = $(href == "#" || href == "" ? 'html' : href);
		// 	var position = target.offset().top;
		// 	$("html, body").animate({scrollTop:position}, speed, "swing");
		// 	return false;
		// });


/* ----- Setting End ----------------------------------- */
});



// ページが完全に読み込まれたら実行
$(window).on('load',function(){
	/* 指定した要素の高さを揃える
	-------------------------------------------------------- */
	$(".item").lineUp();

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

//	/* 別ページから特定ID名箇所へ移動するときの処理
//	-------------------------------------------------------- */
//	var speed = 500;
//	var id = location.href.indexOf("?id=");
//	if( id !== -1 ) {
//		var target = $('#' + location.href.slice(id+4));
//		var position = target.offset().top - 120;
//		$("html, body").animate({scrollTop:position}, speed, "swing");
//	}

/* ----- Setting End ----------------------------------- */
});
