$(function () {
	$.ajax({
		url: 'ajax.php',
		dataType: 'xml',
		success: function(data) {
			// 取得件数
			var getCount = 5;
			if ($('item', data).length < getCount) {
				getCount = $('item', data).length;}

			var insert = '';
			//insert += '<h1>';
			// リンク先の挿入
			//insert += '<a href="' + $('channel', data).children('link').text() + '">';
			// タイトルの挿入
			//insert += $('channel', data).children('title').text();
			//insert += '</a>';
			//insert += '</h1>';

			// 3日間だけ「New」マークをつける　ここから
			// var distance = 3 * 86400000; // 3日間のミリ秒数で求める
			// var today = new Date(); // 現在の年月日のDateオブジェクトを生成
			// var baseTime = today.getTime(); // 現在の年月日のミリ秒数を求める
			// ここまで

			insert += '<ul>';
			for (var i = 0; i < getCount; i++) {
				var thisItem = $('channel', data).children('item').eq(i);

				var dd = new Date(thisItem.children('pubDate').text());
				var y = dd.getFullYear();
				var m = dd.getMonth() + 1;
				if (m < 10) {m = "0" + m;}
				var d = dd.getDate();
				if (d < 10) {d = "0" + d;}
				var date =  y + "." + m + "." + d + " ";

				insert += '<li>';

				// 日時の挿入
				insert += '<span class="post_date">';
				insert += date;
				insert += '</span>';

				// タイトルの挿入
				insert += '<span class="post_title">';
				insert += '<a href="' + thisItem.children('link').text() + '">';
				insert += thisItem.children('title').text();
				insert += '</a>';
				insert += '</span>';

				// 本文の挿入
				//insert += '<div class="description">';
				//insert += thisItem.children('description').text();
				//insert += '</div>';

				// 3日間だけ「New」マークをつける　ここから
				// var entryTime = dd.getTime(); // ミリ秒数を求める
				// var dist = baseTime - entryTime; // 現在の年月日（ミリ秒数）との差分
				// // 3日経っていなければNEWマークを付ける
				// if(dist <= distance) {
				// 	insert += '<span class="icon">NEW</span>';
				// }
				// ここまで

				insert += '</li>';}
			insert += '</ul>';

			$("#feed").append(insert);}
	});});
