class Cervezas_Model {
  constructor(
    id,
    nombre,
    tipo,
    alcohol,
    ibu,
    descripcion,
    Ruta
  ) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.alcohol = alcohol;
    this.ibu = ibu;
    this.descripcion = descripcion;
    this.Ruta = Ruta;
  }

  todas() {
    var html = "";
    $.get("../../Controllers/cerveza.controller.php?op=" + this.Ruta, (res) => {
      res = JSON.parse(res);
      $.each(res, (index, valor) => {
        html += `<tr>
          <td>${index + 1}</td>
          <td>${valor.nombre}</td>
          <td>${valor.tipo}</td>
          <td>${valor.alcohol}</td>
          <td>${valor.ibu}</td>
          <td>${valor.descripcion}</td>
          <td>
            <button class='btn btn-success' onclick='editar(${valor.id})'>Editar</button>
            <button class='btn btn-danger' onclick='eliminar(${valor.id})'>Eliminar</button>
            <button class='btn btn-info' onclick='ver(${valor.id})'>Ver</button>
          </td>
        </tr>`;
      });
      $("#tabla_cervezas").html(html);
    });
  }

  insertar() {
    var datos = new FormData();
    datos = this.descripcion;

    $.ajax({
      url: "../../Controllers/cerveza.controller.php?op=insertar",
      type: "POST",
      data: datos,
      contentType: false,
      processData: false,
      success: function (res) {
        res = JSON.parse(res);
        if (res === "ok") {
          Swal.fire("Cerveza", "Registrada", "success");
          todas_cervezas();
        } else {
          Swal.fire("Error", res, "error");
        }
      }
    });

    this.limpia_Cajas();
  }
  una() {
          var id = this.id;
          $.post(
              "../../Controllers/cerveza.controller.php?op=una",
              { id: id },
              (res) => {
                  res = JSON.parse(res);
                  $("#id").val(res.id);
                  $("#nombre").val(res.nombre);
                  $("#tipo").val(res.tipo);
                  $("#alcohol").val(res.alcohol);
                  $("#ibu").val(res.ibu);
                  $("#descripcion").val(res.descripcion);
              }
          );
          $("#Modal_cerveza").modal("show");
      }
   
      editar() {
          var dato = new FormData();
          dato = this.descripcion;
          $.ajax({
              url: "../../Controllers/cerveza.controller.php?op=actualizar",
              type: "POST",
              data: dato,
              contentType: false,
              processData: false,
              success: function (res) {
                  res = JSON.parse(res);
                  if (res === "ok") {
                      Swal.fire("Cervezas", "Cerveza Actualizada", "success");
                      todas_cervezas();
                  } else {
                      Swal.fire("Error", res, "error");
                  }
              }
          });
          this.limpia_Cajas();
      }
   
      eliminar() {
          var id = this.id;
   
          Swal.fire({
              title: "Cervezas",
              text: "Esta seguro de eliminar la cerveza",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "Eliminar",
          }).then((result) => {
              if (result.isConfirmed) {
                  $.post(
                      "../../Controllers/cerveza.controller.php?op=eliminar",
                      { id: id },
                      (res) => {
                          res = JSON.parse(res);
                          if (res === "ok") {
                              Swal.fire("Cervezas", "Cerveza Eliminada", "success");
                              todas_cervezas();
                          } else {
                              Swal.fire("Error", res, "error");
                          }
                      }
                  );
              }
          });
   
          this.limpia_Cajas();
      }
  limpia_Cajas() {
    document.getElementById("nombre").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("alcohol").value = "";
    document.getElementById("ibu").value = "";
    document.getElementById("descripcion").value = "";
    $("#Modal_cerveza").modal("hide");
  }
}