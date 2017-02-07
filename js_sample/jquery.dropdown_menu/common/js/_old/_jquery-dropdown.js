$(document).ready(function($){
	$('#gnav').prepend('<div id="open_menu">MENU</div>');
	$("#open_menu").on("click", function(){
		$("#gnav ul").slideToggle();
		$(this).toggleClass("active");
	});
});
