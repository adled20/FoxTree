import { Autenticacion } from "./Conexion.js";
import { Acceso } from "./Conexion.js";
import {addDoc, collection } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';

import {createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

document.getElementById("RegistrarUsuario").addEventListener("submit", function(evt){
    evt.preventDefault();
    const ModAlert = document.getElementById("ModAlert")
    const icon = document.getElementById("icono")
    const modal=document.getElementById("Alerta")
    const erorname=document.getElementById("ERRORNAME")
    const modalCargando=document.getElementById("Cargando")
    var Correo=document.getElementById("email").value
    var Contra=document.getElementById("password").value
    var Nombre=document.getElementById("Nombre").value
    icon.className="loader"
    ModAlert.textContent="¡Procesando!"
    erorname.textContent="";
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
            ModAlert.textContent="ERROR"
            icon.className="close icon"
            erorname.textContent="Verifica tu correo y tamaño de contraseña (min 5 caracteres)"
            const errorCode=error.code;
            const errorMessage=error.message;
        })
       
    }
}) 
