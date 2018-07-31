$(function($){
	var menuSize = window.matchMedia('(max-width: 600px)'),						// メニューをモーダルにする幅
			menuObj = $("#gnav"),																					// メニューブロック
			menuTrigger = "#open_menu, .close_menu, #menuInner, .anchor",	//開閉動作用のトリガー（複数設定可能）
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
			menuObj.unwrap();
			menuObj.css("position","");
			$("html,body").removeClass('pos_fix');
		}
	}

	$(document).on("click", menuTrigger, function(e){
		if(menuSize.matches) {
			$("html,body").toggleClass('pos_fix');
			menuWrap.slideToggle(500);
			e.stopPropagation();
		}
	});

	menuSize.addListener(wrapChange);
	wrapChange();
});