const socket = io();

let user;
const chatBox = document.getElementById("chatBox");

// sweet alert 2

// Swal.fire({
//   title: "identificate",
//   input: "text",
//   text: "ingresa un usuario para identificarte en el chat",
//   inputValidator: (value) => {
//     return !value && "necesitas escribir un nombre para continuar";
//   },
//   allowOutsideClick: false,
// }).then((result) => {
//   user = result.value;
// });

// chatBox.addEventListener("keyup", (e) => {
//   if (e.key === "Enter") {
//     if (chatBox.value.trim().length > 0) {
//       socket.emit("message", { user: user, message: chatBox.value });
//       chatBox.value = "";
//     }
//   }
// });

//listener de mensajes:

// socket.on("messagesLogs", (data) => {
//   let log = document.getElementById("messagesLogs");
//   let messages = "";

//   data.forEach((message) => {
//     messages = messages + `${message.user} dice: ${message.message} <br>`;
//   });
//   log.innerHTML = messages;
// });

//productos en tiempo real

socket.on("products", (data) => {
  renderProducts(data);
});

//Función para renderizar la tabla de products:
const renderProducts = (products) => {
  const containerProducts = document.getElementById("containerProducts");
  containerProducts.innerHTML = "";

  products.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    //Agregamos boton para eliminar:
    card.innerHTML = `
    <p>Titulo: ${item.title} </p>
    <p>Precio: ${item.price} </p>
    <p>Id: ${item.id} </p>
    <img src="${item.thumbnails}" alt="">
    <button> Eliminar Producto </button>
        
        `;
    containerProducts.appendChild(card);

    //Agregamos el evento eliminar producto:
    card.querySelector("button").addEventListener("click", () => {
      deleteProduct(item.id);
    });
  });
};

//Eliminar producto:
const deleteProduct = (id) => {
  socket.emit("deleteProduct", id);
};

//Agregar producto:

document.getElementById("btnEnviar").addEventListener("click", () => {
  addProduct();
});

const addProduct = () => {
  const product = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    thumbnails: document.getElementById("thumbnails").value,
    code: document.getElementById("code").value,
    stock: document.getElementById("stock").value,
    category: document.getElementById("category").value,
    status: document.getElementById("status").value === "true",
  };

  socket.emit("addProduct", product);
};
