$(function($){
	var menuSize = window.matchMedia('(max-width: 600px)'),						// メニューをモーダルにする幅
			menuObj = $("#gnav"),																					// メニューブロック
			menuTrigger = ".anchor",	//開閉動作用のトリガー（複数設定可能）
			menuWrap;

	const wrapChange = function() {
		if(menuSize.matches) {
			menuObj.wrap('<div id="menuOuter"></div>');
			menuWrap = $('#menuOuter');
			menuWrap.prepend('<div id="menuInner"></div>');
			menuObj.css("position","relative");

			if(menuObj.css("display") == "none") {
				menuObj.css('display','block');
			}
		} else {
			$('#menuInner').remove();
			if($('#menuOuter').length){
				menuObj.unwrap();
				menuObj.css("position","");
			}
			$("html,body").removeClass('pos_fix');
		}
	}

	const wrapToggle = function(e) {
		if(menuSize.matches) {
			$("html,body").toggleClass('pos_fix');
			menuWrap.toggleClass('active');
			e.stopPropagation();
		}
	}

	$(document).on("click", "#open_menu, .close_menu, #menuInner", function(e){
		wrapToggle(e);
	});

	// スムーススクロールと併用した場合 document へのバブリングが効かないため、aタグに直接クリックイベントを設定する必要がある。
	$(menuTrigger).on("click", function(e){
		wrapToggle(e);
	});

	menuSize.addListener(wrapChange);
	wrapChange();
});