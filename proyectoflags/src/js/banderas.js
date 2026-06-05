async function cargarDatos() {
  try {
    let respuesta = await fetch("./data.json");
    let data = await respuesta.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
} 
let paises = await cargarDatos();

const filtroPais = document.querySelector("#selectRegion");
let contenedorPaises = document.querySelector("#contenedorFlags");

for (let i = 0; i < 15; i++) {
    contenedorPaises.innerHTML += 
        `<article class="rounded-lg max-w-80 flex flex-col items-center justify-center bg-white dark:bg-[#2c3743] dark:text-white shadow-md md:max-w-65 transform transition-transform duration-200 ease-out active:scale-90 touch-manipulation select-none md:hover:scale-110">
            <div class="w-full h-[60%]">
                <img src="${paises[i].flags.svg}"
                    alt="${paises[i].name}"
                    class="rounded-t-md object-cover md:w-full md:h-35 xl:h-40 cursor-pointer"
                />
            </div>
            <div class="flex flex-col mt-4 gap-2 mb-10 w-full pl-6 font-semibold">
                <h2><span class="font-bold text-2xl cursor-pointer active:text-blue-400">${paises[i].name}</span></h2>
                <p>Population: <span class="font-normal">${Number(paises[i].population).toLocaleString("en-US")}</span></p>
                <p>Region: <span class="font-normal">${paises[i].region}</span></p>
                <p>Capital: <span class="font-normal">${paises[i].capital}</span></p>
            </div>
        </article>`
}

function cargarRegiones() {
    const mapear = [...new Set(paises.map(p => p.region))]
    
    filtroPais.innerHTML += "<option value='' selected disabled>-- Seleccione--</option>" 
    
    mapear.forEach((m) => {
        filtroPais.insertAdjacentHTML("beforeend", `
                                        <option value="${m}">${m}</option>
                                                `)
    })
}

function filtrarRegion() {
    filtroPais.addEventListener("change", (e) => {
        contenedorPaises.innerHTML = ""
        
        const filterRegion = paises.filter(pais => pais.region === e.target.value)

        filterRegion.forEach(region => {
            contenedorPaises.innerHTML += ` <article class="rounded-lg max-w-80 flex flex-col items-center justify-center bg-white dark:bg-[#2c3743] dark:text-white shadow-md md:max-w-65 transform transition-transform duration-200 ease-out active:scale-90 touch-manipulation select-none md:hover:scale-110">
                                                <div class="w-full h-[60%]">
                                                    <img
                                                        src="${region.flags.svg}"
                                                        alt="${region.name}"
                                                        class="rounded-t-md object-cover md:w-full md:h-35 xl:h-40 cursor-pointer"
                                                    />
                                                </div>
                                                <div class="flex flex-col mt-4 gap-2 mb-10 w-full pl-6 font-semibold">
                                                    <h2><span class="font-bold text-2xl cursor-pointer active:text-blue-400">${region.name}</span></h2>
                                                    <p>Population: <span class="font-normal">${Number(region.population).toLocaleString("en-US")}</span></p>
                                                    <p>Region: <span class="font-normal">${region.region}</span></p>
                                                    <p>Capital: <span class="font-normal">${region.capital}</span></p>
                                                </div>
                                            </article>`
        });
    })
}

cargarRegiones()
filtrarRegion()






 
 