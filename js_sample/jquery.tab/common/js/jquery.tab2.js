$(function() {
	// urlパラメータの取得
	var searchArg = new Object;
	var searchPrm = location.search.substring(1).split('&');
	for(var i=0 ; searchPrm[i] ; i++) {
		var kv = searchPrm[i].split('=');
		searchArg[kv[0]]=kv[1];
	}

	// 連動タブを配列に格納
	var pairArg = new Object;
	$('ul[data-pairing]').each(function() {
		var pairName = $(this).attr('data-pairing');
		if(!pairArg[pairName]) {
			pairArg[pairName] = $();
		}

		pairArg[pairName] = pairArg[pairName].add($(this));
	});

	$('.tabs a[href^="#panel"]').on('click', function(e){

		if(!$(this).attr('onclick')) {	// タブ → タブ のリンク判定
			$(this).closest('.tabs').children('.panel').hide();

			// class名の付け外し
			var navObj = $(this).closest('ul');

			// 連動タブがある場合は格納しておいたオブジェクトで操作する
			if(navObj.attr('data-pairing')) {
				navObj = $(pairArg[navObj.attr('data-pairing')]);
			}

			navObj.find('a').removeClass('active');
			navObj.find('a[href="'+ this.hash +'"]').addClass("active");

			// imgの _on, _off も一緒に切り替えたい場合
			navObj.find('a').each(function(){
				var offPath = $(this).children('img').attr('src').replace('_on', '_off');
				$(this).children('img').attr('src', offPath);
			});
			navObj.find('.active').each(function(){
				var onPath = $(this).children('img').attr('src').replace('_off', '_on');
				$(this).children('img').attr('src', onPath);
			});

			$(this.hash).fadeIn();
		}
		return false;

	});

	// 別ページから飛んだ時にtabパラメータが指定されている場合
	if(searchArg['tab']){
		tabMove(searchArg['tab']);
	}
});

// タブ以外の箇所からのリンク用関数
function tabMove(hash) {
	var tabArg = hash.split(',');

	$.each(tabArg, function() {
		openHash = this.replace(/\s+/g, "");

		// .tabs内に同じトリガーが複数ある場合は一つ目のみ実行する
		$('.tabs a[href^="#' + openHash + '"]').eq(0).trigger('click');
	});
	return false;
}
