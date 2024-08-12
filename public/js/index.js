const socket = io();

let user;
const chatBox = document.getElementById("chatBox");

// sweet alert 2

Swal.fire({
  title: "identificate",
  input: "text",
  text: "ingresa un usuario para identificarte en el chat",
  inputValidator: (value) => {
    return !value && "necesitas escribir un nombre para continuar";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
});

chatBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", { user: user, message: chatBox.value });
      chatBox.value = "";
    }
  }
});

//listener de mensajes:

socket.on("messagesLogs", (data) => {
  let log = document.getElementById("messagesLogs");
  let messages = "";

  data.forEach((message) => {
    messages = messages + `${message.user} dice: ${message.message} <br>`;
  });
  log.innerHTML = messages;
});
