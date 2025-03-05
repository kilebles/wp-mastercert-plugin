<?php
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

function chatbot_uninstall_procedure() {
    delete_option('chatbot_settings');
}
