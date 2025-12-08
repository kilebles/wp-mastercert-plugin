document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.chatbot-input');
    const chatWindow = document.getElementById('chatWindow');
    const chatMessages = document.getElementById('chatMessages');
    const chatBack = document.getElementById('chatBack');
    const chatSend = document.getElementById('chatSend');
    const body = document.body;

    ChatStorage.loadChatHistory(chatMessages);

    // Открываем чат при клике на поле ввода
    input.addEventListener('focus', () => {
        if (!body.classList.contains('expanded')) {
            body.classList.add('expanded');
        }
    });

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
        chatMessages.scrollTop = chatMessages.scrollHeight;

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

    // Закрываем чат при клике на кнопку назад
    if (chatBack) {
        chatBack.addEventListener('click', () => {
            body.classList.remove('expanded');
            input.blur(); // Убираем фокус с поля ввода
        });
    }

    window.displayBotResponse = function (text) {
        const msg = document.createElement('div');
        msg.classList.add('chat-message', 'bot');
        msg.textContent = text;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        ChatStorage.saveMessage("bot", text);
    };
});