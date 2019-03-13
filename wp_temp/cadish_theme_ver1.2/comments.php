<?php if ( post_password_required() ) { return; } ?>

<div id="comments" class="comments-area">

<?php if ( have_comments() ) : ?>
<h2 id="main_title">コメント</h2>
<ol class="comment-list">
	<?php
	wp_list_comments( array(
	'style'       => 'ol',
	'short_ping'  => true,
	'avatar_size' => 56,
	) );
	?>
</ol><!-- .comment-list -->
<?php endif; // have_comments() ?>

<?php if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) : ?>
<p class="no-comments">コメントは受け付けておりません。</p>
<?php endif; ?>

<?php comment_form(); ?>

</div><!-- .comments-area -->
