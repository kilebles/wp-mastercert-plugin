document.addEventListener("DOMContentLoaded", function() {
    let sendButton = document.getElementById("chatbot-send");
    let inputField = document.getElementById("chatbot-input");
    let messagesContainer = document.getElementById("chatbot-messages");

    sendButton.addEventListener("click", function() {
        let message = inputField.value.trim();
        if (!message) return;

        messagesContainer.innerHTML += `<div class="user-message">${message}</div>`;

        setTimeout(() => {
            messagesContainer.innerHTML += `<div class="bot-message">Ответ GPT...</div>`;
        }, 1000);

        inputField.value = "";
    });
});