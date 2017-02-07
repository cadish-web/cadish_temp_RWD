function initialize(mapArea) {
	var array = new Array();
	array['map_area1'] = { point : new google.maps.LatLng(34.932444,135.764280), con : '<div class="mapinfowindow"><h4>株式会社 宿力 本社</h4><p>〒612-8082<br />京都府京都市伏見区両替町4丁目304-1<br />秋月ビル2階　Tel.075-604-6440</p></div>'};
	array['map_area2'] = { point : new google.maps.LatLng(35.635491, 139.738276), con : '<div class="mapinfowindow"><h4>株式会社 宿力 東京支社</h4><p>〒108-0074<br />東京都港区高輪2丁目14-17<br />グレイス高輪ビル8F</p></div>'};
	array['map_area3'] = { point : new google.maps.LatLng(35.154877, 136.891863), con : '<div class="mapinfowindow"><h4>株式会社 宿力 名古屋営業所</h4><p>〒454-8555<br />愛知県名古屋市中川区西日置2丁目3番5号<br />名鉄交通ビル6F　ダイキ情報システム内</p></div>'}
	
	var mapDiv = document.getElementById(mapArea);
	
	var myOptions = {
		zoom: 12,
		center: array[mapArea].point,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scaleControl: true,
		scrollwheel: false
	};
	var map = new google.maps.Map(mapDiv, myOptions);

	var marker = new google.maps.Marker({
		position: array[mapArea].point,
		map: map,
		title: '株式会社 宿力'
	});

	var infowindow = new google.maps.InfoWindow({
		content: array[mapArea].con,
		size: new google.maps.Size(20, 100)
	});
	infowindow.open(map,marker);
}