## !許可するURLのリストを改行区切りで
## http,httpsやwwwの有無など、送信される可能性のあるURLを記載してください。
## htaccessなどで正規化している場合は正規化後のURLだけでいいです。
## ※ mailformpro本体を設置しているディレクトリは指定しないこと！！！
$config{'referercheck'} = <<'__URI__';
https://www.example/inquiry/
__URI__

$lang{'WarningRefererCheck'} = '送信元が確認できなかったため、メールを送信できませんでした。<br>We could not send mail because the sender could not be confirmed.';

1;