document.addEventListener("DOMContentLoaded", function () {
    let chatbotIcon = document.getElementById("chatbot-icon");
    let chatbotContainer = document.getElementById("chatbot-container");
    let sendButton = document.getElementById("chatbot-send");
    let closeButton = document.getElementById("chatbot-close");
    let languageButton = document.getElementById("chatbot-language");
    let languageDropdown = document.getElementById("chatbot-language-select");
    let messagesContainer = document.getElementById("chatbot-messages");

    let chatId = localStorage.getItem("chatbotChatId");
    if (!chatId) {
        chatId = crypto.randomUUID();
        localStorage.setItem("chatbotChatId", chatId);
    }

    let firstMessageSent = false;
    let currentLanguage = "ru";

    let isBotResponding = false;

    const inputField = document.getElementById("chatbot-input");
    const API_URL = "https://e1ea-77-221-159-128.ngrok-free.app/ask";
    // const API_URL = chatbotSettings.apiUrl || "";


    const translations = {
        ru: {
            greeting: "Привет. У вас есть вопрос? Я здесь, чтобы помочь.",
            placeholder: "Задайте вопрос...",
            header: "Mastcert"
        },
        en: {
            greeting: "Hi there. Got a question? I'm here to help.",
            placeholder: "Ask a question...",
            header: "Mastcert"
        }
    };

    function animateClose() {
        chatbotContainer.style.opacity = "0";
        chatbotContainer.style.transform = "scale(0.9)";
        chatbotIcon.classList.add("closing");
        setTimeout(() => {
            chatbotIcon.classList.remove("open");
            chatbotContainer.style.opacity = "1";
            chatbotContainer.style.transform = "scale(1)";
            setTimeout(() => {
                chatbotIcon.classList.remove("closing");
            }, 200);
        }, 300);
    }

    function animateOpen() {
        chatbotIcon.classList.add("open");
        chatbotContainer.style.opacity = "0";
        chatbotContainer.style.transform = "scale(0.9)";
        setTimeout(() => {
            chatbotContainer.style.opacity = "1";
            chatbotContainer.style.transform = "scale(1)";
        }, 300);
    }

    function createLoadingMessage() {
        let botMessage = document.createElement("div");
        botMessage.classList.add("bot-message");

        let botText = document.createElement("span");
        botText.classList.add("bot-text");

        let loadingDots = document.createElement("div");
        loadingDots.classList.add("loading-dots");
        loadingDots.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        botMessage.appendChild(botText);
        botMessage.appendChild(loadingDots);

        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

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

        typeText(responseText, botText);
    }

    function typeText(text, targetElement) {
        let index = 0;
        let interval = setInterval(() => {
            if (index < text.length) {
                targetElement.textContent += text[index];
                index++;
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            } else {
                clearInterval(interval);
            }
        }, 10);
    }

    function sendMessage() {
        if (isBotResponding) return;
        isBotResponding = true;
        sendButton.disabled = true;

        let message = inputField.value.trim();
        if (!message) {
            isBotResponding = false;
            sendButton.disabled = false;
            return;
        }

        messagesContainer.innerHTML += `<div class="user-message">${message}</div>`;
        saveMessage("user", message);

        inputField.value = "";
        inputField.style.height = "40px";

        let botLoadingMessage = createLoadingMessage();

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message, chati_id: chatId })
        })
        .then(response => response.json())
        .then(data => {
            turnDotsIntoText(botLoadingMessage, data.response);
            saveMessage("bot", data.response);
        })
        .catch(error => {
            console.error("Ошибка:", error);
            turnDotsIntoText(botLoadingMessage, "Server error");
            turnDotsIntoText(botLoadingMessage, "Try again later");
            saveMessage("bot", "Server error. Try again later");
        })
        .finally(() => {
            isBotResponding = false;
            sendButton.disabled = false;
        });
    }

    inputField.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    });

    sendButton.addEventListener("click", sendMessage);

    inputField.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    chatbotIcon.addEventListener("click", function () {
        if (!chatbotIcon.classList.contains("open")) {
            animateOpen();
    
            if (!firstMessageSent) {
                firstMessageSent = true;
                messagesContainer.innerHTML = "";
                loadChatHistory();
            
                const history = JSON.parse(localStorage.getItem("chatbotHistory") || "[]");
                if (history.length === 0) {
                    setTimeout(() => {
                        let botMessage = createLoadingMessage();
                        turnDotsIntoText(botMessage, translations[currentLanguage].greeting);
                        saveMessage("bot", translations[currentLanguage].greeting);
                    }, 600);
                }
            }            
        }
    });

    closeButton.addEventListener("click", function (event) {
        event.stopPropagation();
        animateClose();
    });

    languageButton.addEventListener("click", toggleLanguageDropdown);
    function toggleLanguageDropdown(event) {
        event.stopPropagation();
        languageDropdown.style.display =
            languageDropdown.style.display === "block" ? "none" : "block";
    }

    document.addEventListener("click", function (event) {
        if (!languageButton.contains(event.target) && !languageDropdown.contains(event.target)) {
            languageDropdown.style.display = "none";
        }
    });

    document.querySelectorAll("#chatbot-language-select button").forEach(button => {
        button.addEventListener("click", function () {
            currentLanguage = this.dataset.lang;
            languageDropdown.style.display = "none";
            updateUI();
        });
    });

    function updateUI() {
        document.getElementById("chatbot-header").innerHTML = `
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
            ${translations[currentLanguage].header}
            <button id="chatbot-close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>
        `;
    
        inputField.placeholder = translations[currentLanguage].placeholder;
    
        languageButton = document.getElementById("chatbot-language");
        languageDropdown = document.getElementById("chatbot-language-select");
        closeButton = document.getElementById("chatbot-close");
    
        languageButton.addEventListener("click", toggleLanguageDropdown);
    
        document.querySelectorAll("#chatbot-language-select button").forEach(button => {
            button.addEventListener("click", function () {
                currentLanguage = this.dataset.lang;
                languageDropdown.style.display = "none";
    
                updateUI();
            });
        });
    
        closeButton.addEventListener("click", function (event) {
            event.stopPropagation();
            animateClose();
        });
    }

    function saveMessage(role, text) {
        const history = JSON.parse(localStorage.getItem("chatbotHistory") || "[]");
        history.push({ role, text });
        localStorage.setItem("chatbotHistory", JSON.stringify(history));
    }
    
    function loadChatHistory() {
        const history = JSON.parse(localStorage.getItem("chatbotHistory") || "[]");
        history.forEach(msg => {
            if (msg.role === "user") {
                messagesContainer.innerHTML += `<div class="user-message">${msg.text}</div>`;
            } else if (msg.role === "bot") {
                const botMessage = document.createElement("div");
                botMessage.classList.add("bot-message");
    
                const botText = document.createElement("span");
                botText.classList.add("bot-text");
                botText.textContent = msg.text;
    
                botMessage.appendChild(botText);
                messagesContainer.appendChild(botMessage);
            }
        });
    
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});
