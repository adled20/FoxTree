import { Autenticacion } from "./Conexion.js";
import { Acceso } from "./Conexion.js";
import {addDoc, collection } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';

import {createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
document.getElementById("RegistrarUsuario").addEventListener("submit", function(evt){
    evt.preventDefault();

    var Correo=document.getElementById("email").value
    var Contra=document.getElementById("password").value
    var Nombre=document.getElementById("Nombre").value
 
    EnviarDatos(Correo,Contra, Nombre)
    function EnviarDatos(Correo,Contra, Nombre) {
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
            console.log("Usuario Registrado")
        })
        .catch((error)=>{
            const errorCode=error.code;
            const errorMessage=error.message;
        })
       
    }
})