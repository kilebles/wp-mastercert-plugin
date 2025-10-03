document.addEventListener("DOMContentLoaded", function () {
    const chatMessages = document.getElementById("chatMessages");

    const API_URL = "https://spbssk.space/ask";
    // const API_URL = chatbotSettings.apiUrl || "";

    let chatId = localStorage.getItem("chatbotChatId");
    if (!chatId) {
        chatId = crypto.randomUUID();
        localStorage.setItem("chatbotChatId", chatId);
    }

    let isBotResponding = false;

    function createLoadingMessage() {
        let botMessage = document.createElement("div");
        botMessage.classList.add("chat-message", "bot");

        let botText = document.createElement("span");
        botText.classList.add("bot-text");

        let loadingDots = document.createElement("div");
        loadingDots.classList.add("loading-dots");
        loadingDots.innerHTML = `<span></span><span></span><span></span>`;

        botMessage.appendChild(botText);
        botMessage.appendChild(loadingDots);
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        return botMessage;
    }

    function turnDotsIntoText(botMessageElement, responseText) {
        if (!botMessageElement) return;

        let dots = botMessageElement.querySelector(".loading-dots");
        if (dots) dots.remove();

        let botText = botMessageElement.querySelector(".bot-text");
        if (!botText) {
            botText = document.createElement("span");
            botText.classList.add("bot-text");
            botMessageElement.appendChild(botText);
        }

        botText.style.opacity = 0;
        botText.textContent = responseText;

        requestAnimationFrame(() => {
            botText.style.transition = "opacity 0.4s ease";
            botText.style.opacity = 1;
        });

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    window.askBot = function (userMessage) {
        if (isBotResponding) return;
        isBotResponding = true;

        let botLoadingMessage = createLoadingMessage();

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: userMessage,
                chat_id: chatId
            })
        })
        .then(response => response.json())
        .then(data => {
            setTimeout(() => {
                turnDotsIntoText(botLoadingMessage, data.response);
                ChatStorage.saveMessage("bot", data.response); // сохраняем историю
                isBotResponding = false;
            }, 800);
        })
        .catch(error => {
            console.error("Ошибка:", error);
            setTimeout(() => {
                const fallback = "Ошибка сервера. Попробуйте позже.";
                turnDotsIntoText(botLoadingMessage, fallback);
                displayBotResponse(fallback);
                isBotResponding = false;
            }, 800);
        });
    };
});