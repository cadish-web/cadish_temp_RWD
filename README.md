# cadish_temp_RWD
レスポンシブ対応テンプレートパッケージ

---

## 各ディレクトリ説明

- リキッドレイアウト用テンプレート：[base_temp/](base_temp/)
- レスポンシブレイアウトテンプレート：[base_temp_new/](base_temp_new/)
- wordpressテンプレート：[wp_temp/](wp_temp/)
- 各jsサンプル：[js_sample/](js_sample/)
- ブログ等rss書き出し：[RSS_data/](RSS_data/)

---

## ChangeLog

### 2018-11-28
- base_temp, base_temp_new のお問い合わせフォーム 設定ファイルのサンプルを更新_

### 2018-11-01
- base_temp内html header箇所に構造化マークアップ用のrole等を追加
- wp_temp/cadish_theme_ver1.1 タグ構造をbase_temp_newに合わせて変更
- base_temp/_htaccess, base_temp_new/_htaccess 内のバックスペースを削除

### 2018-09-21
- js_sample/jquery.slick/index.html 参考サイトを一件追加


### 2018-09-11
- base_temp_newにreadme.md追加


### 2018-08-17
- jquery-dropdown スムーススクロールを併用した時にページ内リンクで閉じる処理が効かなくなるバグを修正
- js_sample サンプルスタイルを微修正


### 2018-08-10
- base_temp, base_temp_new 各htmlページトップボタンのidを修正
- jquery-dropdown.js PCサイズ時にナビの親要素が消えてしまう不具合があったため修正


### 2018-08-09
- js_sample/jquery.smoothscroll 固定ヘッダーがある場合の処理を微調整
- js_sample/jquery.loadmove サンプルを追加


### 2018-08-08
- js_sample/jquery.navFix サンプルを追加
- js_sample/jquery.pagetopFade サンプルを追加
- js_sample/jquery.fbResize サンプルを追加


### 2018-08-07
- js_sample/jquery.slick 左右矢印付きカルーセルのサンプルを追加
- js_sample/scrollAnimation サンプルCSSを微修正
- js_sample/jquery.tab 上下連動するタブのサンプルを追加・jsを改修
- js_sample/jquery.smoothscroll 固定ヘッダー分ずらすサンプルを追加<br>
（サンプル：js_sample/jquery.smoothscroll/index_02.html）
- 各setting_option.js smoothscrollに関する注意を追加
- js_sample/jquery.tel-link サンプルを追加
- js_sample/jquery.imgSize サンプルを追加


### 2018-08-06
- jquery.tabを改修
  - 同一ページ内でパネルを開いて移動させる処理を追加<br>
  （サンプル：js_sample/jquery.tab/index.html）
  - 別ページからパネルを開いて移動させる処理を追加<br>
	（サンプル：js_sample/jquery.tab/index_04.html）
- js_sample/jquery.smoothscroll サンプルを追加
  - 上記jsにアニメーションさせないようにするクラスを追加（setting_option.jsに組み込み済）
- js_sample/scrollAnimation サンプルを追加


### 2018-08-03
- 全html内jsを`</body>`直前で読み込むように修正（セットで使用するcssはそのままhead内にあります）
- base_temp_new/, js_sample/ 各html meta viewport から initial-scale=1.0 を削除
- base_temp_new/ breakpointを600pxからに変更
- jqueryを最新の3.3.1に変更
- 以下のプラグインを削除
  - jquery-lineup.min.js
  - jquery.heightLine
  - jquery.jcarousel
  - jquery.slide_panel
- jquery.dropdown_menuを改修
  - #gnav領域外をタップで閉じる処理を実装
  - 開閉用のクラスを任意で設定できるように修正
  - 開閉時の挙動を若干修正
- 各jsに利用方法の説明文等を追記