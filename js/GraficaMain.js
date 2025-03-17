import {Acceso} from "../js/Conexion.js"
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const UID = sessionStorage.getItem("UID")
var tipo = "Gastos";



ga.addEventListener("click", async () => {
    tipo = "Gastos";
    const datos = await EncontrarRegistro();
    DibujarGrafica(datos)
    ga.style.transition = "background-color 0.5s ease";
    ga.style.backgroundColor="#5e17eb";
    Ingre.style.backgroundColor="#f1511b";
   
});

Ingre.addEventListener("click", async () => {
  console.log("Estoy aqui")
  tipo = "Ingresos";
    const datos = await EncontrarRegistro();
    DibujarGrafica(datos)
    Ingre.style.transition = "background-color 0.5s ease";
    Ingre.style.backgroundColor="#5e17eb";
    ga.style.backgroundColor="#f1511b";
 
});

Gasto.addEventListener("click", () => {
    tipo = "Gastos";
   
});

Ingreso.addEventListener("click", () => {
    tipo = "Ingresos";
    
});

    async function EncontrarRegistro() {
        const datos =[];
      const Registro = collection(Acceso, "Registros");
      const q = query(Registro, where("UID", "==", UID), where("Tipo","==",tipo));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const registro = doc.data();
       const  etiqueta=registro.NombreEtiqueta
        const Valor=registro.Cantidad
        if (datos[etiqueta]) {
            datos[etiqueta]+=Valor;
        } else {
            datos[etiqueta]=Valor;
            
        }
      
      });
      const datosAgrupados= Object.keys(datos).map(function(etiqueta){
        return {
            name:etiqueta,
            value:datos[etiqueta],
        };
      });
      return datosAgrupados;
    }
    export { EncontrarRegistro };
const datos=await EncontrarRegistro();
Grafica(datos);

export function DibujarGrafica(DatosNuevos) {
   Grafica(DatosNuevos);
}

function Grafica(datos) {
    var dom = document.getElementById('grafica');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};


var option;

option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: datos
    }
  ]
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);
}

