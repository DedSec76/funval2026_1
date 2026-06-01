import { aldairRB } from "./exports";

export function dataload() {
    const principal = document.querySelector("#principal")

    loadName()
    loadReview()
    loadDescription()
    loadProfiles()
    loadSkills()
    loadAdiSkills()
    loadProjects()

    function loadName() {
        const spanName = principal.querySelector("#span_name")
        spanName.textContent = aldairRB.name
    }

    function loadReview() {
        const pReview = principal.querySelector("#p_review")
        pReview.textContent = aldairRB.reviews
    }

    function loadDescription() {
        const pDescription = principal.querySelector("#p_description")
        pDescription.textContent = aldairRB.description
    }

    function loadProfiles() {
        const imgs = principal.querySelectorAll("#imgProfile")
        
        imgs.forEach((img, i) => {
            img.src = aldairRB.imgProfile[i]
            img.alt = `${i} Imagen de mi perfil`
        })
    }

    function loadSkills() {
        const divSkills = principal.querySelector("#divSkills")
        const skills = aldairRB.skills

        skills.map(s => {
            divSkills.insertAdjacentHTML("beforeend", `<div class="cardSkill">
                                                            <img class="w-12 h-12 md:w-16 md:h-16" 
                                                                 src="${s.urlImage}" 
                                                                 alt="Logo de la tecnología ${s.name}">
                                                        </div>`
                                        )
        })
    }

    function loadAdiSkills() {
        const divAdditional = principal.querySelector("#divAdditional")
        const additionals = aldairRB.additionalSkills

        additionals.map(a => {
            divAdditional.insertAdjacentHTML("beforeend", `<img class="w-12 h-12 md:w-16 md:h-16" 
                                                                src="${a.urlImage}" 
                                                                alt="Logo de la tecnologia ${a.name}">
          `)
        })
    }

    function loadProjects() {
        const imgProject = principal.querySelectorAll("#imgProject")
        console.log(imgProject)

        imgProject.forEach((img, i) => {
            img.src = aldairRB.projects[i].imgSrc
            img.classList.add("project_img")
            img.alt = `Una imagen de mi proyecto llamado ${aldairRB.projects[i].name}`
        })
    }

    console.log(aldairRB.projects[0].name)
}