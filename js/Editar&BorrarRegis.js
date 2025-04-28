import { Acceso } from "./Conexion.js"
import { LLenarRegistros } from "./Registros.js";
    import { collection, query, where, getDocs,getDoc,doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
const cerrar = document.getElementById("CerrarModal");
const Editar=document.getElementById("Editar");
Editar.addEventListener("click", async() => {
const id=document.getElementById("iddocumento").value;
const Etiqueta=document.getElementById("ListBox").value
const tipo=document.querySelector('input[name="btnradio"]:checked').value;
const Cantidad= document.getElementById("CantidadForm").value;
const Comentario = document.getElementById("Coment").value;

console.log(id,Etiqueta,tipo,Cantidad,Comentario);
const docRef = doc(Acceso, "Registros", id);
await updateDoc(docRef, {
    Cantidad: parseInt(Cantidad),
    Comentario: Comentario,
    NombreEtiqueta: Etiqueta,
    Tipo: tipo,
    
  });
  await LLenarRegistros();
  cerrar.click();
})

const Borrar =document.getElementById("Borrar");
Borrar.addEventListener("click", async () => {
const id=document.getElementById("iddocumento").value;
const docRef = doc(Acceso, "Registros", id);
await deleteDoc(docRef)
await LLenarRegistros();
cerrar.click();
})

