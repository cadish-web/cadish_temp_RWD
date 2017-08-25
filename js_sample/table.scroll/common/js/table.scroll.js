$(function(){
	function isTouchDevice() {
	var result = false;
		if (window.ontouchstart === null) {
			result = true;
		}
		return result;
	}

	if (isTouchDevice()){
		var $tableBody = $(".table_wrap tbody"),				// スクロールさせるtbody
				animateSpeed = 400;													// アニメーションスピード
				scrollX = 0,
				timer = false;

		$(".table_wrap").css({"overflow":"hidden"});

		$tableBody.hammer().on("swipe", function(event) {
				var $tableWrap = $(this).parents('.table_wrap'),	// テーブルを囲むdiv
						$table = $(this).parents('table');						// テーブルタグ

				if (timer !== false) {
					clearTimeout(timer);
				}

				scrollX = parseInt($table.css('left')) + event.gesture.deltaX;

				console.log($tableWrap.width() - $table.width());

				if(scrollX < 0){
					if(scrollX > $tableWrap.width() - $table.width()) {
						$table.animate({left: scrollX},animateSpeed);
					} else {
						$table.animate({left: $tableWrap.width() - $table.width()},animateSpeed);
					}
				}else{
					$table.animate({left: 0},animateSpeed);
				}

				timer = true;
    });
	}
});

$(window).on('load resize', function(){
	$('.table_wrap table').each(function() {
		paddingCal($(this));
	});

});

function paddingCal (thisTable) {
	if ( window.innerWidth < thisTable.width() ) {
		var barSize = window.innerWidth - $(window).outerWidth(true);
		thisTable.find('thead').css('padding-right', barSize);
	} else {
		thisTable.find('thead').css('padding-right', '');
	}
}