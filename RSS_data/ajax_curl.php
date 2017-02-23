<?php
$url = "http://sample/blog/feed";
$xml = curl_get_contents($url);
header("Content-type: application/xml; charset=UTF-8");
print $xml;

function curl_get_contents( $url, $timeout = 60 ){
	$ch = curl_init();
	curl_setopt( $ch, CURLOPT_URL, $url );
	curl_setopt( $ch, CURLOPT_HEADER, false );
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
	curl_setopt( $ch, CURLOPT_TIMEOUT, $timeout );
	$result = curl_exec( $ch );
	curl_close( $ch );
	return $result;
}
?>
