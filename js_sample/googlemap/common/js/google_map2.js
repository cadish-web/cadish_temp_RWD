var Map_Action = function() {
	var currentInfoWindow = null;//最後に出したウィンドウ

	this.point = new Array();//座標配列
	this.contents = new Array();//内容配列

	this.defaultNumber = 1; // 最初にオープンするウィンドウ
	this.WindowOpenflg = false;

	//マーカー表示の座標設定
	this.point[00] = new google.maps.LatLng(36.2234172, 136.1910285);//初期スポット
	this.point[01] = new google.maps.LatLng(36.237653, 136.125425); //東尋坊
	this.point[02] = new google.maps.LatLng(36.0557259243218, 136.355438232421); //永平寺
	this.point[03] = new google.maps.LatLng(36.2507573, 136.1761575); //芝政ワールド
	this.point[04] = new google.maps.LatLng(36.083346, 136.506639);//恐竜博物館


	//吹き出しの中身
	this.contents[00] = '<div style="width: 285px; overflow: hidden; color:#333333; text-align:left;"><p><span style="font-weight: bold; font-size:1.1em;">清風荘</span><br /><br />〒910-4104　福井県あわら市温泉3-803<br />TEL：0776-77-2500　FAX：0776-77-2515</p></div>';
	this.contents[01] = '<div style="width: 285px; overflow: hidden; color:#333333; text-align:left;"><p><span style="font-weight: bold; font-size:1.1em;">東尋坊</span><br /><br />〒913-0063　福井県坂井市三国町東尋坊<br />TEL：0776-82-3111</p></div>';
	this.contents[02] = '<div style="width: 285px; overflow: hidden; color:#333333; text-align:left;"><p><span style="font-weight: bold; font-size:1.1em;">永平寺</span><br /><br />〒910-1228　福井県吉田郡永平寺町志比5-15<br />TEL：0776-63-3102</p></div>';
	this.contents[03] = '<div style="width: 285px; overflow: hidden; color:#333333; text-align:left;"><p><span style="font-weight: bold; font-size:1.1em;">芝政ワールド</span><br />〒913-0005　福井県坂井市三国町浜地45-1<br />TEL：0776-81-2110<br />FAX：0776-81-2118</p></div>';
	this.contents[04] = '<div style="width: 285px; overflow: hidden; color:#333333; text-align:left;"><p><span style="font-weight: bold; font-size:1.1em;">恐竜博物館</span><br /><br />〒911-8601　福井県勝山市村岡町寺尾51-11<br />TEL：0779-88-0001　FAX：0779-88-8700</p></div>';

	//google map 初期設定
	this.initialize = function() {
		this.mapdiv = document.getElementById('map_canvas02');
		var myOptions = {
				zoom: 12,//zoom率
				center: new google.maps.LatLng(36.22862727373645, 136.19115829467773),//真ん中の位置
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				scaleControl: true
		}
		this.map = new google.maps.Map(this.mapdiv, myOptions);

		var dataCount = this.point.length;
		var i = 0;
		for(i=0;i<dataCount;i++)
		{
			this.WindowOpenflg = false;
			// 初期状態でウィンドウを表示したくない場合は下記3行を削除
			if (i == (this.defaultNumber-1)) {
				this.WindowOpenflg = true;
			}
			this.createMarker(this.point[i],this.contents[i], i , this.WindowOpenflg);
		}


	};

	this.createMarker = function(point,htmlData,cnt, WindowOpenflg)
	{
		var MarkerSetting = null;
		var MakerImg = new google.maps.MarkerImage();
		var ShadowImg = new google.maps.MarkerImage();

		if ( point == this.point[0] ){
			MakerImg.url            = "common/js/mapimage2/flag0.png"; //アイコン画像パス
			MakerImg.size         = new google.maps.Size(46, 56); //アイコンサイズ
			MakerImg.iconAnchor       = new google.maps.Point(10, 34); //アイコンの表示開始位置（0,0）は左上角から
		} else {
			MakerImg.url            = "common/js/mapimage2/flag" + cnt +".png";
			MakerImg.size         = new google.maps.Size(34, 41);
			MakerImg.iconAnchor       = new google.maps.Point(10, 34);
		}

		var MarkerSetting = {
				icon: MakerImg,
				map: this.map
		};


		var marker = new google.maps.Marker();
		marker.setPosition(point);
		marker.setOptions(MarkerSetting);
		google.maps.event.addListener(marker, 'click', function() {

		if (currentInfoWindow) {
				currentInfoWindow.close();
			}
			var infowindow = new google.maps.InfoWindow({content:htmlData});
			infowindow.open(this.map,marker);
			currentInfoWindow = infowindow;
		});

		if (WindowOpenflg) {
			if (currentInfoWindow) {
				currentInfoWindow.close();
			}
			var infowindow = new google.maps.InfoWindow({content:htmlData});
			infowindow.open(this.map,marker);
			currentInfoWindow = infowindow;
		}

		return marker;
	};


	this.myclick = function(HtmlCnt) {
		this.createMarker(this.point[HtmlCnt], this.contents[HtmlCnt], HtmlCnt , true);
	};

}
var objMap_Action = new Map_Action();
