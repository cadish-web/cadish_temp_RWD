$(document).ready(function() {
	if(!navigator.userAgent.match(/(iPhone|iPad|Android)/)){
		$("a.tel-link").each(function(){
			$(this).replaceWith('<span class="tel-link">' + $(this).html() + '</span>');
		});
	}
});
