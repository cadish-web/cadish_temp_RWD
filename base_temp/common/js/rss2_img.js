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

			//no image画像の設定
			var photo = ("<img src='img/no_image.gif' />");

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

				insert += '<dl>';

				// 画像の挿入
				insert += '<dt>';
				insert += '<a href="' + thisItem.children('link').text() + '">';
				insert += eimg;
				insert += '</a>';
				insert += '</dt>';

				insert += '<dd>';
				// 日時の挿入
				insert += '<span class="date">';
				insert += date;
				insert += '</span>';
				// タイトルの挿入
				insert += '<a href="' + thisItem.children('link').text() + '">';
				insert += thisItem.children('title').text();
				insert += '</a>';
				// 本文の挿入
				insert += '<span class="post">';
				insert += thisItem.children('description').text();
				insert += '</span>';
				insert += '</dd>';
				insert += '</dl>';
			}

			$("#feed").append(insert);
		}
	});
});
