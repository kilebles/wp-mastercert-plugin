document.addEventListener("DOMContentLoaded", function() {
    let chatbotIcon = document.getElementById("chatbot-icon");
    let chatbotContainer = document.getElementById("chatbot-container");
    let sendButton = document.getElementById("chatbot-send");
    let closeButton = document.getElementById("chatbot-close");
    let inputField = document.getElementById("chatbot-input");
    let messagesContainer = document.getElementById("chatbot-messages");

    console.log("Chatbot script loaded!");

    if (!chatbotIcon || !chatbotContainer) {
        console.error("Ошибка: не найдены элементы чат-бота.");
        return;
    }

    chatbotIcon.addEventListener("click", function() {
        chatbotIcon.classList.add("open");
    });

    closeButton.addEventListener("click", function(event) {
        event.stopPropagation();
        chatbotIcon.classList.remove("open");
    });

    sendButton.addEventListener("click", function() {
        let message = inputField.value.trim();
        if (!message) return;

        messagesContainer.innerHTML += `<div class="user-message">${message}</div>`;

        setTimeout(() => {
            messagesContainer.innerHTML += `<div class="bot-message">Ответ GPT...</div>`;
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);

        inputField.value = "";
    });
});
