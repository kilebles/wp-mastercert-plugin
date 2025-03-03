document.addEventListener("DOMContentLoaded", function () {
    let chatbotIcon = document.getElementById("chatbot-icon");
    let chatbotContainer = document.getElementById("chatbot-container");
    let sendButton = document.getElementById("chatbot-send");
    let closeButton = document.getElementById("chatbot-close");
    let languageButton = document.getElementById("chatbot-language");
    let languageDropdown = document.getElementById("chatbot-language-select");
    let messagesContainer = document.getElementById("chatbot-messages");
    let firstMessageSent = false;
    let firstOpen = true;
    let currentLanguage = "ru";
    const inputField = document.getElementById("chatbot-input");
    const translations = {
        ru: {
            greeting: "Привет! Чем могу помочь?",
            gpt_response: "Ответ GPT...",
            placeholder: "Задайте вопрос...",
            header: "Ваш виртуальный помощник"
        },
        en: {
            greeting: "Hello! How can I help you?",
            gpt_response: "GPT response...",
            placeholder: "Ask a question...",
            header: "Your Virtual Assistant"
        }
    };


    inputField.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    });


    function sendMessage() {
        let message = inputField.value.trim();
        if (!message) return;
    
        messagesContainer.innerHTML += `<div class="user-message">${message}</div>`;
    
        setTimeout(() => {
            typeText(translations[currentLanguage].gpt_response);
        }, 1000);
    
        inputField.value = "";
    
        inputField.style.height = "40px";  
    }
    

    chatbotIcon.addEventListener("click", function () {
        chatbotIcon.classList.add("open");
    
        if (firstOpen) {
            chatbotContainer.style.opacity = "0";
            setTimeout(() => {
                chatbotContainer.style.opacity = "1";
                firstOpen = false;
            }, 500);
        } else {
            setTimeout(() => {
                chatbotContainer.style.opacity = "1";
            }, 300);
        }

        if (!firstMessageSent) {
            firstMessageSent = true;
            messagesContainer.innerHTML = "";
            setTimeout(() => {
                typeText(translations[currentLanguage].greeting);
            }, 1000);
        }
    });


    closeButton.addEventListener("click", function (event) {
        event.stopPropagation();

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
    });


    sendButton.addEventListener("click", sendMessage);


    inputField.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });


    languageButton.addEventListener("click", toggleLanguageDropdown);


    function toggleLanguageDropdown(event) {
        event.stopPropagation();
        languageDropdown.style.display = languageDropdown.style.display === "block" ? "none" : "block";
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

            messagesContainer.innerHTML = "";
            firstMessageSent = false;
            updateUI();
            typeText(translations[currentLanguage].greeting);
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
            <button id="chatbot-close">✖</button>
        `;

        sendButton.textContent = translations[currentLanguage].send;
        inputField.placeholder = translations[currentLanguage].placeholder;

        languageButton = document.getElementById("chatbot-language");
        languageDropdown = document.getElementById("chatbot-language-select");
        closeButton = document.getElementById("chatbot-close");

        languageButton.addEventListener("click", toggleLanguageDropdown);

        document.querySelectorAll("#chatbot-language-select button").forEach(button => {
            button.addEventListener("click", function () {
                currentLanguage = this.dataset.lang;
                languageDropdown.style.display = "none";
                messagesContainer.innerHTML = "";
                firstMessageSent = false;
                updateUI();
                typeText(translations[currentLanguage].greeting);
            });
        });

        closeButton.addEventListener("click", function (event) {
            event.stopPropagation();
            chatbotContainer.style.opacity = "0";

            setTimeout(() => {
                chatbotIcon.classList.remove("open");
            }, 100);
        });
    }
    

    function typeText(text) {
        let botMessage = document.createElement("div");
        botMessage.classList.add("bot-message");
        messagesContainer.appendChild(botMessage);

        let index = 0;
        let interval = setInterval(() => {
            if (index < text.length) {
                botMessage.textContent += text[index];
                index++;
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            } else {
                clearInterval(interval);
            }
        }, 30);
    }
});
