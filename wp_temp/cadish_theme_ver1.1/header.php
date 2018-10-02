<!DOCTYPE html>
<html lang="ja">
<?php if (is_home()) { $og_type = 'blog'; } else { $og_type = 'article'; } ?>
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $og_type; ?>: http://ogp.me/ns/<?php echo $og_type; ?>#">
<meta charset="utf-8">
<meta name="author" content="<?php bloginfo('name'); ?>" />
<meta name="Description" content="<?php bloginfo('description'); ?>" />
<meta name="Keywords" content="<?php wp_title('', true, 'right'); ?>,<?php bloginfo('name'); ?>" />
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
<meta name="format-detection" content="telephone=no" />

<?php
global $page,$paged,$canonical_url;
if (is_home()) {
	$canonical_url  = get_bloginfo('url')."/";
} elseif (is_category()) {
	$canonical_url=get_category_link(get_query_var('cat'))."/";
} elseif (is_page() || is_single()) {
	$canonical_url = get_permalink()."/";
} elseif (is_date()) {
	$canonical_url=get_bloginfo('url')."/".get_query_var('year')."/";
	if( !is_year() ){
		$month = get_query_var('monthnum');
		if($month<10){$month='0'.$month;}
		$canonical_url = $canonical_url.$month."/";
		if( !is_month()) {
			$day = get_query_var('day');
			if($day<10){$day='0'.$day;}
			$canonical_url=$canonical_url.$day."/";
		}
	}
} elseif(is_404()) {
	$canonical_url =  get_bloginfo('url')."/404/";
} else {
	$canonical_url  = get_bloginfo('url')."/";
}

if ( $paged >= 2 || $page >= 2) {
	$canonical_url = $canonical_url.'page/'.max( $paged, $page ).'/';
}
?>
<link rel="canonical" href="<?php echo $canonical_url; ?>">

<!-- ここからOGP -->
<meta property="og:locale" content="ja_JP">
<meta property="og:site_name" content="<?php bloginfo('name'); ?>">
<meta property="og:title" content="<?php bloginfo('name'); if(!is_home()){ echo ' | '; } wp_title(' '); if (wp_title(' ', false)); ?>">
<meta property="og:type" content="<?php echo $og_type; ?>">
<meta property="og:url" content="<?php echo $canonical_url; ?>">
<?php
$str = $post->post_content;
$searchPattern = '/<img.*?src=(["\'])(.+?)\1.*?>/i';
$og_img = 'http://www.example.com/common/img/ogp.jpg';
if (is_single()){
	if (has_post_thumbnail()){
		$image_id = get_post_thumbnail_id();
		$image = wp_get_attachment_image_src( $image_id, 'full');
		$og_img = $image[0];
	} else if ( preg_match( $searchPattern, $str, $imgurl )){
		$og_img = $imgurl[2];
	}
}
?>
<meta property="og:image" content="<? echo $og_img ?>">
<!-- ここまでOGP -->

<title><?php bloginfo('name'); if(!is_home()){ echo ' | '; } wp_title(' '); if (wp_title(' ', false)); ?></title>

<link rel="alternate" href="<?php bloginfo('rss2_url'); ?>" type="application/rss+xml" title="RSS 2.0" />
<link rel="alternate" href="<?php bloginfo('rss_url'); ?>" type="text/xml" title="RSS .92" />
<link rel="alternate" href="<?php bloginfo('atom_url'); ?>" type="application/atom+xml" title="Atom 0.3" />

<?php /* CSSの読み込み 公式サイトで読み込んでいるCSSを使う場合は絶対パスで読み込む */ ?>
<link rel="stylesheet" href="http://www.example.com/common/css/import.css" media="all" />
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/style.css" media="all" />

<?php /* jsの読み込み 公式サイトで読み込んでいるjsを使う場合は絶対パスで読み込む */ ?>
<?php wp_deregister_script('jquery'); /* WordPressのjQueryを使わない */ ?>
<script src="http://www.example.com/common/js/jquery.min.js"></script>
<script src="http://www.example.com/common/js/jquery-dropdown.js"></script>
<script src="http://www.example.com/common/js/lineup.js"></script>
<script src="http://www.example.com/common/js/setting_option.js"></script>
<?php /* テーマ内で読み込む場合や、WordPressのjQueryを使う場合はこっち↓ */ ?>
<?php /* wp_enqueue_script('js_name', get_bloginfo('template_directory').'/js/js_name.js', array('jquery')); */ ?>

<!-- ▽ Googleアナリティクスタグ ▽ -->
<!-- △ Googleアナリティクスタグ △ -->
<?php wp_head(); ?>
</head>
<body>
<!-- ============ header_wrap GO ============ -->
<div id="header_wrap">
<header id="header">
	<h1><?php bloginfo('description'); ?>│<?php bloginfo('name'); ?></h1>
	<div id="head_logo"><a href="<?php echo home_url(); ?>"><img src="<?php echo get_template_directory_uri(); ?>/img/h_logo.png" alt="施設名が入ります"/></a></div>
	<ul id="head_nav">
		<li><a class="tel-link" href="tel:0000000000"><img src="<?php echo get_template_directory_uri(); ?>/img/h_tel.png" alt="TEL.000-000-0000"></a></li>
		<li><a href="#" target="_blank"><img src="<?php echo get_template_directory_uri(); ?>/img/h_planlist.png" alt="プラン一覧ご予約"></a></li>
	</ul>
</header>
</div>
<!-- ============ header_wrap END ============ -->

<!-- ============ nav_wrap GO ============ -->
<div id="nav_wrap">
<nav id="gnav">
<ul>
	<li id="gn_home"><a href="<?php echo home_url(); ?>"><img src="<?php echo get_template_directory_uri(); ?>/img/gn_01_off.png" alt="トップページ"></a></li>
	<li id="gn_01"><a href="#"><img src="<?php echo get_template_directory_uri(); ?>/img/gn_02_off.png" alt="温泉"></a></li>
	<li id="gn_02"><a href="#"><img src="<?php echo get_template_directory_uri(); ?>/img/gn_03_off.png" alt="お料理"></a></li>
	<li id="gn_03"><a href="#"><img src="<?php echo get_template_directory_uri(); ?>/img/gn_04_off.png" alt="お部屋"></a></li>
	<li id="gn_04"><a href="#"><img src="<?php echo get_template_directory_uri(); ?>/img/gn_05_off.png" alt="周辺観光"></a></li>
	<li id="gn_05"><a href="#"><img src="<?php echo get_template_directory_uri(); ?>/img/gn_06_off.png" alt="交通アクセス"></a></li>
</ul>
</nav>
</div>
<!-- ============ nav_wrap END ============ -->
