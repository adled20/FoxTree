import { Acceso } from "./Conexion.js"
    import { collection, query, where, getDocs,getDoc,doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

   
    const UID = sessionStorage.getItem("UID");
    const nombre = document.getElementById("nombre");
    const ListaEtiqueta = document.getElementById("ListBox");
;
    const Comentario = document.getElementById("Comentario");
    const loguito = document.getElementById("color");
    const Ingresos=document.getElementById("Ingresos");
    const Gastos=document.getElementById("Gastos");

LLenarRegistros();
    async function LLenarRegistros() {
        const Registros = collection(Acceso, "Registros");
        const RegistrosVer = document.getElementById("RegistrosVer");
        const ver = query(Registros, where("UID", "==", UID));
       
        const LLenarRegistrosVer = await getDocs(ver);
       
        LLenarRegistrosVer.forEach((doc) => {
    const regi=doc.data();
    const div = document.createElement("div");
    const Titulo = document.createElement("p");
    const Contenido = document.createElement("p");
    const Cantidad = document.createElement("p");
    const BotonVer = document.createElement("button");
    div.className = "d-flex shadow rounded  flex-column item";
    BotonVer.className = "btn btn-primary";
    Titulo.textContent=""+regi.NombreEtiqueta;
    Contenido.textContent=""+regi.Tipo;
    Cantidad.textContent=""+regi.Cantidad;
    BotonVer.textContent="Ver";
    BotonVer.id=doc.id;
    RegistrosVer.appendChild(div)
    div.appendChild(Titulo);
    div.appendChild(Contenido);
    div.appendChild(Cantidad);
    BotonVer.onclick = function() {
        VerRegistro(this.id);
    };
    div.appendChild(BotonVer);
    
    
    });
      }
   
          async function VerRegistro(documentoID) {
           const modal=document.getElementById("EjecutarModal");
            modal.click();
            const ver = doc(Acceso, "Registros", documentoID);
            const Eti = collection(Acceso, "Etiqueta");

            
           
           
            const LLenarRegistrosModal = await getDoc(ver);
           
            
        const regi=LLenarRegistrosModal.data();
        nombre.textContent=""+regi.NombreEtiqueta;
        Comentario.textContent=""+regi.Comentario
        if (regi.Tipo=="Ingresos") {
            Ingresos.checked=true;
        }else{
            Gastos.checked=true;
        }
        
        const colo = query(Eti, where("Nombre", "==", regi.NombreEtiqueta));
        const ett = query(Eti, where("Tipo", "==", regi.Tipo));
        
            const listcolor=await getDocs(colo);
            const LLenarEtiqueta=await getDocs(ett);
            listcolor.forEach((doc)=>{
            const c= doc.data();
            loguito.style.backgroundColor=c.Color;
            });

        LLenarEtiqueta.forEach((doc) => {
            const et=doc.data();
           
            const option = document.createElement("option");
            option.textContent=""+et.Nombre;
            ListaEtiqueta.appendChild(option);
            
            });
          }

          Ingresos.addEventListener("change", function () {
            BuscarEtiquetas(this.value);
          });
          Gastos.addEventListener("change", function () {
            BuscarEtiquetas(this.value);
          });
          
          async function BuscarEtiquetas(valor) {
            const Eti = collection(Acceso, "Etiqueta");
            const ett = query(Eti, where("Tipo", "==", valor));
            const LLenarEtiqueta=await getDocs(ett);
            ListaEtiqueta.innerHTML=""
            LLenarEtiqueta.forEach((doc) => {
                const et=doc.data();
                
                const option = document.createElement("option");
                option.textContent=""+et.Nombre;
                ListaEtiqueta.appendChild(option);
                
                });
          }
   
            

    
    