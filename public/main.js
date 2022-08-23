const socket = io.connect('', { forceNew: true });

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

function sendData(e) {
  const mail = document.getElementById('mail');
  const text = document.getElementById('msg');
  const token = document.getElementById('token');

  const date = new Date();

  const data = {
    mail: mail.value,
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