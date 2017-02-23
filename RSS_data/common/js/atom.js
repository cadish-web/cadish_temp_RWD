$(function() {
	$.ajax({
		url: 'ajax.php',
		dataType: 'xml',
		success: function(data) {
			// 取得件数
			var getCount = 5;
			if ($('entry', data).length < getCount) {
				getCount = $('entry', data).length;
			}

			var insert = '';

			insert += '<ul>';
			for (var i = 0; i < getCount; i++) {
				var thisItem = $('feed', data).children('entry').eq(i);
				var dd = new Date(thisItem.children('published').text());
				var y = dd.getFullYear();
				var m = dd.getMonth() + 1;
				if (m < 10) {m = "0" + m;}
				var d = dd.getDate();
				if (d < 10) {d = "0" + d;}
				var date =  y + "/" + m + "/" + d;

				insert += '<li>';

				// 日時の挿入
				insert += '<p class="pubDate">';
				insert += date;
				insert += '</p>';

				// タイトルの挿入
				insert += '<p class="title">';
				insert += '<a href="' + thisItem.children('link').attr('href') + '">';
				insert += thisItem.children('title').text();
				insert += '</a>';
				insert += '</p>';

				insert += '</li>';
			}
			insert += '</ul>';

			$('#feed_01').append(insert);
		}
	});
});
