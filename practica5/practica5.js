/* Ejercicio 1 – Calculadora de Promedio y Rendimiento.
Pide al usuario cuatro notas (del 0 al 100).

Calcula el promedio y muestra un mensaje según el resultado:

- “Excelente” si el promedio es mayor o igual a 90
- “Bueno” si es mayor o igual a 75
- “Regular” si es mayor o igual a 60
- “Insuficiente” en caso contrario */

 let nota1 = parseFloat(prompt("Ingrese la primera nota (0 - 100)"))
let nota2 = parseFloat(prompt("Ingrese la segunda nota (0 - 100)"))
let nota3 = parseFloat(prompt("Ingrese la tercera nota (0 - 100)"))
let nota4 = parseFloat(prompt("Ingrese la cuarta nota  (0 - 100)"))

let promedio = (nota1 + nota2 + nota3 + nota4) / 4;

if(promedio >= 90) {
    alert(`Excelente - promedio: ${promedio}`)
} else if (promedio >= 75) {
    alert(`Bueno - promedio: ${promedio}`)
} else if (promedio >= 60) {
    alert(`Regular - promedio: ${promedio}`)
} else {
    alert(`Insuficiente - promedio: ${promedio}`)
}

/* Ejercicio 2 – Calculadora de Tarifa de Transporte
El programa debe pedir al usuario:

- Su edad
- Si es estudiante (“sí” o “no”)
- La distancia que recorrerá (en kilómetros)

Reglas del costo:

- Menores de 18 pagan 50% del precio base
- Estudiantes pagan 75% del precio base
- Mayores de 60 pagan 40% del precio base
- Si el viaje es mayor a 30 km, se agrega un 10% adicional al total */
let tarifa = parseFloat(prompt("Ingrese la tarifa a pagar"))
let edad = parseInt(prompt("Ingrese su edad"))
let esEstudiante = prompt("Usted es estudiante?: (si o no)").toLowerCase()
let distancia = parseFloat(prompt("¿Que distancia recorrerá? (en Km)"))

let total;

// aplicar descuentos
if(edad < 18) {
    total = tarifa * .5
} else if (esEstudiante === "si") {
    total = tarifa * .75
} else if (edad > 60) {
    total = tarifa * .4
} else {
    total = tarifa
}

// Distancia mayor a 30
if (distancia > 30) {
    total = tarifa * 1.10
}

alert(`El precio a pagar es: $${total.toFixed(2)}`)

/* Ejercicio 3 – Menú de Conversión de Unidades
Muestra un menú con 4 opciones:

 1. Convertir de Celsius a Fahrenheit
 2. Convertir de Fahrenheit a Celsius
 3. Convertir de Metros a Kilómetros
 4. Convertir de Kilómetros a Metros

El usuario debe elegir una opción y escribir el valor a convertir.
El programa mostrará el resultado correspondiente. */

let opcion = parseInt(prompt(
`Ingresa una opcion (1-4):
    1. Convertir de Celsius a Fahrenheit
    2. Convertir de Fahrenheit a Celsius
    3. Convertir de Metros a Kilómetros
    4. Convertir de Kilómetros a Metros`))

let entrada = parseFloat(prompt("Ingresa el valor a convertir"))
let resultado;

if (opcion === 1) {
    resultado = (entrada * 9/5) + 32
    alert(`${resultado.toFixed(4)} Fahrenheit`)
} else if (opcion === 2) {
    resultado = (entrada - 32) * 5/9
    alert(`${resultado.toFixed(4)} Grados Celsius`)
} else if (opcion === 3) {
    resultado = entrada / 1000
    alert(`${resultado.toFixed(2)} Metros`)
} else if (opcion === 4) {
    resultado = entrada * 1000
    alert(`${resultado.toFixed(2)} Metros`)
} else {
    alert("Opcion invalida. Elige una opción del (1 - 4)")
}

/* Ejercicio 4 – Sistema de Descuentos en una Tienda
El usuario debe ingresar:

 - El precio total de su compra
 - Si tiene tarjeta de cliente frecuente (“sí” o “no”)

Reglas:

 - Si el total es mayor a 500, aplica un 10% de descuento
 - Si además tiene tarjeta, aplica un 5% adicional
 - Si el total es menor o igual a 100, aplica un recargo del 5%

El programa debe mostrar el precio final 
y un mensaje indicando qué descuento se aplicó. */

let total = parseFloat(prompt("Ingrese el total de su compra"))

let porc;

if (total > 500) {
    porc = total * .1
    total -= porc
    alert(`Se aplico el 10% de descuento`)

    let esFrecuente = prompt("¿Tiene tarjeta de cliente frecuente? escriba -> (Si o No)")

    if (esFrecuente.toLowerCase() === "si") {
        porc = total * .05
        total -= porc
        alert(`Se aplico el 5% de descuento`)
    }

} else if (total <= 100) {
    porc = total * .05
    total += porc  
    alert(`Se aplico un recargo del 5%`)

} else {
    alert("Datos mal introducidos")
}

alert(`Precio final: ${total.toFixed()}`) 

/* Ejercicio 5 – Calculadora de Edad y Etapa de Vida
Pide al usuario:
    - Su año de nacimiento
    - El año actual

Calcula su edad y muestra un mensaje según el rango:

    - Menor de edad: menos de 18 años
    - Adulto joven: entre 18 y 30 años
    - Adulto: entre 31 y 59 años
    - Adulto mayor: 60 años o más

BONUS:
Pregunta además si ya cumplió años este año (“sí” o “no”)
y ajusta la edad si es necesario. */

 let anio = parseInt(prompt("Ingrese el año en que nació"))
let anioActu = parseInt(prompt("Ingrese el año actual"))
let cumplioAnio = prompt("¿Usted ya cumplio años? escriba (Si o No)").toLowerCase()

let edad = (cumplioAnio === "si") ? anioActu - anio : anioActu - anio - 1

if (edad >= 60) {
    alert(`Usted es un Adulto Mayor: tiene ${edad} años`)
} else if(31 <= edad && edad <= 59) {
    alert(`Usted es un Adulto: tiene ${edad} años`)
} else if (18 <= edad && edad <= 30) {
    alert(`Usted es un Joven Adulto: tiene ${edad} años`)
} else if (edad < 18 && edad > 0) {
    alert(`Usted es menor de edad: tiene ${edad} años`)
} else {
    alert("Edad invalida intente nuevamente.")
}