import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://pablo:123@ecomerce.qkdc0.mongodb.net/?retryWrites=true&w=majority&appName=ecomerce"
  )
  .then(() => {
    console.log("coneccion exitosa");
  })
  .catch(() => {
    console.log("error de coneccion de base de datos");
  });