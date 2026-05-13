let choice=-1;
let saldo=0;
let limite=3;

while (choice != 4) {
    choice = parseInt(prompt(
    `Bienvenido a tu Banca Virtual. 
    ¿Que quieres hacer hoy?
    
    1. Ingresar dinero
    2. Retirar dinero 
    3. Consultar saldo
    4. Salir
    `))

    switch (choice) {
        case 1:
            let ingreso = parseFloat(prompt("¿Cuanto dinero quieres depositar?"))
            if (ingreso > 0) {
                saldo += ingreso
                alert("Dinero ingresado exitosamente!!")
            } else {
                alert("Incorrecto!!. Debes ingresar una cantidad a depositar")
            }
            break;
        
        case 2:
            if(saldo > 0) {
                if (limite > 0) {

                    let retiro = parseFloat(prompt("¿Cuanto dinero quieres retirar?"))

                    if (retiro <= saldo && 
                        retiro > 0
                    ) {
                        saldo -= retiro
                        limite--;

                        alert("Retiro de dinero exitoso!!")
                    } else {
                        alert("Incorrecto!! No puedes retirar más saldo del que tienes o 'retirar 0'")
                    }
                } else {
                    alert("Limite de retiro diario alcanzado!!")
                }
                
            } else {
                alert("No tienes saldo suficiente para retirar")
            }
            break;

        case 3:
            alert(`Saldo disponible: $${saldo}`)
            break;
    
        case 4:
            alert("Adios!!")
            break;

        default:
            alert("Debe ingresar una opción valida! (1 - 4)")
            break;
    }
}

alert("Gracias por Utilizar tu Banca Virtual!!")