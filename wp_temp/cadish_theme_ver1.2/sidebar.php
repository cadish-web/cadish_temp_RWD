
<?php dynamic_sidebar('home-widget-area'); ?>
<div class="side_block">
<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('widget-side') ) : ?>
<?php endif; ?>
</div>
