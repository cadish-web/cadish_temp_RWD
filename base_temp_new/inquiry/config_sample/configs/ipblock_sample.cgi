## !連続送信をブロックする秒数
## デフォルトは3600秒（1時間）で長いため、5分くらいに変更してください
$config{'ipblock.time'} = 300;

## IPアドレスを記録するディレクトリ
$config{"ipblock.dir"} = "$config{'data.dir'}ipblock/";

## エラーメッセージ
$lang{'ErrorCode11'} = 'ご利用のIPアドレスは現在送信が制限されています。<br>時間をおいてから再度ご送信ください。<br>Sending currently is restricted for your IP address. Please try again later.';

1;