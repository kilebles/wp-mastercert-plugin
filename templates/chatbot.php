<div class="chat-container">
    <div class="chat-window" id="chatWindow">
        <div class="chat-header">
            <button class="chat-back" id="chatBack">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
            </button>
        </div>
        <div class="chat-messages" id="chatMessages"></div>
    </div>
    <div class="chatbot-bar">
        <button class="chatbot-search-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
            </svg>
        </button>
        <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Введите вопрос...">
        <button class="chatbot-send" id="chatSend">
            <img src="<?php echo plugin_dir_url(dirname(__FILE__)) . 'public/gpt-icon.png'; ?>" alt="GPT" class="gpt-icon">
        </button>
        <button class="chatbot-voice">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
        </button>
    </div>
</div>