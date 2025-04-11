function pedirDatos() {
  let nombre = prompt("Ingrese su nombre");
  let nota1 = parseFloat(prompt("Ingrese la primer calificación:  "));
  let nota2 = parseFloat(prompt("Ingrese la segunda calificación:  "));
  let nota3 = parseFloat(prompt("Ingrese la tercer calificación:  "));

  return { nombre, nota1, nota2, nota3 };
}

const calcularPromedio = (nota1, nota2, nota3) => {
  return (nota1 + nota2 + nota3) / 3;
};

function mostrarPromAlumno(nombre, promedio) {
  let mensaje = `Hola ${nombre} tu promedio es: ${promedio.toFixed(2)}`;
  console.log(mensaje);
  alert(mensaje);
}

const datos = pedirDatos();
const promedio = calcularPromedio(datos.nota1, datos.nota2, datos.nota3);
mostrarPromAlumno(datos.nombre, promedio);
