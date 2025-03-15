import { Autenticacion } from "./Conexion.js";
import { Acceso } from "./Conexion.js";
import {addDoc, collection } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';

import {createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
document.getElementById("RegistrarUsuario").addEventListener("submit", function(evt){
    evt.preventDefault();
    const icon = document.getElementById("icono")
    const modal=document.getElementById("Alerta")
    const modalCargando=document.getElementById("Cargando")
    var Correo=document.getElementById("email").value
    var Contra=document.getElementById("password").value
    var Nombre=document.getElementById("Nombre").value
    if (!Correo || !Contra || !Nombre) {
        modal.click();
    } else {
        
    EnviarDatos(Correo,Contra, Nombre)
    }

    function EnviarDatos(Correo,Contra, Nombre) {
        modalCargando.click();
        createUserWithEmailAndPassword(Autenticacion,Correo,Contra)
        .then((UserCredential)=>{
            const user = UserCredential.user;
            const UID = user.uid;
            
             return addDoc(collection(Acceso,"Usuario"),{
                nombre:Nombre,
                UID:UID,
            })
           
        })
        .then(()=>{
            icon.className="check icon";
            console.log("Usuario Registrado")
             window.location.href="../html/InicioSesion.html";
        })
        .catch((error)=>{
            const errorCode=error.code;
            const errorMessage=error.message;
        })
       
    }
}) 
