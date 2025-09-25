<?php
/**
 * Woostify
 *
 * @package woostify
 */

// Define constants.
define( 'WOOSTIFY_VERSION', '2.4.2' );
define( 'WOOSTIFY_PRO_MIN_VERSION', '1.7.2' );
define( 'WOOSTIFY_THEME_DIR', get_template_directory() . '/' );
define( 'WOOSTIFY_THEME_URI', get_template_directory_uri() . '/' );

// Woostify svgs icon.
require_once WOOSTIFY_THEME_DIR . 'inc/class-woostify-icon.php';

// Woostify functions, hooks.
require_once WOOSTIFY_THEME_DIR . 'inc/woostify-functions.php';
require_once WOOSTIFY_THEME_DIR . 'inc/woostify-template-hooks.php';
require_once WOOSTIFY_THEME_DIR . 'inc/woostify-template-builder.php';
require_once WOOSTIFY_THEME_DIR . 'inc/woostify-template-functions.php';

// Woostify generate css.
require_once WOOSTIFY_THEME_DIR . 'inc/customizer/class-woostify-webfont-loader.php';
require_once WOOSTIFY_THEME_DIR . 'inc/customizer/class-woostify-fonts-helpers.php';
require_once WOOSTIFY_THEME_DIR . 'inc/customizer/class-woostify-get-css.php';

// Woostify customizer.
require_once WOOSTIFY_THEME_DIR . 'inc/class-woostify.php';
require_once WOOSTIFY_THEME_DIR . 'inc/customizer/class-woostify-customizer.php';

// Woostify woocommerce.
if ( woostify_is_woocommerce_activated() ) {
	require_once WOOSTIFY_THEME_DIR . 'inc/woocommerce/class-woostify-woocommerce.php';
	require_once WOOSTIFY_THEME_DIR . 'inc/woocommerce/class-woostify-adjacent-products.php';
	require_once WOOSTIFY_THEME_DIR . 'inc/woocommerce/woostify-woocommerce-template-functions.php';
	require_once WOOSTIFY_THEME_DIR . 'inc/woocommerce/woostify-woocommerce-archive-product-functions.php';
	require_once WOOSTIFY_THEME_DIR . 'inc/woocommerce/woostify-woocommerce-single-product-functions.php';
	require_once WOOSTIFY_THEME_DIR . 'inc/woocommerce/woostify-woocommerce-query-update.php';
}

// Woostify admin.
if ( is_admin() ) {
	require_once WOOSTIFY_THEME_DIR . 'inc/admin/class-woostify-admin.php';
	require_once WOOSTIFY_THEME_DIR . 'inc/admin/class-woostify-meta-boxes.php';
}

// Compatibility.
require_once WOOSTIFY_THEME_DIR . 'inc/compatibility/class-woostify-divi-builder.php';

/**
 * Note: Do not add any custom code here. Please use a custom plugin so that your customizations aren't lost during updates.
 */
// 🔎 WooCommerce search me product categories aur tags bhi include karo
function custom_search_products_by_category( $query ) {
    if ( ! is_admin() && $query->is_main_query() && $query->is_search() ) {
        if ( $query->get( 'post_type' ) === 'product' ) {
            add_filter( 'posts_join', 'custom_search_join_terms' );
            add_filter( 'posts_where', 'custom_search_where_terms' );
            add_filter( 'posts_distinct', 'custom_search_distinct' );
        }
    }
}
add_action( 'pre_get_posts', 'custom_search_products_by_category' );

// join product terms (categories + tags)
function custom_search_join_terms( $join ) {
    global $wpdb;
    $join .= " LEFT JOIN {$wpdb->term_relationships} tr ON ({$wpdb->posts}.ID = tr.object_id)
               LEFT JOIN {$wpdb->term_taxonomy} tt ON (tr.term_taxonomy_id = tt.term_taxonomy_id)
               LEFT JOIN {$wpdb->terms} t ON (tt.term_id = t.term_id)";
    return $join;
}

// include categories & tags in search
function custom_search_where_terms( $where ) {
    global $wpdb;
    if ( is_search() && ! is_admin() ) {
        $term = esc_sql( get_query_var( 's' ) );
        if ( $term ) {
            $where .= " OR (t.name LIKE '%{$term}%')";
        }
    }
    return $where;
}

// avoid duplicate results
function custom_search_distinct( $distinct ) {
    return "DISTINCT";
}
// ✅ Force Add to Cart button on shop & category pages
add_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 20 );
