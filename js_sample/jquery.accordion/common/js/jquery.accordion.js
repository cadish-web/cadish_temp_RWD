$(window).on('load',function(){
	/* アコーディオンメニュー
	-------------------------------------------------------- */
	var accTrigger = $('.acc_tit'),
			accSpSize = window.matchMedia('(max-width: 600px)');

	const accChange = function() {
		accTrigger.each(function() {
			if($(this).attr('data-size')){
				if(accSpSize.matches && $(this).attr('data-size') == 'sp') {
					// 600px以下でアコーディオンにしたい時はこっち
					$(this).next().addClass('acc_contents').hide();
					return true;
				}

				$(this).next().css('display','').removeClass('acc_contents');
			}
		});
	}

	accSpSize.addListener(accChange);
	accChange();

	$('.acc_contents').hide();
	$('.acc_tit').on("click",function(){
		var acc = $(this);
		acc.toggleClass("active").next(".acc_contents").slideToggle(300);
	});
/* ----- Setting End ----------------------------------- */
});
