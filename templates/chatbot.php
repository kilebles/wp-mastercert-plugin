<div class="chat-container">
    <div class="chat-window" id="chatWindow">
        <div class="chat-messages" id="chatMessages"></div>
    </div>
    <div class="chatbot-bar">
        <button class="chatbot-edit-icon">
            <img src="<?php echo plugin_dir_url(dirname(__FILE__)) . 'public/Edit.png'; ?>" alt="Edit">
        </button>
        <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Написать...">
        <button class="chatbot-send" id="chatSend">
            <img src="<?php echo plugin_dir_url(dirname(__FILE__)) . 'public/gpt.gif'; ?>" alt="GPT" class="gpt-icon">
        </button>
        <button class="chatbot-voice">
            <img src="<?php echo plugin_dir_url(dirname(__FILE__)) . 'public/Mic.png'; ?>" alt="Mic">
        </button>
        <button class="chatbot-back" id="chatBack">
            <img src="<?php echo plugin_dir_url(dirname(__FILE__)) . 'public/back.png'; ?>" alt="Back">
        </button>
    </div>
</div>