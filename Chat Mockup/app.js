const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const typingIndicator = document.getElementById('typingIndicator');
const usernameSelect = document.getElementById('usernameSelect');

let typingTimeout;

chatInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); 
    sendMessage(); 
  }
});


chatInput.addEventListener('input', () => {
  const username = usernameSelect.value;
  showTypingIndicator(username);

  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    hideTypingIndicator();
  }, 1500);
});

function showTypingIndicator(username) {
  typingIndicator.innerText = `${username} is typing...`;
  typingIndicator.style.display = 'block';
}

function hideTypingIndicator() {
  typingIndicator.style.display = 'none';
}

function sendMessage() {
  const message = chatInput.value.trim();
  const username = usernameSelect.value;

  if (!message) return;

  addMessage(username, message, 'you');
  chatInput.value = '';
  hideTypingIndicator();

  // Simulate reply from another user
  setTimeout(() => {
    const otherUsers = ['Bob', 'Charlie', 'Alice'].filter(name => name !== username);
    const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];
    const fakeReplies = [
      "Hey! This is a mockUp chat.",
      "Can you tell me more?",
      "That's funny 😂",
      "I totally agree.",
      "What do you think about it?"
    ];
    const randomMessage = fakeReplies[Math.floor(Math.random() * fakeReplies.length)];
    addMessage(randomUser, randomMessage, 'other');
  }, Math.random() * 2000 + 1000);
}

function addMessage(sender, text, type) {
  const messageEl = document.createElement('div');
  messageEl.classList.add('message', type);
  messageEl.innerText = `${sender}: ${text}`;
  chatMessages.appendChild(messageEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

