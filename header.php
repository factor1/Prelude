<!doctype html>
<!--[if lt IE 7 ]><html lang="en" class="no-js ie ie6"><![endif]-->
<!--[if IE 7 ]><html lang="en" class="no-js ie ie7"><![endif]-->
<!--[if IE 8 ]><html lang="en" class="no-js ie ie8"><![endif]-->
<!--[if IE 9 ]><html lang="en" class="no-js ie ie9"><![endif]-->
<!--[if gt IE 9]><html lang="en" class="no-js ie"><![endif]-->
<!--[if !IE]><!--><html <?php language_attributes(); ?> class="no-js"><!--<![endif]-->
<head profile="http://gmpg.org/xfn/11">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<?php if ( is_search() ) : ?>
	   <meta name="robots" content="noindex, nofollow">
    <?php endif; ?>

	<meta property="og:title" content="<?php the_title(); ?>">
	<meta property="og:site_name" content="<?php bloginfo( 'name' ) ?>">

	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

	<?php if ( is_singular() ) wp_enqueue_script( 'comment-reply' ); ?>

	<?php wp_head(); ?>
	<!--[if IE 8]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<script src="<?php bloginfo( 'template_url' ); ?>/js/modernizer.js"></script>
	<![endif]-->
</head>
<body <?php body_class(); ?>>

	<header role="banner">
        <div class="site-logo">
            <h1>
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo( 'name' ); ?></a>
            </h1>
        </div>
	</header>

    <!-- Navigation menu -->
    <?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>

    <!-- Custom social menu -->
    <?php f1_social_menu(); ?>

    <!-- Search form -->
    <?php get_search_form(); ?>

    <!-- Begin main content -->
    <main role="main">
