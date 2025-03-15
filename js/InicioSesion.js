import { Autenticacion } from "./Conexion.js";
import { Acceso } from "./Conexion.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

document.getElementById("InicioUsuario").addEventListener("submit", function(evt){
    evt.preventDefault();

    var Correo=document.getElementById("email").value
    var Contra=document.getElementById("password").value
    


    signInWithEmailAndPassword(Autenticacion, Correo, Contra)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("Bienvenido "+user)
        sessionStorage.setItem("UID",user.uid);
        console.log("Obtenido "+window.UID);
        window.location.href="main.html"
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

})