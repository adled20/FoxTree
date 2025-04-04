import {Acceso} from "./Conexion.js"
import { EncontrarRegistro } from './GraficaMain.js';
import { DibujarGrafica } from "./GraficaMain.js";
import { collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
// Declaracion de variables
const Gasto = document.getElementById("Gasto");
const Ingreso = document.getElementById("Ingreso");
var tipo = "Gastos";
const u=document.createElement("u");
const UID=sessionStorage.getItem("UID");

const AñadirRegistro=document.getElementById("send");




Lista(tipo); 
Gasto.addEventListener("click", () => {
    tipo = "Gastos";
    u.textContent="Gastos"
    console.log(tipo);
    Gasto.textContent="";
    Gasto.appendChild(u)
    Ingreso.textContent="Ingresos"
    Lista(tipo)
   
});

Ingreso.addEventListener("click", () => {
    tipo = "Ingresos";
    console.log(tipo);
      u.innerText="Ingresos"
      Ingreso.textContent="";
    Ingreso.appendChild(u)
  
    Gasto.textContent="Gastos"
    Lista(tipo)
    
});


async function Lista(tipo) {
    const Etiqueta = collection(Acceso, "Etiqueta");
    const ListBox = document.getElementById("ListBox");
    ListBox.innerHTML = ""; 
    const Eti = query(Etiqueta, where("Tipo", "==", tipo));
   
    const ListaEtiquetas = await getDocs(Eti);
   
    ListaEtiquetas.forEach((doc) => {
const etiqueta=doc.data();
const option = document.createElement("option");
option.textContent=""+etiqueta.Nombre;

option.style.backgroundColor=etiqueta.Color
ListBox.appendChild(option);


});
  }

 document.getElementById("InicioUsuario").addEventListener("submit", function(evt){
     evt.preventDefault();
     const Cantidad=document.getElementById("Cantidad").value;
const ListSelected=document.getElementById("ListBox").value;
const Comentario=document.getElementById("comentario").value;
const fecha=new Date();
     if (!Cantidad || !ListSelected || !Comentario) {
        
     } else {
         
     EnviarDatos(Cantidad,ListSelected,fecha, Comentario)
     }
 
    async function EnviarDatos(Cantidad,ListSelected, fecha, Comentario) {
        try{
        
         const docRef = await addDoc(collection(Acceso, "Registros"), {
            Cantidad: parseInt(Cantidad),
            Fecha: fecha,
            NombreEtiqueta: ListSelected,
            Tipo: tipo,
            UID: UID,
            URLimagen:null,
            Comentario:Comentario
          });
         const nuevosDatos=await EncontrarRegistro();
         DibujarGrafica(nuevosDatos);
             console.log("Registrado")

        } catch(error){
            console.log("Error al registrar:", error.code, error.message);
         }
        
     }
 })