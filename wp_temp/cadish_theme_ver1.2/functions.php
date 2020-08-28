<?php
/* -----------------------------------------------------
	▽srcsetを削除
----------------------------------------------------- */
add_filter( 'wp_calculate_image_srcset', '__return_false' );

/* -----------------------------------------------------
	▽Head内・管理画面・ログイン画面関係
----------------------------------------------------- */
// WordPressのバージョンを消す
remove_action('wp_head','wp_generator');

// wp_titleの$sepが空文字または半角スペースの場合は余分な空白削除
function my_title_fix($title, $sep, $seplocation){
	if(!$sep || $sep == " "){
		$title = str_replace(' '.$sep.' ', $sep, $title);
	}
	return $title;
}
add_filter('wp_title', 'my_title_fix', 10, 3);

/* ---------------------------------------------------------------
ファビコンを表示させたい場合は、下記のコメントアウトを外し、
表示させたい画像を「imgフォルダ」内に「favicon.ico」という名前で入れて下さい。
--------------------------------------------------------------- */
/*
function blog_favicon() {
	echo '<link rel="shortcut icon" type="image/x-icon" href="'.get_template_directory_uri().'/img/favicon.ico" />'."\n";
}
add_action('wp_head', 'blog_favicon');
*/

/* ---------------------------------------------------------------
サムネイル（アイキャッチ）を表示させたい場合は、下記のコメントアウトを外し、
40行目に記述してある数字を表示させたいサイズに合わせて変更して下さい。
※注意※　サムネイルを表示させるためにはテンプレート側にも修正が必要です。
--------------------------------------------------------------- */
/*
	if ( function_exists('add_theme_support') ) {
	add_theme_support('post-thumbnails');
	set_post_thumbnail_size( 160, 160, true );
}
*/

/* ---------------------------------------------------------------
管理画面でアイキャッチ画像のメタタグに説明文を入れたい場合は、
下記のコメントアウトを外し、上記で設定したサイズと同じサイズを記述して下さい。
--------------------------------------------------------------- */
/*
	add_filter( 'admin_post_thumbnail_html', 'add_featured_image_instruction');
	function add_featured_image_instruction( $content ) {
	return $content .= '<p>アイキャッチ画像として画像を追加するとサムネイルが表示されるようになります。<br />サイズは横160px、縦160pxになるようにしてください。</p>';
}
*/

/* ---------------------------------------------------------------
ログイン画面で施設名等のロゴを表示させたい場合は、下記のコメントアウトを外し、
画像を「幅：320px / 高さ56px」で作成後、「imgフォルダ」の中に「custom_login_logo.png」で入れて下さい。
--------------------------------------------------------------- */
/*
function custom_login_logo() {
echo '<style type="text/css">
#login h1 a {
	display: block;
	width: 320px;
	height: 56px;
	background: url('.get_template_directory_uri().'/img/custom_login_logo.png) no-repeat !important;
}
</style>'."\n";
}
add_action('login_head', 'custom_login_logo');
*/


/* -----------------------------------------------------
	▽ウィジェット関係
----------------------------------------------------- */
// ウィジェット対応
if ( function_exists('register_sidebar') )
	$widget_config_base = array(
		'before_widget' => '<div class="widget_box">'."\n",
		'after_widget' => '</div>'."\n",
		'before_title' => '<h3>',
		'after_title' => '</h3>'."\n",
	);
	register_sidebar(array(
		'name' => __('サイドエリア'),
		'id' => 'widget-side',
		'description' => __( 'サイドバーに表示されるフリーエリアです。'),
	)+$widget_config_base);


// ウィジェットにテキストエリアを追加 WP3.6以降
/* ------------------------------------------------------------------------

class MyWidgetItem extends WP_Widget {
	function MyWidgetItem() {
		parent::WP_Widget(false, $name = 'テキストボックス');
	}
	function widget($args, $instance) {
	extract( $args );
		// $title = apply_filters( 'widget_title', $instance['title'] );
		$body = apply_filters( 'widget_body', $instance['body'] );
	?>
	<div class="widget_box" >
		<!-- ?php if ( $title ) ? -->
		<!-- ?php echo $before_title . $title . $after_title; ? -->
		<?php echo '<p>' . $body . '</p>'; ?>
	</div>
	<?php
	}
	function update($new_instance, $old_instance) {
		$instance = $old_instance;
		// $instance['title'] = strip_tags($new_instance['title']);
		$instance['body'] = trim($new_instance['body']);
			return $instance;
	}
	function form($instance) {
		// $title = esc_attr($instance['title']);
		$body = esc_attr($instance['body']);
		?>

		<p>
		<label for="<!-- ?php echo $this->get_field_id('title'); ?>" -->
		<!-- ?php _e('サイトに表示されるコンテンツ:'); ? -->
		<!-- /label -->
		<!-- input class="widefat" id="<!-- ?php echo $this->get_field_id('title'); ?>" name="<!-- ?php echo $this->get_field_name('title'); ?>" type="text" value="<!--?php echo $title; ?>" />
		</p>

		<p>
		<label for="<?php echo $this->get_field_id('body'); ?>">
		<?php _e('サイトに表示されるコンテンツ:'); ?>
		</label>
		<textarea  class="widefat" rows="16" colls="20" id="<?php echo $this->get_field_id('body'); ?>" name="<?php echo $this->get_field_name('body'); ?>">
		<?php echo $body; ?>
		</textarea>
		</p>
	<?php
	}
}
add_action('widgets_init', create_function('', 'return register_widget("MyWidgetItem");'));
*/


/* -----------------------------------------------------
	▽エディタ関係
----------------------------------------------------- */
function custom_editor_settings( $initArray ){
    // WordPress3.X
    //$initArray['theme_advanced_blockformats'] = 'h4,h5,h6,p,address,pre,code,h4,h5,h6';
    // WordPress4.X
    $initArray['block_formats'] = "見出し4=h4; 見出し5=h5; 見出し6=h6; 段落=p; グループ=div;";
    return $initArray;
}
add_filter( 'tiny_mce_before_init', 'custom_editor_settings' );


// エディタ用に [ editor-area ] クラスを追加する
// function custom_editor_settings( $initArray ){
// 	$initArray['body_class'] = 'editor-area';
// }
// エディタ用のスタイルシートを使用する
// add_editor_style('css/editor-style.css');

/* -----------------------------------------------------
	▽本文抜粋関係
----------------------------------------------------- */
// 抜粋で表示したい文字数を変更
function new_excerpt_mblength($length) {
	return 240; // 抜粋で表示したい文字数
}
add_filter('excerpt_mblength', 'new_excerpt_mblength');

// 続きを読む、more-linkのハッシュを消す
function remove_more_jump_link($link) {
	$offset = strpos($link, '#more-');
	if ($offset) {
	$end = strpos($link, '"',$offset);
	}
	if ($end) {
	$link = substr_replace($link, '', $offset, $end-$offset);
	}
	return $link;
}
add_filter('the_content_more_link', 'remove_more_jump_link');


/* -----------------------------------------------------
	▽パン屑リスト
----------------------------------------------------- */
function breadcrumb($divOption = array("id" => "breadcrumb")){
	global $post;
	$str ='';
	if(!is_admin() || is_home() ){
		$tagAttribute = '';
		foreach($divOption as $attrName => $attrValue){
			$tagAttribute .= sprintf(' %s="%s"', $attrName, $attrValue);
		}
		$cnt = 3;
		$str.= '<ol'. $tagAttribute .' itemscope itemtype="http://schema.org/BreadcrumbList">'."\n";
		$str.= '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
		$str.= '<a href="http://www.example.com/" itemtype="http://schema.org/Thing" itemprop="item">';
		$str.= '<span itemprop="name">トップページ</span></a>';
		$str.= '<meta itemprop="position" content="1" />';
		$str.= '</li>'."\n";
		$str.= '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
		$str.= '<a href="'. home_url() .'/" itemtype="http://schema.org/Thing" itemprop="item">';
		$str.= '<span itemprop="name">ブログ</span></a>';
		$str.= '<meta itemprop="position" content="2" />';
		$str.= '</li>'."\n";
		if(is_category()) {
			$cat = get_queried_object();
			if($cat -> parent != 0){
				$ancestors = array_reverse(get_ancestors( $cat -> cat_ID, 'category' ));
				foreach($ancestors as $ancestor){
					$str.='<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
					$str.='<a href="'. get_category_link($ancestor) .'" itemtype="http://schema.org/Thing" itemprop="item">';
					$str.='<span itemprop="name">'. get_cat_name($ancestor) .'</span></a>';
					$str.='<meta itemprop="position" content="'. $cnt .'" />';
					$str.='</li>'."\n";
					$cnt++;
				}
			}
			$str.='<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
			$str.='<a href="'. get_category_link($cat -> slug) .'" itemtype="http://schema.org/Thing" itemprop="item">';
			$str.='<span itemprop="name">'. $cat -> name . '</span></a>';
			$str.='<meta itemprop="position" content="'. $cnt .'" />';
			$str.='</li>'."\n";
			$cnt++;
		} elseif(is_single()){
			$categories = get_the_category($post->ID);
			$cat = $categories[0];
			if($cat -> parent != 0){
				$ancestors = array_reverse(get_ancestors( $cat -> cat_ID, 'category' ));
				foreach($ancestors as $ancestor){
					$str.='<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
					$str.='<a href="'. get_category_link($ancestor).'" itemtype="http://schema.org/Thing" itemprop="item">';
					$str.='<span itemprop="name">'. get_cat_name($ancestor). '</span></a>';
					$str.='<meta itemprop="position" content="'. $cnt .'" />';
					$str.='</li>'."\n";
					$cnt++;
				}
			}
			$str.='<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
			$str.='<a href="'. get_category_link($cat -> term_id). '" itemtype="http://schema.org/Thing" itemprop="item">';
			$str.='<span itemprop="name">'. $cat-> cat_name . '</span></a>';
			$str.='<meta itemprop="position" content="'. $cnt .'" />';
			$str.='</li>'."\n";
			$cnt++;
			$str.='<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
			$str.='<a href="'. get_permalink(). '" itemtype="http://schema.org/Thing" itemprop="item">';
			$str.='<span itemprop="name">'. $post -> post_title .'</span></a>';
			$str.='<meta itemprop="position" content="'. $cnt .'" />';
			$str.='</li>'."\n";
			$cnt++;
		} elseif(is_page()){
			if($post -> post_parent != 0 ){
				$ancestors = array_reverse(get_post_ancestors( $post->ID ));
				foreach($ancestors as $ancestor){
					$str.='<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
					$str.='<a href="'. get_permalink($ancestor).'" itemscope itemtype="http://schema.org/Thing" itemprop="item">';
					$str.='<span itemprop="name">'. get_the_title($ancestor) .'</span></a>';
					$str.='<meta itemprop="position" content="'. $cnt .'" />';
					$str.='</li>'."\n";
					$cnt++;
				}
			}
			$str.='<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
			$str.='<a href="'. get_permalink().'" itemtype="http://schema.org/Thing" itemprop="item">';
			$str.='<span itemprop="name">'. $post -> post_title .'</span></a>';
			$str.='<meta itemprop="position" content="'. $cnt .'" />';
			$str.='</li>'."\n";
			$cnt++;
		} elseif(is_date()){
			if(get_query_var('day') != 0){
				$str.='<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
				$str.='<a href="'. get_year_link(get_query_var('year')). '" itemtype="http://schema.org/Thing" itemprop="item">';
				$str.='<span itemprop="name">' . get_query_var('year'). '年</span></a>';
				$str.='<meta itemprop="position" content="'. $cnt .'" />';
				$str.='</li>'."\n";
				$cnt++;
				$str.='<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
				$str.='<a href="'. get_month_link(get_query_var('year'), get_query_var('monthnum')). '" itemtype="http://schema.org/Thing" itemprop="item">';
				$str.='<span itemprop="name">'. get_query_var('monthnum') .'月</span></a>';
				$str.='<meta itemprop="position" content="'. $cnt .'" />';
				$str.='</li>'."\n";
				$cnt++;
				$str.='<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
				$str.='<a href="'. get_day_link(get_query_var('year'), get_query_var('monthnum'), get_query_var('day')). '" itemtype="http://schema.org/Thing" itemprop="item">';
				$str.='<span itemprop="name">'. get_query_var('day'). '日</span></a>';
				$str.='<meta itemprop="position" content="'. $cnt .'" />';
				$str.='</li>'."\n";
				$cnt++;
			} elseif(get_query_var('monthnum') != 0){
				$str.='<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
				$str.='<a href="'. get_year_link(get_query_var('year')) .'" itemtype="http://schema.org/Thing" itemprop="item">';
				$str.='<span itemprop="name">'. get_query_var('year') .'年</span></a>';
				$str.='<meta itemprop="position" content="'. $cnt .'" />';
				$str.='</li>'."\n";
				$cnt++;
				$str.='<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
				$str.='<a href="'. get_month_link(get_query_var('year'), get_query_var('monthnum')). '" itemtype="http://schema.org/Thing" itemprop="item">';
				$str.='<span itemprop="name">'. get_query_var('monthnum'). '月</span></a>';
				$str.='<meta itemprop="position" content="'. $cnt .'" />';
				$str.='</li>'."\n";
				$cnt++;
			} else {
				$str.='<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
				$str.='<a href="'. get_year_link(get_query_var('year')). '" itemtype="http://schema.org/Thing" itemprop="item">';
				$str.='<span itemprop="name">'. get_query_var('year') .'年</span></a>';
				$str.='<meta itemprop="position" content="'. $cnt .'" />';
				$str.='</li>'."\n";
				$cnt++;
			}
		} elseif(is_search()) {
			$str.='<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
			$str.='<a itemprop="item" href="'. home_url().'/?s='. get_search_query() .'" itemtype="http://schema.org/Thing">';
			$str.='<span itemprop="name">「'. get_search_query() .'」で検索した結果</span></a>';
			$str.='<meta itemprop="position" content="'. $cnt .'" />';
			$str.='</li>'."\n";
			$cnt++;
		} elseif(is_author()){
			$str .='<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
			$str .='<a itemprop="item" href="'.get_author_posts_url( get_the_author_meta( 'ID' ) ).'" itemtype="http://schema.org/Thing">';
			$str .='<span itemprop="name">投稿者 : '. get_the_author_meta('display_name', get_query_var('author')).'</span></a>';
			$str.='<meta itemprop="position" content="'. $cnt .'" />';
			$str .='</li>'."\n";
			$cnt++;
		} elseif(is_tag()){
			$str .='<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
			$str.='<a itemprop="item" href="'.get_tag_link($tag_id).'" itemtype="http://schema.org/Thing">';
			$str .='<span itemprop="name">タグ : '. single_tag_title( '' , false ). '</span></a>';
			$str.='<meta itemprop="position" content="'. $cnt .'" />';
			$str .='</li>'."\n";
			$cnt++;
		} elseif(is_attachment()){
			$str .='<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
			$str.= '<a itemprop="item" href="'.wp_get_attachment_image_src( $attachment_id, $size, $icon ).'" itemtype="http://schema.org/Thing">';
			$str .='<span itemprop="name">'. $post -> post_title .'</span></a>';
			$str.='<meta itemprop="position" content="'. $cnt .'" />';
			$str .='</li>'."\n";
			$cnt++;
		} elseif(is_404()){
			$str .='<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
			$str .='<span itemprop="name">404 Not found</span>';
			$str.='<meta itemprop="position" content="'. $cnt .'" />';
			$str .='</li>'."\n";
			$cnt++;
		} elseif(is_home()){
			$str.=''."\n";
		} else{
			$str .='<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
			$str.='<a itemprop="item" href="'.get_the_permalink().'" itemtype="http://schema.org/Thing">';
			$str .='<span itemprop="name">'. wp_title('', true) .'</span></a>';
			$str.='<meta itemprop="position" content="'. $cnt .'" />';
			$str .='</li>'."\n";
			$cnt++;
		}

		$str.='</ol>'."\n";
	}
	echo $str;
}


/*----------------------------------------------------------------------------------------
	デバイスで条件分岐
--------------------------------------------------------------------------------------- */
function is_mobile () {
	$useragents = array(
	'iPhone',         // Apple iPhone
	'iPod',           // Apple iPod touch
	'Android',        // 1.5+ Android
	'dream',          // Pre 1.5 Android
	'CUPCAKE',        // 1.5+ Android
	'blackberry9500', // Storm
	'blackberry9530', // Storm
	'blackberry9520', // Storm v2
	'blackberry9550', // Storm v2
	'blackberry9800', // Torch
	'webOS',          // Palm Pre Experimental
	'incognito',      // Other iPhone browser
	'webmate'         // Other iPhone browser
	);
	$pattern = '/'.implode('|', $useragents).'/i';
	return preg_match($pattern, $_SERVER['HTTP_USER_AGENT']);
	}

?>
