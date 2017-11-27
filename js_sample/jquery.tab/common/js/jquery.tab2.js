$(function() {
	$('.tabs a[href^="#panel"]').click(function(){
		$(this).parents('.tabs').children('.panel').hide();

		// class名の付け外し
		$(this).parent('li').siblings().find('a').removeClass('active');
		$(this).addClass("active");

		// imgの _on, _off も一緒に切り替えたい場合
		$(this).parent('li').siblings().each(function(){
			$(this).find('img').attr('src', function(){
				return $(this).attr('src').replace('_on', '_off');
			});
		});
		$(this).children('img').attr('src', function(){
			return $(this).attr('src').replace('_off', '_on');
		});

		$(this.hash).fadeIn();
		return false;
	});
	//わざと1つ目を表示させておくことができます
	$(".tabs .panel").hide();
	$(".tabs .panel:first-of-type").show();
})
