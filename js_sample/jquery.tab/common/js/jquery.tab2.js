$(function() {
	$('.tabs a[href^="#panel"]').click(function(){
		$(this).parents('.tabs').children('.panel').hide();

		// class名の付け外し
		$(this).parent('li').siblings().find('a').removeClass('active');
		$(this).addClass("active");

		// imgの _on, _off も一緒に切り替えたい場合
		$(this).parent('li').siblings().each(function(){
			$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_on', '_off'));
		});
		$(this).children('img').attr('src', $(this).children('img').attr('src').replace('_off', '_on'));

		$(this.hash).fadeIn();
		return false;
	});


	$(".tabs .panel").hide();

	//一つ目のパネルを表示しておく（以下のクラス名等を修正で任意のパネルに変更可能）
	//初期状態で何も表示させない場合は以下1行を削除
	$(".tabs .panel:first-of-type").show();
});
