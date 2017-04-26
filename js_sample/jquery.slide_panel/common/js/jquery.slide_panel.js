$(window).on('load',function(){

	$('.acc_contents').hide();

	$("#tit_01").click(function(){
		$("#contents_01").slideToggle("500");
		$('#contents_02').hide();
	});

	$("#tit_02").click(function(){
		$("#contents_02").slideToggle("500");
		$('#contents_01').hide();
	});

});
