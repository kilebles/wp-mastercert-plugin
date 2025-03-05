<?php
if (!defined('ABSPATH')) {
    exit;
}

function chatbot_settings_init() {
    register_setting('chatbot_settings_group', 'chatbot_settings');

    add_settings_section(
        'chatbot_settings_section',
        'Основные настройки плагина',
        'chatbot_settings_section_desc',
        'chatbot_settings_page'
    );

    add_settings_field(
        'chatbot_api_url',
        'URL для запросов к Chatbot',
        'chatbot_api_url_field',
        'chatbot_settings_page',
        'chatbot_settings_section'
    );
}
add_action('admin_init', 'chatbot_settings_init');

function chatbot_settings_section_desc() {
    echo '<p>Укажите URL-адрес сервера, куда будут отправляться запросы GPT Chatbot.</p>';
}

function chatbot_api_url_field() {
    $options = get_option('chatbot_settings');
    $api_url = isset($options['chatbot_api_url']) ? esc_attr($options['chatbot_api_url']) : '';
    echo '<input type="text" name="chatbot_settings[chatbot_api_url]" value="'.$api_url.'" size="50" />';
}

function chatbot_add_settings_page() {
    add_menu_page(
        'GPT Chatbot',
        'GPT Chatbot',
        'manage_options',
        'chatbot_settings_page',
        'chatbot_settings_page_html',
        'dashicons-admin-generic'
    );
}
add_action('admin_menu', 'chatbot_add_settings_page');

function chatbot_settings_page_html() {
    if (!current_user_can('manage_options')) {
        return;
    }

    ?>
    <div class="wrap">
        <h1>Настройки GPT Chatbot</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('chatbot_settings_group');
            do_settings_sections('chatbot_settings_page');
            submit_button('Сохранить настройки');
            ?>
        </form>
    </div>
    <?php
}
