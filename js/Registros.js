import { Acceso } from "./Conexion.js"
    import { collection, query, where, getDocs,getDoc,doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
    const tipo= document.getElementById("TipoFil")
    const Etique=document.getElementById("EtiFil")
    const Boton=document.getElementById("Filtrar");
    const UID = sessionStorage.getItem("UID");
    const idc=document.getElementById("iddocumento");
    tipo.addEventListener("change", async () => {
        Etique.innerHTML="";
        const t= document.createElement("option");
        t.innerText="Todas"
        Etique.appendChild(t);
        const etiquetas = collection(Acceso,"Etiqueta");
        const lanzar = query(etiquetas, where("Tipo","==",tipo.value))
        const op= await getDocs(lanzar);
        op.forEach((doc)=>{
            const e=doc.data();
            const opp = document.createElement("option");
            opp.textContent=""+e.Nombre;
            Etique.appendChild(opp);
        })
    })
    Boton.addEventListener("click", async () => {
  const ti = tipo.value;
  const et = Etique.value;
  let ver=null;
  const Registros = collection(Acceso, "Registros");
  const RegistrosVer = document.getElementById("RegistrosVer");
  if (et=="Todas"&&ti=="") {
     ver = query(Registros, where("UID", "==", UID))
 }else if(ti!=""&&et=="Todas"){
    ver = query(Registros, where("UID", "==", UID), where("Tipo","==",ti));

 }else{
     ver = query(Registros, where("UID", "==", UID), where("Tipo","==",ti), where("NombreEtiqueta","==",et));

 }
 RegistrosVer.innerHTML="";
  const LLenarRegistrosVer = await getDocs(ver);
 
  LLenarRegistrosVer.forEach((doc) => {
const regi=doc.data();
const BotonVer = document.createElement("button");
    BotonVer.id=doc.id;
div(regi,BotonVer);


});
    })
   
    
    const nombre = document.getElementById("nombre");
    const ListaEtiqueta = document.getElementById("ListBox");
   
    const Comentario = document.getElementById("Coment");
    const loguito = document.getElementById("color");
    const Ingresos=document.getElementById("Ingresos");
    const Gastos=document.getElementById("Gastos");
    const Cantidad=document.getElementById("CantidadForm");

 LLenarRegistros();
 export async function LLenarRegistros() {
        const Registros = collection(Acceso, "Registros");
        const RegistrosVer = document.getElementById("RegistrosVer");
        RegistrosVer.innerHTML="";
        const ver = query(Registros, where("UID", "==", UID));
       
        const LLenarRegistrosVer = await getDocs(ver);
       
        LLenarRegistrosVer.forEach((doc) => {
    const regi=doc.data();
    const BotonVer = document.createElement("button");
    BotonVer.id=doc.id;
    div(regi,BotonVer)
  
   
    
    });
      }
   
          async function VerRegistro(documentoID) {
            ListaEtiqueta.innerHTML=""
           const modal=document.getElementById("EjecutarModal");
            modal.click();
            const ver = doc(Acceso, "Registros", documentoID);
            const Eti = collection(Acceso, "Etiqueta");

            
           
           
            const LLenarRegistrosModal = await getDoc(ver);
           
            
        const regi=LLenarRegistrosModal.data();
        nombre.textContent=""+regi.NombreEtiqueta;
        Comentario.value=""+regi.Comentario;
        Cantidad.value=regi.Cantidad;
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
   
            

    
          function div(regi, BotonVer) {
            const div = document.createElement("div");
            const Titulo = document.createElement("p");
            const Contenido = document.createElement("p");
            const Cantidad = document.createElement("p");
       
            div.className = "d-flex shadow p-3 border border-secondary-subtle rounded  flex-column item fade-in";
            BotonVer.className = "btn btn-primary";
            Titulo.textContent=""+regi.NombreEtiqueta;
            Contenido.textContent=""+regi.Tipo;
            Cantidad.textContent=""+regi.Cantidad;
            BotonVer.textContent="Ver";
            
            RegistrosVer.appendChild(div)
            div.appendChild(Titulo);
            div.appendChild(Contenido);
            div.appendChild(Cantidad);
            BotonVer.onclick = function() {
                VerRegistro(this.id);
                idc.value=""+this.id;
                
            };
            div.appendChild(BotonVer);
            
        }