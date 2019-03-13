
<!-- ============ footer_wrap GO ============ -->
<div id="footer_wrap">
<div id="backtop"><a href="#header_wrap" title="ページのトップへ戻る">↑ページのトップへ戻る</a></div>

	<footer id="footer" role="contentinfo" itemscope itemtype="http://schema.org/WPFooter">
	<address>
	<img src="<?php echo get_template_directory_uri(); ?>/img/ft_logo.png" alt="施設名が入ります">
	<span>〒000‐000</span><span>岐阜県高山市赤保木町1169-7</span><a class="tel-link" href="tel:0000000000">TEL.000-000-0000</a>
	</address>

	<ul id="fnav">
		<li><a href="#">トップページ</a></li>
		<li><a href="#">温泉</a></li>
		<li><a href="#">お料理</a></li>
		<li><a href="#">お部屋</a></li>
		<li><a href="#">館内案内</a></li>
		<li><a href="#">周辺観光</a></li>
		<li><a href="#">交通アクセス</a></li>
		<li><a href="#">ご予約・プラン一覧</a></li>
		<li><a href="#">お問い合わせ</a></li>
		<li><a href="#">プライバシーポリシー</a></li>
		<li><a href="#">キャンセルポリシー</a></li>
	</ul>
	<p id="copyright">COPYRIGHT &copy; <script type="text/javascript">myDate= new Date();myYear=myDate.getFullYear();document.write(myYear);</script> <?php bloginfo('name'); ?>. ALL RIGHTS RESERVED</p>
	</footer>

</div>
<!-- ============ footer_wrap END ============ -->
<?php /* jsの読み込み 公式サイトで読み込んでいるjsを使う場合は絶対パスで読み込む */ ?>
<script src="http://www.example.com/common/js/jquery.min.js"></script>
<script src="http://www.example.com/common/js/jquery-dropdown.js"></script>
<script src="http://www.example.com/common/js/lineup.js"></script>
<script src="http://www.example.com/common/js/setting_option.js"></script>
<?php wp_footer(); ?>
</body>
</html>
