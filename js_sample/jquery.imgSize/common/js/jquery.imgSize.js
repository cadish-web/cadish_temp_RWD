$(document).ready(function() {
	var $setElem = $('.switch'),													// 切り替える画像のクラス名
			pcName = '_pc',																		// PC用画像の接尾辞
			spName = '_sp',																		// スマホ用画像の接尾辞
			spSize = window.matchMedia('(max-width: 600px)');	// 画像を切り替えるウィンドウサイズ

	const imgSize = function(){
		$setElem.each(function(){
			if($(this).attr('data-size')=='sp' && spSize.matches) {
				$(this).attr('src',$(this).attr('src').replace(pcName,spName));
			} else {
				$(this).attr('src',$(this).attr('src').replace(spName,pcName));
			}
		});
	};

	spSize.addListener(imgSize);
	imgSize();
});
