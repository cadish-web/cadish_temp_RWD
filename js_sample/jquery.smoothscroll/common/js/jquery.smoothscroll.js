$(document).ready(function() {
	$('a[href^="#"]:not(.nosmooth)').click(function(){
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var hHeight = '';
		var position = target.offset().top - hHeight;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
});
