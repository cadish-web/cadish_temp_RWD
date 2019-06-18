my %ipblock = ();
$ipblock{'path'} = "$config{'ipblock.dir'}$ENV{'REMOTE_ADDR'}\.cgi";
if(-f $ipblock{'path'}){
	$ipblock{'time'} = (stat($ipblock{'path'}))[9] + $config{'ipblock.time'};
	if(time < $ipblock{'time'}){
		$_ErrorScreen = 1;
		# configs/ipblock_sample.cgiで指定した$lang{} 箇所の Warning 以降の文字列を入れてください
		# デフォルトの 11 のままだとうまく動きません。
		$Error = 'ipBlock';
	}
}
&_SAVE($ipblock{'path'},time);
1;