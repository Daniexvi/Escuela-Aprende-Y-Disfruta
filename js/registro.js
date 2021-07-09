function validar(formulario) {
  let expresion = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,5})+$/g;

  const $form = document.querySelector("#formulario") || document.getElementById("formulario");

  $inputs = $form.querySelectorAll("input");

  if (formulario.nombres.value.trim().length == 0) {
    document.getElementById("error-name").innerText = "Este campo es obligatorio";
    formulario.nombres.focus();
    return false;
  } else {
    document.getElementById("error-name").innerText = "";
  }

  if (formulario.email.value.trim().length == 0) {
    document.getElementById("error-email").innerText = "Campo invalido";
    formulario.email.focus();
    return false;
  } else if (!expresion.test(formulario.email.value)) {
    document.getElementById("error-email").innerText = "Esta mal escrito el correo ejemplo@algo.com";
    return false;
  } else {
    document.getElementById("error-email").innerText = "";
  }

  if (formulario.contrasena.value.length <= 6) {
    document.getElementById("error-password").innerText = "Debe tener al menos 7 caracteres";
    formulario.contrasena.focus();
    return false;
  } else {
    document.getElementById("error-password").innerText = "";
  }

  if (formulario.confirmacion.value.length <= 6) {
    document.getElementById("error-confirm").innerText = "Debe tener al menos 7 caracteres";
    formulario.confirmacion.focus();
    return false;
  } else {
    document.getElementById("error-confirm").innerText = "";
  }

  if (formulario.contrasena.value != formulario.confirmacion.value) {
    document.getElementById("error-confirm").innerText = "No coincide la contraseña";
    formulario.confirmacion.focus();
    return false;
  } else {
    document.getElementById("error-confirm").innerText = "";
  }

  if (formulario.tipo.value == "-1") {
    document.getElementById("error-type").innerHTML = "Este campo es obligatorio";
    return false;
  } else {
    document.getElementById("error-type").innerText = "";
  }

  if (!formulario.acepto.checked) {
    document.getElementById("error-accept").innerHTML = "Este campo es obligatorio";
    return false;
  } else {
    document.getElementById("error-accept").innerText = "";
  }
  
  
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  return true;
}
