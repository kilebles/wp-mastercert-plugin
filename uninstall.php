<?php
if (!defined('WP_UNINSTALL_PLUGIN')) {
    die;
}
delete_option('chatbot_settings');
?>