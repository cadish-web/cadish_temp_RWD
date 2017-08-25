var Map_Action1 = function() {
	var currentInfoWindow = null;//最後に出したウィンドウ

	this.point = new Array();//座標配列
	this.contents = new Array();//内容配列

	this.defaultNumber = 1; // 最初にオープンするウィンドウ
	this.WindowOpenflg = false;

	//マーカー表示の座標設定
	this.point[0] = new google.maps.LatLng( 36.161268, 137.231832 ); //初期スポット
	this.point[1] = new google.maps.LatLng( 36.167020, 137.237473 ); //スポット1
	this.point[2] = new google.maps.LatLng( 36.150178, 137.233780 ); //スポット2
	this.point[3] = new google.maps.LatLng( 36.146178, 137.252194 ); //スポット3
	this.point[4] = new google.maps.LatLng( 36.132667, 137.235392 ); //スポット4


	//吹き出しの中身
	this.contents[0] = '<div style="width: 340px; overflow: hidden; color:#333333;"><p><span style="font-weight: bold; font-size:1.1em;">株式会社キャディッシュ</span><br />〒506-0045<br />岐阜県高山市赤保木町1169-7<br />TEL：0577-36-3604<br />FAX：0577-35-0202</p></div>';
	this.contents[1] = '<div style="width: 340px; overflow: hidden; color:#333333;"><p><span style="font-weight: bold; font-size:1.2em;">JA岐阜厚生連久美愛厚生病院</span><br />〒506-0043<br />岐阜県高山市中切町1-1<br />TEL：0577-32-1115</p></div>';
	this.contents[2] = '<div style="width: 340px; overflow: hidden; color:#333333;"><p><span style="font-weight: bold; font-size:1.2em;">飛騨高山ビッグアリーナ</span><br />〒506-0051<br />岐阜県高山市中山町600番地<br />TEL：0577-34-3333<br />FAX：0577-34-4448</p></div>';
	this.contents[3] = '<div style="width: 340px; overflow: hidden; color:#333333;"><p><span style="font-weight: bold; font-size:1.2em;">高山市役所</span><br />〒506-8555<br />高山市花岡町2丁目18番地<br />TEL：0577-32-3333</p></div>';
	this.contents[4] = '<div style="width: 340px; overflow: hidden; color:#333333;"><p><span style="font-weight: bold; font-size:1.2em;">飛騨の里</span><br />〒506-0055<br />岐阜県高山市上岡本町1丁目590<br />TEL：0577-34-4711</p></div>';

	//google map 初期設定
	this.initialize = function() {
		this.mapdiv = document.getElementById('map_canvas01');
		var myOptions = {
				zoom: 13,//zoom率
				center: new google.maps.LatLng( 36.161268, 137.231832 ),//真ん中の位置
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				scaleControl: true
		}
		this.map = new google.maps.Map(this.mapdiv, myOptions);

		var dataCount = this.point.length;
		var i = 0;
		for(i=0;i<dataCount;i++)
		{
			this.WindowOpenflg = false;
			if (i == (this.defaultNumber-1)) {
				this.WindowOpenflg = true;
			}
			this.createMarker(this.point[i],this.contents[i], this.WindowOpenflg);
		}

	};

	this.createMarker = function(point,htmlData, WindowOpenflg)
	{
		var MarkerSetting = null;
		var MakerImg = new google.maps.MarkerImage();
		var ShadowImg = new google.maps.MarkerImage();

		MakerImg.url            = "common/js/mapimage/flag.png"; //アイコン画像パス
		MakerImg.size         = new google.maps.Size(18, 31); //アイコンサイズ
		MakerImg.iconAnchor       = new google.maps.Point(10, 34); //アイコンの表示開始位置（0,0）は左上角から

		ShadowImg.url           = "common/js/mapimage/shadow.png"; //影画像パス
		ShadowImg.size       = new google.maps.Size(31, 34); //影サイズ
		ShadowImg.iconAnchor       = new google.maps.Point(10, 34); //アイコンの表示開始位置（0,0）は左上角から
		var MarkerSetting = {
			icon: MakerImg,
			shadow: ShadowImg,
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
		this.createMarker(this.point[HtmlCnt], this.contents[HtmlCnt], true);
	};

}
var objMap_Action1 = new Map_Action1();
