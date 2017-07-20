$(function() {
	$('#tabs a[href^="#panel"]').click(function(){
		$("#tabs .panel").hide();

		// class名の付け外し
		$("#tabs a").removeClass("active");
		$(this).addClass("active");

		// imgの _on, _off も一緒に切り替えたい場合
		var thisImg = $(this).children('img');
		var thisPath = thisImg.attr('src').replace('_off', '_on');
		thisImg.attr('src', thisPath);

		var arr = $(this).parent('li').siblings();
		arr.each(function(i, val) {
			var valImg = $(val).find('img');
			var valPath = valImg.attr('src').replace('_on', '_off');
			valImg.attr('src', valPath);
		});

		$(this.hash).fadeIn();
		return false;
	});
	//わざと1つ目を表示させておくことができます
	//$('#tabs a[href^="#panel"]:eq(0)').trigger('click');
	$("#tabs .panel").hide();
	$("#tabs #panel1").show();
})
