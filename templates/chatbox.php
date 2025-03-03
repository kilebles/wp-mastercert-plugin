<div id="chatbot-icon">
    <img src="<?php echo plugin_dir_url(dirname(__FILE__)) . 'public/bot-icon.png'; ?>" alt="Chatbot">
    <div id="chatbot-container">
        <div id="chatbot-header">
            <button id="chatbot-language">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M2 12h20"></path>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"></path>
                    <path d="M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10"></path>
                </svg>
            </button>
            
            <div id="chatbot-language-select">
                <button data-lang="ru">Русский</button>
                <button data-lang="en">English</button>
            </div>
            Ваш виртуальный помощник
            <button id="chatbot-close">✖</button>
        </div>
        <div id="chatbot-messages"></div>
        <div id="chatbot-input-container">
            <textarea id="chatbot-input" placeholder="Задайте вопрос..." rows="1"></textarea>
            <button id="chatbot-send"></button>
        </div>
    </div>
</div>