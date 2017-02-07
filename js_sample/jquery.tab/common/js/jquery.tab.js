$(function() {
	$('#tabs a[href^="#panel"]').click(function(){
		$("#tabs .panel").hide();
		$(this.hash).fadeIn();
		return false;
	});
	//わざと1つ目を表示させておくことができます
	$('#tabs a[href^="#panel"]:eq(0)').trigger('click');
})
