import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://pablo:123@pablo.pj8ek.mongodb.net/?retryWrites=true&w=majority&appName=pablo"
  )
  .then(() => {
    console.log("coneccion exitosa");
  })
  .catch(() => {
    console.log("error de coneccion de base de datos");
  });
