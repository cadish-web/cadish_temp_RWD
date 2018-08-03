var Map_Action2 = function() {
	var currentInfoWindow = null;//最後に出したウィンドウ

	this.keyArray = {};

	this.defaultNumber = 1; // 最初にオープンするウィンドウ
	this.WindowOpenflg = false;

	/*--------------------------------------------
	 各スポットの設定
	--------------------------------------------*/
	/*
			point : スポットの座標
			contents : 吹き出しの内容
			flag : ピンとして立てる画像名

			増やす場合は this.keyArray[] = {〜}; をコピーして [] 内の数字が連番になるように変更してください。
	*/
	this.keyArray[0] = {
		point : new google.maps.LatLng(36.161268, 137.231832),
		contents : '<div style="width: 340px; overflow: hidden; color:#333333;"><p><span style="font-weight: bold; font-size:1.1em;">株式会社キャディッシュ</span><br />〒506-0045<br />岐阜県高山市赤保木町1169-7<br />TEL：0577-36-3604<br />FAX：0577-35-0202</p></div>',
		flag : 'flag1'
	};
	this.keyArray[1] = {
		point : new google.maps.LatLng(36.167020, 137.237473),
		contents : '<div style="width: 340px; overflow: hidden; color:#333333;"><p><span style="font-weight: bold; font-size:1.2em;">JA岐阜厚生連久美愛厚生病院</span><br />〒506-0043<br />岐阜県高山市中切町1-1<br />TEL：0577-32-1115</p></div>',
		flag : 'flag2'
	};
	this.keyArray[2] = {
		point : new google.maps.LatLng(36.150178, 137.233780),
		contents : '<div style="width: 340px; overflow: hidden; color:#333333;"><p><span style="font-weight: bold; font-size:1.2em;">飛騨高山ビッグアリーナ</span><br />〒506-0051<br />岐阜県高山市中山町600番地<br />TEL：0577-34-3333<br />FAX：0577-34-4448</p></div>',
		flag : 'flag3'
	};
	this.keyArray[3] = {
		point : new google.maps.LatLng(36.146178, 137.252194),
		contents : '<div style="width: 340px; overflow: hidden; color:#333333;"><p><span style="font-weight: bold; font-size:1.2em;">高山市役所</span><br />〒506-8555<br />高山市花岡町2丁目18番地<br />TEL：0577-32-3333</p></div>',
		flag : 'flag2'
	};
	this.keyArray[4] = {
		point : new google.maps.LatLng(36.132667, 137.235392),
		contents : '<div style="width: 340px; overflow: hidden; color:#333333;"><p><span style="font-weight: bold; font-size:1.2em;">飛騨の里</span><br />〒506-0055<br />岐阜県高山市上岡本町1丁目590<br />TEL：0577-34-4711</p></div>',
		flag : 'flag1'
	};
	/*-- 各スポットの設定 ここまで --*/


	/*--------------------------------------------
	 Google map 初期設定
	--------------------------------------------*/
	var mapId = 'map_canvas02', //マップを出す箇所のid名
			defaultPoint = new google.maps.LatLng( 36.161268, 137.231832 ), // マップの真ん中
			defaultZoom = 13; //zoom率 数字が小さくなるほど広い範囲を表示します。
	/*-- Google map 初期設定 ここまで --*/

	this.initialize = function() {
		this.mapdiv = document.getElementById(mapId);
		var myOptions = {
				zoom: defaultZoom,
				center: defaultPoint,
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

		/*--------------------------------------------
		 アイコンの設定
		--------------------------------------------*/
		// 画像の相対パスはjsを読み込むhtmlからのものになります。
		// jsを設置しているディレクトリからの相対パスではないので注意してください。
		// 表示開始位置は基本的に変更しなくてもok。表示した時に位置がずれるようであれば修正してください。
		MakerImg.url = "common/mapimage3/" + flag + ".png"; //アイコン画像パス / flag には各スポットの設定でflagに設定した画像名が入ります。
		MakerImg.size = new google.maps.Size(27, 40); //アイコンサイズ
		MakerImg.iconAnchor = new google.maps.Point(10, 34); //アイコンの表示開始位置（0,0）は左上角から
		/*-- アイコンの設定 ここまで --*/

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
