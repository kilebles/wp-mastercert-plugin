<?php
/*
Plugin Name: GPT Chatbot
Plugin URI: https://mastcert.com/
Description: Чат-бот GPT для консультаций по сертификации.
Version: 2.0
Author: Yee
Author URI: https://mastcert.com/
License: GPL2
*/

function chatbot_enqueue_scripts() {
    wp_enqueue_style('chatbot-style', plugins_url('/public/chatbot.css', __FILE__));
    wp_enqueue_script('chatbot-script', plugins_url('/public/chatbot.js', __FILE__), array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'chatbot_enqueue_scripts');

function chatbot_display() {
    ob_start();
    include(plugin_dir_path(__FILE__) . 'templates/chatbox.php');
    return ob_get_clean();
}
add_shortcode('chatbot', 'chatbot_display');

register_uninstall_hook(__FILE__, 'chatbot_uninstall');
function chatbot_uninstall() {
    delete_option('chatbot_settings'); 
}
?>
