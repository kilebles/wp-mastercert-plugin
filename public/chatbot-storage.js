document.addEventListener("DOMContentLoaded", () => {
    window.ChatStorage = {
        saveMessage(role, text) {
            const history = JSON.parse(localStorage.getItem("chatbotHistory") || "[]");
            history.push({ role, text });
            localStorage.setItem("chatbotHistory", JSON.stringify(history));
        },

        loadChatHistory(container) {
            const history = JSON.parse(localStorage.getItem("chatbotHistory") || "[]");
            history.forEach(msg => {
                const div = document.createElement("div");
                div.classList.add("chat-message", msg.role === "user" ? "user" : "bot");
                div.textContent = msg.text;
                container.appendChild(div);
            });
            container.scrollTop = container.scrollHeight;
        },

        clearHistory() {
            localStorage.removeItem("chatbotHistory");
        }
    };
});