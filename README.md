# cadish_temp_RWD
レスポンシブ対応テンプレートパッケージ

## 各ディレクトリ説明

- リキッドレイアウト用テンプレート：[base_temp/](base_temp/)
- レスポンシブレイアウトテンプレート：[base_temp_new/](base_temp_new/)
- wordpressテンプレート：[wp_temp/](wp_temp/)
- 各jsサンプル：[js_sample/](js_sample/)
- ブログ等rss書き出し：[RSS_data/](RSS_data/)


## ChangeLog

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