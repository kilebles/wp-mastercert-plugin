<?php
if (!defined('ABSPATH')) {
    exit;
}

add_filter('pre_update_option_chatbot_settings', 'chatbot_custom_save_logic', 10, 2);
function chatbot_custom_save_logic($new_value, $old_value) {
    if (!empty($new_value['chatbot_api_url']) && !filter_var($new_value['chatbot_api_url'], FILTER_VALIDATE_URL)) {
        add_settings_error('chatbot_settings', 'invalid_url', 'Указанный URL некорректен.');
        return $old_value;
    }
    return $new_value;
}
