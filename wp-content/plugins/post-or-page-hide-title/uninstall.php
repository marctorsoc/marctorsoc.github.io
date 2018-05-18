<?php
if (!defined('WP_UNINSTALL_PLUGIN'))
    exit();

function post_or_page_deactivation() {
    global $wpdb;

    $wpdb->query($wpdb->prepare('DELETE FROM ' . $wpdb->postmeta . ' WHERE meta_key="post_or_pages_title"'));
}

post_or_page_deactivation();
