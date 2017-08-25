var Map_Action2 = function() {
	var currentInfoWindow = null;//最後に出したウィンドウ

	this.keyArray = {};

	this.defaultNumber = 1; // 最初にオープンするウィンドウ
	this.WindowOpenflg = false;

	/* 各スポットの設定
			point : スポットの座標
			contents : 情報ウィンドウ
			flag : ピンとして立てる画像名
	*/
	this.keyArray[0] = { point : new google.maps.LatLng(36.2234172, 136.1910285), contents : '<div style="width: 285px; overflow: hidden; color:#333333; text-align:left;"><p><span style="font-weight: bold; font-size:1.1em;">清風荘</span><br /><br />〒910-4104　福井県あわら市温泉3-803<br />TEL：0776-77-2500　FAX：0776-77-2515</p></div>', flag : 'flag1' };
	this.keyArray[1] = { point : new google.maps.LatLng(36.237653, 136.125425), contents : '<div style="width: 285px; overflow: hidden; color:#333333; text-align:left;"><p><span style="font-weight: bold; font-size:1.1em;">東尋坊</span><br /><br />〒913-0063　福井県坂井市三国町東尋坊<br />TEL：0776-82-3111</p></div>', flag : 'flag2' };
	this.keyArray[2] = { point : new google.maps.LatLng(36.0557259243218, 136.355438232421), contents : '<div style="width: 285px; overflow: hidden; color:#333333; text-align:left;"><p><span style="font-weight: bold; font-size:1.1em;">永平寺</span><br /><br />〒910-1228　福井県吉田郡永平寺町志比5-15<br />TEL：0776-63-3102</p></div>', flag : 'flag3' };
	this.keyArray[3] = { point : new google.maps.LatLng(36.2507573, 136.1761575), contents : '<div style="width: 285px; overflow: hidden; color:#333333; text-align:left;"><p><span style="font-weight: bold; font-size:1.1em;">芝政ワールド</span><br />〒913-0005　福井県坂井市三国町浜地45-1<br />TEL：0776-81-2110<br />FAX：0776-81-2118</p></div>', flag : 'flag2' };
	this.keyArray[4] = { point : new google.maps.LatLng(36.083346, 136.506639), contents : '<div style="width: 285px; overflow: hidden; color:#333333; text-align:left;"><p><span style="font-weight: bold; font-size:1.1em;">恐竜博物館</span><br /><br />〒911-8601　福井県勝山市村岡町寺尾51-11<br />TEL：0779-88-0001　FAX：0779-88-8700</p></div>', flag : 'flag1' };


	//google map 初期設定
	this.initialize = function() {
		this.mapdiv = document.getElementById('map_canvas02'); //マップ出したいとこのid名
		var myOptions = {
				zoom: 10,//zoom率
				center: new google.maps.LatLng(36.2234172, 136.1910285), //真ん中の位置
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				scaleControl: true
		};
		this.map = new google.maps.Map(this.mapdiv, myOptions);

		var j = 0;
		for( var i in this.keyArray)	{
			if(this.keyArray.hasOwnProperty(i)){
				this.WindowOpenflg = false;
				// 初期状態でウィンドウを表示したくない場合は下記3行を削除
				if ( j == (this.defaultNumber-1) ) {
					this.WindowOpenflg = true;
				}
				this.createMarker(this.keyArray[i].point,this.keyArray[i].contents, this.keyArray[i].flag , this.WindowOpenflg);
				j++;
			}
		}

	};

	this.createMarker = function(point,htmlData,flag, WindowOpenflg)
	{
		var MarkerSetting = null;
		var MakerImg = new google.maps.MarkerImage();

		MakerImg.url = "common/js/mapimage3/" + flag +".png"; //パスは適宜変更
		MakerImg.size = new google.maps.Size(27, 40);
		MakerImg.iconAnchor = new google.maps.Point(10, 34);

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
		this.createMarker(this.keyArray[HtmlCnt].point, this.keyArray[HtmlCnt].contents, this.keyArray[HtmlCnt].flag , true);
	};

};
var objMap_Action2 = new Map_Action2();
