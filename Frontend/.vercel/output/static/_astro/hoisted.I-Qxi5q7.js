import"./hoisted.ll0w3Ecl.js";const o=document.querySelector("#tablacompras tbody"),r=async()=>{try{const s=await fetch("http://localhost:8080/compras");if(!s.ok)throw new Error("Network response was not ok");const t=await s.json();return console.log(t,"hola"),t}catch(s){return console.error("Error al obtener los datos:",s),[]}},a=async()=>{const s=await r();console.log("Filtered compras:",s),o.innerHTML="",s.forEach(t=>{const e=`
      <tr key="${t.idcompra}" class=" justify-around text-justify" > 
        <td class="p-2">${t.codigofactura}</td>
        <td class="p-2">${t.montototal}</td>
        <td class="p-2">${t.descuento}</td>
        <td class="p-2">${t.totalpagar}</td>
        <td class="p-2">${t.idproveedores}</td>
        <td class="p-2">${t.idusuarios}</td>
        <td class="p-2">${t.iva}</td>
        <td class="p-2">${t.fecha}</td>
        <td class="p-2">${t.hora}</td>
        <td class="p-2  text-white text-center "><button class="bg-blue-baby3 rounded-full w-5 h-5 text-center item-center">+</button></td>

      </tr>
    `;o.insertAdjacentHTML("beforeend",e)})};a();
