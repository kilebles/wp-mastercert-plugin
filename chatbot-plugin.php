<?php
/*
Plugin Name: Mastercert Chatbot
Plugin URI: https://mastcert.com/
Description: Чат-бот GPT для консультаций по сертификации.
Version: 2.1
Author: Yee
Author URI: https://mastcert.com/
License: GPL2
*/

if (!defined('ABSPATH')) {
    exit;
}

require_once plugin_dir_path(__FILE__) . 'admin/settings.php';
require_once plugin_dir_path(__FILE__) . 'admin/save_settings.php';

function chatbot_enqueue_scripts() {
    wp_enqueue_style('chatbot-style', plugins_url('/public/chatbot.css', __FILE__));
    wp_enqueue_script('chatbot-script', plugins_url('/public/chatbot.js', __FILE__), array('jquery'), null, true);

    $options = get_option('chatbot_settings');
    $api_url = isset($options['chatbot_api_url']) ? $options['chatbot_api_url'] : '';

    wp_localize_script('chatbot-script', 'chatbotSettings', array(
        'apiUrl' => $api_url,
    ));
}
add_action('wp_enqueue_scripts', 'chatbot_enqueue_scripts');

function chatbot_display() {
    ob_start();
    include plugin_dir_path(__FILE__) . 'templates/chatbot.php';
    return ob_get_clean();
}
add_shortcode('chatbot', 'chatbot_display');

register_uninstall_hook(__FILE__, 'chatbot_uninstall');
function chatbot_uninstall() {
    require_once plugin_dir_path(__FILE__) . 'admin/uninstall.php';
    chatbot_uninstall_procedure();
}
