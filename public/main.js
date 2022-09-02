const socket = io.connect('', { forceNew: true });

// Render Chat messages

function renderChat(data) {
  const html = data
    .map((chat) => {
      return `
            <div>
                <p>${chat.date}</p>
                <strong>${chat.mail}</strong>: 
                <em>${chat.message}</em>         
            </div>   
            `;
    })
    .join(' ');

  document.getElementById('messages').innerHTML = html;
};

// Send new message

function sendData(e) {
  const mail = document.getElementById('mail');
  const text = document.getElementById('msg');
  const token = document.getElementById('token');

  const date = new Date();

  const data = {
    mail: mail.value,
    token: token.value,
    type: 'user', 
    message: text.value,
    date: date.toLocaleString()
  };

  text.value = ' ';
  socket.emit('new-message', data);
};



socket.on('chat', (data) => {
  renderChat(data);
});

