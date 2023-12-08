// Archivo de controlador de cervezas
function init_cervezas() {
    $("#form_cervezas").on("submit", function (e) {
      guardar_cerveza(e);
    });
  
    // Otras inicializaciones si es necesario
  }
  
  $().ready(() => {
    // Detecta carga de la página
    todas_cervezas();
  });
  
  var todas_cervezas = () => {
    var todasCervezas = new Cervezas_Model("","","","","","","todas");
    todasCervezas.todas();
  }
  
  var guardar_cerveza = (e) => {
    e.preventDefault();
    var formData = new FormData($("#form_cervezas")[0]);
    var cerveza = new Cervezas_Model('', '', '', '','', formData, 'insertar');
    var id = document.getElementById("id").value;
 
    if (id > 0) {
      var cervezas = new Cervezas_Model('', '', '', '','', formData, 'editar');
        cervezas.editar();
    } else {
      var cerveza = new Cervezas_Model('', '', '', '','', formData, 'insertar');
        cervezas.insertar();
    }
    cerveza.insertar();
  }
 
var editar = (id) => {
    var una = new Cervezas_Model(id, "", "", "", "", "", "una");
    una.una()
}
 
var eliminar = (id) => {
    var eliminar = new Cervezas_Model(id, "", "", "", "", "", "eliminar");
    eliminar.eliminar();
}
  ;init_cervezas();




