document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.chatbot-input');
    const chatWindow = document.getElementById('chatWindow');
    const chatMessages = document.getElementById('chatMessages');
    const chatClose = document.querySelector('.chat-close');
    const chatSend = document.getElementById('chatSend');
    const body = document.body;

    ChatStorage.loadChatHistory(chatMessages);

    function sendMessage() {
        if (input.value.trim() === '') return;

        if (!body.classList.contains('expanded')) {
            body.classList.add('expanded');
        }

        const message = input.value.trim();
        input.value = '';

        const msg = document.createElement('div');
        msg.classList.add('chat-message', 'user');
        msg.textContent = message;

        chatMessages.appendChild(msg);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        ChatStorage.saveMessage("user", message);

        if (typeof askBot === 'function') {
            askBot(message);
        }
    }

    input.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }

    if (chatClose) {
        chatClose.addEventListener('click', () => {
            body.classList.remove('expanded');
        });
    }

    window.displayBotResponse = function (text) {
        const msg = document.createElement('div');
        msg.classList.add('chat-message', 'bot');
        msg.textContent = text;
        chatMessages.appendChild(msg);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        ChatStorage.saveMessage("bot", text);
    };
});