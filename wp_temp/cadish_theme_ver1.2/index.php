<?php get_header(); ?>
<!-- ============ contents_wrap GO ============= -->
<div id="contents_wrap">
<div id="contents">
<?php breadcrumb(); ?>

<!-- ============ main_area GO ============= -->
<div id="main_area">
<main role="main">

<?php if (is_search()) { /* 検索結果 */ ?>

<section>
<?php
	$allsearch = new WP_Query("s=$s&posts_per_page=-1");
	$key = esc_html($s, 1);
	$count = $allsearch->post_count;
	if($count!=0){
	echo '<h2>「'.$key.'」の検索結果　（'.$count.'件）</h2>';
	} else {
	echo '<h2>「'.$key.'」の検索結果（0件）</h2>';
	}
?>

<ul class="post_list">
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	<li><?php the_time('Y.m.d') ?> [ <?php if (the_category(', '))  the_category(); ?> ] <a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title(); ?>"><?php the_title(); ?></a></li>
<?php endwhile; endif; ?>
</ul>
</section>

<div class="pagenavi_area">
<?php if(function_exists('wp_pagenavi')) { wp_pagenavi();} ?>
</div>

<?php } elseif (is_404()) { /* 404エラーページ */ ?>

<section>
	<h2>404 - Not Found</h2>
	<div class="post_body">
		<p>お探しのページが見つかりませんでした。</p>
		<p>ページが移転したか、一時的に閲覧できない状態になっている可能性があります。<br />
		誠に申し訳ありませんがサイト内を検索して頂くか、トップページに戻って閲覧をお続けください。</p>
	</div>
</section>

<?php } else { /* トップページ・記事詳細・固定ページ・アーカイブ等 */ ?>

<?php if (is_category()) { ?>
<p>「<?php single_cat_title(); ?>」の記事一覧</p>
<?php } elseif (is_tag()) { ?>
<p>「<?php echo single_tag_title(); ?>」の記事一覧</p>
<?php } elseif (is_archive()) { ?>
<p>「<?php echo get_the_date('Y年m月'); ?>」の記事一覧</p>
<?php } ?>

<?php if (is_single()) { /* 記事詳細ページ */ ?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<section>
	<h2><?php the_title(); ?></h2>
	<div class="post_body"><?php the_content('&raquo;&raquo;　続きを読む '); ?></div>
	<div class="postmeta_txt"><?php the_time('Y.m.d') ?> | <?php if (the_category(', '))  the_category(); ?><?php if (get_the_tags()) the_tags(' | Tags: ', ', ', ''); ?></div>
</section>

<div class="article_nav">
	<ul>
		<li class="prev"><?php if(get_adjacent_post(false, '', true)) { ?><?php previous_post_link('%link', '&laquo; 前の記事へ', false); ?><?php }else{ ?>&laquo; 前の記事へ<?php } ?></li>
		<li class="next"><?php if(get_adjacent_post(false, '', false)) { ?><?php next_post_link('%link ', '次の記事へ &raquo;', false); ?><?php }else{ ?>次の記事へ &raquo;<?php } ?></li>
	</ul>
</div>
<?php endwhile; endif; ?>
<?php comments_template( ); /* コメント機能を使わない場合は、この一文（34行目）を削除 */?>

<?php } else { /* 記事詳細ページ以外 */ ?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<section>
	<h2><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title(); ?>"><?php the_title(); ?></a></h2>
	<div class="post_body"><?php the_content('&raquo;&raquo;　続きを読む '); ?></div>
	<?php if ( !(is_page()) ) { ?>
	<div class="postmeta_txt"><?php the_time('Y.m.d') ?> | <?php if (the_category(', '))  the_category(); ?><?php if (get_the_tags()) the_tags(' | Tags: ', ', ', ''); ?></div>
	<?php } ?>
</section>
<?php endwhile; endif; ?>

<div class="pagenavi_area">
<?php if(function_exists('wp_pagenavi')) { wp_pagenavi();} ?>
</div>
<?php } ?>

<?php } ?>
</main>
</div>
<!-- ============ main_area END ============ -->

<!-- ============ side_area GO ================= -->
<div id="side_area">
<aside>
<?php get_template_part('sidebar'); ?>
</aside>
</div>
<!-- ============ side_area END ================ -->

</div>
</div>
<!-- ============ contents_wrap END ============= -->


<?php get_footer(); ?>
