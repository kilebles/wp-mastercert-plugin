<div class="chat-container">
    <div class="chat-window" id="chatWindow">
        <div class="chat-close" id="chatClose">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </div>
        <div class="chat-messages" id="chatMessages"></div>
    </div>
    <div class="chatbot-bar">
        <input type="text" class="chatbot-input" placeholder="Введите ваш вопрос...">
        <button class="chatbot-send" id="chatSend">
            <img src="<?php echo plugin_dir_url(dirname(__FILE__)) . 'public/gpt-icon.png'; ?>" alt="GPT" class="gpt-icon">
        </button>
    </div>
</div>

<img src="<?php echo plugin_dir_url(dirname(__FILE__)) . 'public/bot-icon.png'; ?>" alt="Bot" class="bot-icon">