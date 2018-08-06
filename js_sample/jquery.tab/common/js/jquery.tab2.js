$(function() {
	var arg = new Object;
	var pair = location.search.substring(1).split('&');
	for(var i=0 ; pair[i] ; i++) {
		var kv = pair[i].split('=');
		arg[kv[0]]=kv[1];
	}

	$('.tabs a[href^="#panel"]').on('click', function(e){

		if(!$(this).attr('onclick')) {
			$(this).closest('.tabs').children('.panel').hide();

			// class名の付け外し
			$(this).parent('li').siblings().find('a').removeClass('active');
			$(this).addClass("active");

			// imgの _on, _off も一緒に切り替えたい場合
			$(this).parent('li').siblings().each(function(){
				$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_on', '_off'));
			});
			$(this).children('img').attr('src', $(this).children('img').attr('src').replace('_off', '_on'));

			$(this.hash).fadeIn();
		}
		return false;

	});

	// 別ページから飛んだ時にtabパラメータが指定されている場合
	if(arg['tab']){
		tabMove(arg['tab']);
	}
});

function tabMove(hash) {
	var tab_arg = hash.split(',');
	$.each(tab_arg, function() {
		openHash = this.replace(/\s+/g, "");
		$('.tabs a[href^="#' + openHash + '"]').trigger('click');
	});
	return false;
}
