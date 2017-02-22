/* --------------------------------------------------------
	[Setting Option] ※全ページに関わるものだけ記載
-------------------------------------------------------- */
jQuery(document).ready(function() {

	/* 電話番号へのリンク指定
	   PC     →  「span」で囲む (リンクにしない)
	   スマホ  →  「class="tel-link"」をつけたリンク
	-------------------------------------------------------- */
	if(!navigator.userAgent.match(/(iPhone|iPad|Android)/)){
		jQuery("a.tel-link").each(function(){
			jQuery(this).replaceWith('<span class="tel-link">' + jQuery(this).html() + '</span>');
		});
	}
	/* スムーススクロール
	-------------------------------------------------------- */
	jQuery('a[href^=#]').click(function(){
		var speed = 500;
		var href= jQuery(this).attr("href");
		var target = jQuery(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		jQuery("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
});
