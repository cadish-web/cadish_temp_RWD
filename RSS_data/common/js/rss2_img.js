$(function () {
	$.ajax({
		url: 'ajax.php',
		dataType: 'xml',
		success: function(data) {
			// 取得件数
			var getCount = 3;
			if ($('item', data).length < getCount) {
				getCount = $('item', data).length;
			}

			var insert = '';

			//no image画像の設定（hogehoge.gif箇所を適宜変更してください）
			var photo = ("<img src='hogehoge.gif' />");

			insert += '<ul>';
			for (var i = 0; i < getCount; i++) {
				var thisItem = $('channel', data).children('item').eq(i);
				var dd = new Date(thisItem.children('pubDate').text());
				var y = dd.getFullYear();
				var m = dd.getMonth() + 1;
				if (m < 10) {m = "0" + m;}
				var d = dd.getDate();
				if (d < 10) {d = "0" + d;}
				var date =  y + "/" + m + "/" + d;

				//画像の有無をチェック
				var imgCheck = thisItem.children('content\\:encoded').text().match(/(src="https?:){1}[\S_-]+((\.jpg)|(\.JPG)|(\.gif)|(\.GIF)|(\.png)|(\.PNG))/);
				var eimg = '';

				//eimgに画像を代入
				if(imgCheck){
					eimg += '<img ' + imgCheck[0] + '" >';
				}else {
					eimg += photo;
				}

				insert += '<li>';

				// 日時の挿入
				insert += '<p class="pubDate">';
				insert += date;
				insert += '</p>';

				// タイトルの挿入
				insert += '<p class="title">';
				insert += '<a href="' + thisItem.children('link').text() + '">';
				insert += thisItem.children('title').text();
				insert += '</a>';
				insert += eimg;
				insert += '</p>';

				insert += '</li>';
			}
			insert += '</ul>';

			$("#feed_01").append(insert);
		}
	});
});
