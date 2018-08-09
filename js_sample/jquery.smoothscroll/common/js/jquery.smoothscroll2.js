$(document).ready(function() {
	$('a[href^="#"]:not(.nosmooth)').click(function(){
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var hHeight = '';

		// ヘッダー固定が解除されるウィンドウ幅
		var hFixSize = window.matchMedia('(max-width: 600px)');
		// 固定ヘッダーの高さ
		if(!hFixSize.matches) {
			// 固定ヘッダー（ #header_wrap の箇所は固定ヘッダーのid名に合わせてください ）
			hHeight = $('#header_wrap').outerHeight() + 20;
		}

		var position = target.offset().top - hHeight;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
});