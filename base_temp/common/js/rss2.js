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

				insert += '<li>';

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

				insert += '</li>';
			}
			insert += '</ul>';

			$("#feed").append(insert);
		}
	});
});
