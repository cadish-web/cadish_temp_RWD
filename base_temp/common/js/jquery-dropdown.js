$(function($){
	var menuSize = window.matchMedia('(max-width: 768px)'),						// メニューをモーダルにする幅
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

	$(document).on("click", "#open_menu, .close_menu, #menuInner," + menuTrigger, function(e){
		if(menuSize.matches) {
			$("html,body").toggleClass('pos_fix');
			menuWrap.toggleClass('active');
			e.stopPropagation();
		}
	});

	menuSize.addListener(wrapChange);
	wrapChange();
});