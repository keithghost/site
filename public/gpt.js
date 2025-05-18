<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChatGPT Clone</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #343541;
            color: #ececf1;
            height: 100vh;
            display: flex;
            flex-direction: column;
        }
        
        .navbar {
            background-color: #202123;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #4d4d4f;
        }
        
        .logo {
            font-size: 1.2rem;
            font-weight: bold;
            color: #ececf1;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .logo::before {
            content: "🤖";
        }
        
        .nav-links {
            display: flex;
            gap: 1.5rem;
        }
        
        .nav-links a {
            color: #ececf1;
            text-decoration: none;
            font-weight: 500;
        }
        
        .chat-container {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .message {
            max-width: 800px;
            margin: 0 auto;
            width: 100%;
            padding: 1rem;
            border-radius: 8px;
            line-height: 1.6;
        }
        
        .user-message {
            background-color: #444654;
            align-self: flex-end;
        }
        
        .bot-message {
            background-color: #40414f;
            align-self: flex-start;
        }
        
        .input-container {
            padding: 1rem;
            background-color: #40414f;
            border-top: 1px solid #4d4d4f;
        }
        
        .input-group {
            max-width: 800px;
            margin: 0 auto;
            display: flex;
            border-radius: 8px;
            overflow: hidden;
            background-color: #40414f;
            border: 1px solid #565869;
        }
        
        #user-input {
            flex: 1;
            padding: 1rem;
            background: transparent;
            border: none;
            color: #ececf1;
            font-size: 1rem;
            outline: none;
        }
        
        #send-btn {
            background-color: #10a37f;
            color: white;
            border: none;
            padding: 0 1.5rem;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s;
        }
        
        #send-btn:hover {
            background-color: #0d8a6a;
        }
        
        .typing-indicator {
            display: none;
            padding: 1rem;
            text-align: center;
            color: #a1a1a1;
        }
        
        .typing-dots {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
        }
        
        .typing-dot {
            width: 8px;
            height: 8px;
            background-color: #a1a1a1;
            border-radius: 50%;
            animation: typingAnimation 1.4s infinite ease-in-out;
        }
        
        .typing-dot:nth-child(1) {
            animation-delay: 0s;
        }
        
        .typing-dot:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-dot:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes typingAnimation {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-5px); }
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <a href="/" class="logo">ChatGPT</a>
        <div class="nav-links">
            <a href="/">Home</a>
            <a href="/yt">YouTube</a>
            <a href="/tiktok">TikTok</a>
        </div>
    </nav>
    
    <div class="chat-container" id="chat-container">
        <!-- Messages will appear here -->
        <div class="message bot-message">
            Hello! I'm ChatGPT. How can I help you today?
        </div>
    </div>
    
    <div class="typing-indicator" id="typing-indicator">
        <div class="typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
        <span>ChatGPT is typing...</span>
    </div>
    
    <div class="input-container">
        <div class="input-group">
            <input type="text" id="user-input" placeholder="Message ChatGPT..." autocomplete="off">
            <button id="send-btn">Send</button>
        </div>
    </div>

    <script>
        const chatContainer = document.getElementById('chat-container');
        const userInput = document.getElementById('user-input');
        const sendBtn = document.getElementById('send-btn');
        const typingIndicator = document.getElementById('typing-indicator');
        
        // Handle sending messages
        function sendMessage() {
            const message = userInput.value.trim();
            if (!message) return;
            
            // Add user message to chat
            addMessage(message, 'user');
            userInput.value = '';
            
            // Show typing indicator
            typingIndicator.style.display = 'block';
            chatContainer.scrollTop = chatContainer.scrollHeight;
            
            // Call ChatGPT API
            fetchChatGPTResponse(message);
        }
        
        // Add message to chat container
        function addMessage(content, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
            messageDiv.textContent = content;
            chatContainer.appendChild(messageDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
        
        // Fetch response from ChatGPT API
        async function fetchChatGPTResponse(query) {
            try {
                const response = await fetch(`https://apis-keith.vercel.app/ai/gpt?q=${encodeURIComponent(query)}`);
                const data = await response.json();
                
                if (data.status) {
                    addMessage(data.result, 'bot');
                } else {
                    addMessage("Sorry, I couldn't process your request. Please try again.", 'bot');
                }
            } catch (error) {
                console.error(error);
                addMessage("An error occurred while fetching the response.", 'bot');
            } finally {
                typingIndicator.style.display = 'none';
            }
        }
        
        // Event listeners
        sendBtn.addEventListener('click', sendMessage);
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });
        
        // Focus input on page load
        userInput.focus();
    </script>
</body>
</html>
