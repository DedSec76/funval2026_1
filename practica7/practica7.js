/* Ejercicio 1 – Área de triángulos múltiples.
Crea una función llamada calcularAreaTriangulo que reciba base y altura y devuelva el área:

    - Pide al usuario 3 veces la base y altura de diferentes triángulos usando prompt.
    - Usa un bucle for para solicitar los datos 3 veces.
    - Usa condicional para verificar que base y altura sean mayores que 0.
    - Muestra cada área en consola.*/
/* function calcularAreaTriangulo(base, altura) {
    return base * altura / 2
}

for (let i = 0; i < 3; i++) {
    let base = Number(prompt(`${i+1}. Ingresa la base del triangualo: `))
    let altura = Number(prompt(`${i+1}. Ingresa la altura del triangualo: `))

    let resultado = calcularAreaTriangulo(base, altura)

    if(base > 0 && altura > 0) {
        console.log(`${i+1}. Area = ${resultado.toFixed(2)}`)
    } else {
        alert("La base y altura deben de ser mayores a 0")
    }
} */


/*
Ejercicio 2 – Conversión de Celsius a Fahrenheit:
    - Crea una función convertirAFahrenheit que reciba un valor en Celsius y lo convierta a Fahrenheit:
    - Pide al usuario 5 temperaturas mediante prompt.
    - Usa un bucle para hacer las 5 conversiones.
    - Usa un condicional para verificar que el valor ingresado sea un número.
    - Muestra cada resultado en consola. */
/* function convertirAFahrenheit(valor) {
    return ((valor * 9/5) + 32).toFixed(2)
}

for (let i = 0; i < 5; i++) {
    const valor = Number(prompt(`${i+1}. Ingrese su temperatura:`))
    let resultado = convertirAFahrenheit(valor)

    if(!isNaN(valor)) {
        console.log(`${i+1}. Su valor en Fahrenheit es: ${resultado}`)
    } else {
        console.log("Ingrese un numero")
    }
} */

/*
Ejercicio 3 – Contar vocales en un texto
    - Crea una función contarVocales que reciba un texto y devuelva el número de vocales:
    - Pide al usuario 3 textos mediante prompt.
    - Usa un bucle para recorrer cada letra del texto.
    - Usa condicionales para determinar si un carácter es vocal.
    - Muestra en consola cuántas vocales tiene cada texto.*/

/* function contarVocales(texto) {
    let cont = 0;
    for (const t of texto.toLowerCase()) {
        if (t === 'a' || t === 'e' || t === 'i' || t === 'o' || t === 'u') {
            cont++;
        }
    }
    return cont
}

for (let i = 0; i < 3; i++) {
    const texto = prompt(`${i+1}. Texto`)

    console.log(`${texto} tiene: ${contarVocales(texto)} vocal(es)`)
}
 */

/*
Ejercicio 4 – Pares e impares en un rango
Crea una función clasificarParesImpares que reciba dos números inicio y fin y:

    - Use un bucle for para recorrer todos los números desde inicio hasta fin.
    - Use condicional para imprimir si cada número es par o impar.
    - Pide al usuario inicio y fin mediante prompt.
    - Muestra el resultado en consola.*/

function clasificarParesImpares(inicio, fin) {
    for(let i = inicio; i <= fin; i++) {
        if (i === 0) {
            console.log(`${i} es 0`)
        } else if (i % 2 === 0) {
            console.log(`${i} es par`)
        } else {
            console.log(`${i} es impar`)
        }
    }
}

let inicio = Number(prompt("Ingrese un número de Inicio: ")) 
let fin = Number(prompt("Ingrese un número de fin: ")) 

clasificarParesImpares(inicio, fin)

/*
Ejercicio 5 – Número mayor y suma.
Crea una función mayorYSuma que reciba 5 números separados y:

    - Use un bucle para comparar cada número y encontrar el mayor.
    - Use condicionales para verificar cuál es el mayor.
    - Calcula también la suma de los 5 números.
    - Pide al usuario los 5 números mediante prompt.
    - Muestra en consola el número mayor y la suma total. */

function mayorYSuma() {
    let mayor = -9999;
    let suma = 0;

    for (let i = 0; i < 5; i++) {
        let numero = Number(prompt(`${i+1}º Número: `)) 

        if (numero > mayor) {
            mayor = numero
        }
        suma += numero
    }

    console.log(`El número mayor es: ${mayor}`)
    console.log(`La suma de los números es: ${suma}`)
}

mayorYSuma()