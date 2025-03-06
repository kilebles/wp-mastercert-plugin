document.addEventListener("DOMContentLoaded", function () {
    let chatbotIcon = document.getElementById("chatbot-icon");
    let chatbotContainer = document.getElementById("chatbot-container");
    let sendButton = document.getElementById("chatbot-send");
    let closeButton = document.getElementById("chatbot-close");
    let languageButton = document.getElementById("chatbot-language");
    let languageDropdown = document.getElementById("chatbot-language-select");
    let messagesContainer = document.getElementById("chatbot-messages");
    let firstMessageSent = false;
    let currentLanguage = "ru";
    let loadingElement = null;
    const inputField = document.getElementById("chatbot-input");
    const API_URL = "https://ca62-77-221-159-128.ngrok-free.app/ask";
    // const API_URL = chatbotSettings.apiUrl || "";

    const translations = {
        ru: {
            greeting: "Привет. У вас есть вопрос? Я здесь, чтобы помочь.",
            gpt_response: "Ответ GPT...",
            placeholder: "Задайте вопрос...",
            header: "Mastercert"
        },
        en: {
            greeting: "Hi there. Got a question? I'm here to help.",
            gpt_response: "GPT response...",
            placeholder: "Ask a question...",
            header: "Mastercert"
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

    function showLoadingAnimation() {
        loadingElement = document.createElement("div");
        loadingElement.classList.add("bot-message", "loading");

        loadingElement.innerHTML = `
            <svg class="loading-dots" width="50" height="20" viewBox="0 0 50 20" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="5" fill="#888">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" begin="0"/>
                </circle>
                <circle cx="25" cy="10" r="5" fill="#888">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" begin="0.2s"/>
                </circle>
                <circle cx="40" cy="10" r="5" fill="#888">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" begin="0.4s"/>
                </circle>
            </svg>
        `;

        messagesContainer.appendChild(loadingElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function hideLoadingAnimation() {
        if (loadingElement) {
            loadingElement.classList.remove("loading");
            loadingElement.innerHTML = ""; 
        }
    }

    function sendMessage() {
        let message = inputField.value.trim();
        if (!message) return;

        messagesContainer.innerHTML += `<div class="user-message">${message}</div>`;
        inputField.value = "";
        inputField.style.height = "40px";

        showLoadingAnimation();

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            hideLoadingAnimation();
            let lastBotMessage = messagesContainer.querySelector(".bot-message:last-of-type");
            typeText(data.response, lastBotMessage);
        })
        .catch(error => {
            hideLoadingAnimation();
            let lastBotMessage = messagesContainer.querySelector(".bot-message:last-of-type");
            typeText("Ошибка связи с сервером", lastBotMessage);
            console.error("Ошибка:", error);
        });
    }


    
    function typeText(text, targetElement = null) {
        let botMessage;
        
        if (targetElement) {
            botMessage = targetElement;
        } else {
            botMessage = document.createElement("div");
            botMessage.classList.add("bot-message");
            messagesContainer.appendChild(botMessage);
        }

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
                setTimeout(() => {
                    typeText(translations[currentLanguage].greeting);
                }, 1000);
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
            <button id="chatbot-close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>
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
            animateClose();
        });
    }
});
