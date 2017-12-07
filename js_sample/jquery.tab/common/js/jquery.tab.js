$(function() {
	$('.tabs a[href^="#panel"]').click(function(){
		$(this).closest('.tabs').children('.panel').hide();

		// class名の付け外し
		$(this).parent('li').siblings().find('a').removeClass('active');
		$(this).addClass("active");

		$(this.hash).fadeIn();
		return false;
	});
	//わざと1つ目を表示させておくことができます
	$('.tabs .panel').hide();
	$('.tabs .panel:first-of-type').show();
});
