
tinymce.init({
    selector: 'textarea#descripcion-txt',
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });
  
var ciudad = document.querySelector("#ciudad-select");
var array = ["Viña del Mar", "Quilpué", "Santiago", "Otro que no sea Santiago"];
var array2 = ["1","2","3","4"];
for(var i=0;i<array.length;i++){
  var option = document.createElement("option");
  option.value=array2[i];
  option.text=array[i];
  ciudad.appendChild(option);
}

const reos = [];
const cargartabla = ()=>{
  let tbody = document.querySelector("#tbody-tabla");
  tbody.innerHTML = "";

  for(let i=0; i < reos.length; ++i){
    let p = reos[i];
    let tr = document.createElement("tr");
    let tdnombre = document.createElement("td");
    let tddetalle = document.createElement("td");
    let tdciudad = document.createElement("td");
    let tdgravedad = document.createElement("td");
    
    tdnombre.classList.add("text-center");
    tdnombre.innerText = p.nombre + " " + p.apellido;
    tddetalle.classList.add("text-center");
    tddetalle.innerHTML = p.descripcion;

    let ciudad = document.createElement("i");
    if(p.ciudad == "1"){
      ciudad.innerText =  "Viña del Mar";
    }if(p.ciudad == "2"){
      ciudad.innerText =  " Quilpué";
    }if(p.ciudad == "3"){
      ciudad.innerText =  "Santiago";
    }else{
      ciudad.innerText =  "Otro que no sea Santiago";
    }
    tdciudad.classList.add("text-center");
    tdciudad.appendChild(ciudad);

    let gravedad = document.createElement("i")
    if(parseInt(p.cantidad_crimenes) <= 3){
      gravedad.classList.add("fas","fa-hand-spock","text-success","fa-3x");
    }
    if((parseInt(p.cantidad_crimenes) >= 4) && (parseInt(p.cantidad_crimenes) <= 6)){
      gravedad.classList.add("fas","fa-exclamation-triangle","text-primary","fa-3x");
    }
    if((parseInt(p.cantidad_crimenes) >= 7) && (parseInt(p.cantidad_crimenes) <= 15)){
      gravedad.classList.add("fas","fa-radiation","text-warning","fa-3x");
    }
    if(parseInt(p.cantidad_crimenes) >= 16){
      gravedad.classList.add("fas","fa-radiation-alt","text-danger","fa-3x");
    }
    tdgravedad.classList.add("text-center");
    tdgravedad.appendChild(gravedad);

    tr.appendChild(tdnombre);
    tr.appendChild(tddetalle);
    tr.appendChild(tdciudad);
    tr.appendChild(tdgravedad);

    tbody.appendChild(tr);
  }
};


document.querySelector("#agregar-btn").addEventListener("click", ()=>{
  let nombre = document.querySelector("#nombre-txt").value;
  let apellido = document.querySelector("#apellido-txt").value;
  let cantidad_crimenes = document.querySelector("#cantidad-crimenes").value;
  let descripcion = tinymce.get("descripcion-txt").getContent();
  let ciudad = document.querySelector("#ciudad-select").value;

  let reo = {};
  reo.nombre = nombre;
  reo.apellido = apellido;
  reo.cantidad_crimenes = cantidad_crimenes;
  reo.descripcion = descripcion;
  reo.ciudad = ciudad;

  reos.push(reo)
  cargartabla();
  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: 'Registro de criminal realizado',
    showConfirmButton: false,
    timer: 1500
  })
});
