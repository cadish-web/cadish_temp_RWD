$(function() {
	$('#tabs a[href^="#panel"]').click(function(){
		$("#tabs .panel").hide();

		// class名の付け外し
		$("#tabs a").removeClass("active");
		$(this).addClass("active");

		$(this.hash).fadeIn();
		return false;
	});
	//わざと1つ目を表示させておくことができます
	//$('#tabs a[href^="#panel"]:eq(0)').trigger('click');
	$("#tabs .panel").hide();
	$("#tabs #panel1").show();
})
