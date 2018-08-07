$(document).ready(function() {
	$('a[href^="#"]:not(.nosmooth)').click(function(){
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		// 固定ヘッダーの高さ（ #header_wrap の箇所は固定ヘッダーのid名に合わせてください ）
		var hHeight = $('#header_wrap').outerHeight();
		// ターゲットの座標からヘッダの高さ+20px分引く
		// 最後の数値を変更することで移動位置を調整できます
		var position = target.offset().top - (hHeight + 20);
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
});