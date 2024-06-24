let form = document.getElementById("reservation-form")

let total = 0

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    recapgen(e)
    recapres(e)
    recaprepas(e)
    recapopt(e)
    recapalim(e)
    recapaller(e)
    prixsejour(e)    
})

form.addEventListener("change",(e)=>{
    cocherepas(e)
})
/**
 * Ajouter les infos de l'utilisateur dans la partie infos générales du récap
 * 
 */
function recapgen(){
let nom = document.getElementById("nom").value
let prenom = document.getElementById("prenom").value
let email = document.getElementById("email").value
let tel = document.getElementById("tel").value
let postale = document.getElementById("postale").value

let recapgen = document.querySelector(".recapgen")


recapgen.innerHTML =`<h4>Informations générales</h4>
                    <p>Nom : ${nom}</p>
                    <p>Prénom : ${prenom}</p>
                    <p>Email : ${email}</p>
                    <p>Tel : ${tel}</p>
                    <p>Adresse postale : ${postale}</p>`
}   
/**
 * Ajouter les infos de l'utilisateur dans la partie infos sur la reservations du récap
 *  
 */
function recapres(){
    let choix = document.querySelector("#choix").selectedOptions[0].value
    let recapres = document.querySelector(".recapres")
    let nombre = document.getElementById("nombre").value
    let datearr = document.getElementById("arrive").valueAsDate
    let datedep = document.getElementById("depart").valueAsDate
    let daynumb = (datedep - datearr) / 86400000
    let calc = 0
    if (choix === "Igloos") {
        calc = 500 * daynumb
    } else {
        calc = 850 * daynumb
    }

    total += calc

    recapres.innerHTML =`<h4>Votre réservation</h4>
                        <p>Chambre : ${choix}</p>
                        <p>Pour ${nombre} personne(s)</p>
                        <p>Date d'arrivée : ${datearr.toLocaleDateString()}</p>
                        <p>Date de départ : ${datedep.toLocaleDateString()}</p>
                        <p>Soit pour ${daynumb} jours : ${calc} €</p>`

}
/**
 * Recupère les infos concernant les options et les ajoute dans le recap
 */
function recapopt(){
let opt = document.getElementById("opt")
    let chauffeur = document.getElementById("chauffeur")
    let petitdej = document.getElementById("petitdej")
    let visite = document.getElementById("visite")
    let nombre = document.getElementById("nombre").value
    let datearr = document.getElementById("arrive").valueAsDate
    let datedep = document.getElementById("depart").valueAsDate
    let daynumb = (datedep - datearr) / 86400000

   let tabopt = [[chauffeur,11,"jour"], [petitdej,15,"jourpers"], [visite,20]]

   tabopt.forEach(e => {
    let calc = 0
    if(e[0].checked === true){
        if(e[2]=== "jour"){
             calc += e[1]*daynumb
        }else if(e[2] === "jourpers"){
            calc += e[1]*nombre*daynumb
        }else{
        calc += e[1]
        }
        total+=calc
        opt.innerHTML +=`${e[0].value} ${calc} €<br> `
    }
    
   })
}
 /**
  * Recupère les infos concernant les repas et les ajoute dans le recap
  */  
function recaprepas(){

    let repas = document.getElementById("repas")
    let midi = document.getElementById("midi")
    let ponctuel = document.getElementById("ponctuel")
    let soir = document.getElementById("soir")
    let nombre = document.getElementById("nombre").value
    let datearr = document.getElementById("arrive").valueAsDate
    let datedep = document.getElementById("depart").valueAsDate
    let daynumb = (datedep - datearr) / 86400000

let tabrepas =[[midi,25,"reg"], [soir,25,"reg"], [ponctuel,"(prix determiné sur place)","nonreg"]]

tabrepas.forEach(e => {
    let calc = 0
    if(e[0].checked === true){
        if(e[2]==="reg"){
            calc = e[1]*nombre*daynumb
            total+=calc
            repas.innerHTML +=`${e[0].value} ${calc} €<br> `
        }else{
            calc = e[1]
            repas.innerHTML +=`${e[0].value} (prix determiné sur place)<br> `
        }
    }
});
        
} 
 /**
  * Recupère les infos concernant les restricitons alimentaires et les ajoute dans le recap
  */  
function recapalim(){
    let aliment = document.getElementById("aliment")
    let veg = document.getElementById("veg")
    let vegetarien = document.getElementById("vegetarien")
    let aucun = document.getElementById("aucun")

    let tabaliment = [veg, vegetarien, aucun]

    tabaliment.forEach(e =>{
        if(e.checked === true){
            aliment.innerHTML += `${e.value}<br>`
        }
    })
}

 /**
  * Recupère les infos concernant les allergies et les ajoute dans le recap
  */  
function recapaller(){
    let allergies = document.getElementById("allergies")
    let gluten = document.getElementById("gluten")
    let lactose = document.getElementById("lactose")
    let autre = document.getElementById("autre")

    let taballergies = [gluten, lactose]

    taballergies.forEach(e =>{
        if(e.checked === true){
            allergies.innerHTML +=`${e.value}<br>`
        }
    })
    allergies.innerHTML += `${autre.value}`
}

function prixsejour(){
    let panier = document.getElementById("panier")
    panier.innerHTML=`Total du séjour : ${total} €`
}
/**
 * Decoche des checkbox en fonction de celle qu'on a coché
 */
function cocherepas (){
    let midi = document.getElementById("midi")
    let soir = document.getElementById("soir")
    let ponctuel = document.getElementById("ponctuel")

    if (midi.checked === true || soir.checked === true) {
        ponctuel.checked = false
    } else if (ponctuel.checked === true) {
        midi.checked = false
        soir.checked = false
    }
}

function afficheResAll(){
    let midi = document.getElementById("midi")
    let soir = document.getElementById("soir")
    let ponctuel = document.getElementById("ponctuel")

    if (midi.checked === true || soir.checked === true || ponctuel.checked === true){

    }
}

let nom = document.getElementById("nom")
nom.addEventListener("change",testNom)

let prenom = document.getElementById("prenom")
prenom.addEventListener("change",testPrenom)

let email = document.getElementById("email")
email.addEventListener("change",testEmail)

let tel = document.getElementById("tel")
tel.addEventListener("change",testTel)

let postale = document.getElementById("postale")
postale.addEventListener("change",testPostale)

let choix = document.getElementById("choix")
choix.addEventListener("change",testChoix)

let nombre = document.getElementById("nombre")
nombre.addEventListener("change",testNombre)

let ajd = Date.now()
let datearr = document.getElementById("arrive")
let datedep = document.getElementById("depart")

datearr.addEventListener("change", testDateArr)
datedep.addEventListener("change", testDateDep)



function testNom(){
    // Est ce que l'utilisateur a bien remplie ce champs "nom"
    // On test si le champs est vide
    if(nom.value == ""){
        //Affiche le message d'erreur
        //on met la bordure rouge sur l'input
        afficheErreur("nom","Ce champ ne peut pas être vide")
        return false
    }else{
    let reg = /^[a-zA-ZÀ-ÿ'-]+(?:\s[a-zA-ZÀ-ÿ'-]+)*$/
        if(reg.test(nom.value) === false){
        //On test si l'utilisateur a bien utilisé des caractères alphabétiques
            //Affiche le message d'erreur
            //on met la bordure rouge sur l'input        
                //il y a des chiffres
                afficheErreur("nom", "Ce champ ne peut pas comporter de caractères speciaux")
                return false
            }else if(hasCode(nom.value)){
                // Est ce que notre utilisateur n'est pas en train d'injecter du code => balise script
                afficheErreur("nom","Vous ne pouvez pas injecter du code")
                return false
                //Est ce que le mot n'est pas trop long
            }else if(nom.value.length >= 50){
                afficheErreur("nom","Vous avez tapé un nom trop long")
                return false
            }else if(nom.value.length <= 2){
                afficheErreur("nom","Vous avez tapé un nom trop court")
                return false   
            }
        enleveErreur("nom")
        return true
}
}

function testPrenom(){
    if(prenom.value == ""){
        afficheErreur("prenom","Ce champ ne peut pas être vide")
        return false
    }else{
    let reg = /^[a-zA-ZÀ-ÿ'-]+(?:\s[a-zA-ZÀ-ÿ'-]+)*$/
        if(reg.test(prenom.value) === false){
                afficheErreur("prenom", "Ce champ ne peut pas comporter de caractères speciaux")
                return false
            }else if(hasCode(prenom.value)){
                afficheErreur("prenom","Vous ne pouvez pas injecter du code")
                return false
            }else if(prenom.value.length >=50){
                afficheErreur("prenom","Vous avez tapé un prenom trop long")
                return false
            }else if(nom.value.length <= 2){
                afficheErreur("prenom","Vous avez tapé un prenom trop court")
                return false   
            }   
        }
        enleveErreur("prenom")
        return true
}


function testEmail(){
    if(email.value == ""){
        afficheErreur("email","Ce champ ne peut pas être vide")
        return false
    }else{
    let reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(reg.test(email.value) === false){
            afficheErreur("email", "Ce n'est pas un format d'email valide")
                return false
            }else if(hasCode(email.value)){
                afficheErreur("email","Vous ne pouvez pas injecter du code")
                return false
            }else if(email.value.length >100){
                afficheErreur("email","Vous avez tapé un email trop long")
                return false
            }  
        }
        enleveErreur("email")
        return true
}
function testTel(){
    if(tel.value == ""){
        afficheErreur("tel","Ce champ ne peut pas être vide")
        return false
    }else{
    let reg = /^(0|\+33)[\s.-]?\d{1}(?:[\s.-]?\d{2}){4}$/
        if(reg.test(tel.value) === false){
            afficheErreur("tel", "Ce n'est pas un format de numero de telephone valide")
                return false
            }else if(hasCode(tel.value)){
                afficheErreur("tel","Vous ne pouvez pas injecter du code")
                return false
            }else if(tel.value.length >14){
                afficheErreur("tel","Vous avez tapé un numero trop long")
                return false
            }  
        }
        enleveErreur("tel")
        return true
}
function testPostale(){
    if (postale.value == "") {
        afficheErreur("postale", "Ce champ ne peut pas être vide")
        return false
    }else{
            let reg = /^\d+\s[A-Za-zÀ-ÿ\d\s'-]+(?:,\s*\d{2}\s*\d{3})?\s[A-Za-zÀ-ÿ\d\s'-]+$/
            if(reg.test(postale.value)===false){
                afficheErreur("postale", "Ce n'est pas un format d'adresse valide")
                return false
            } else if (hasCode(postale.value)) {
                afficheErreur("postale", "Vous ne pouvez pas injecter du code")
                return false
            } else if (postale.value.length > 500) {
                afficheErreur("postale", "Vous avez tapé une adresse trop longue")
                return false
            }
            enleveErreur("postale")
            return true
}
}


function testChoix(){
    if(choix.value === ""){
        afficheErreur("choix","Veuillez choisir une chambre")
        return false
    }else{
        enleveErreur("choix")
        return true
    }
}

function testNombre(){
    if(nombre.value ==""){
        afficheErreur("nombre","Ce champ ne peut pas être vide")
        return false
    }else if(nombre.value<1 || nombre.value>2){
        afficheErreur("nombre","Vous ne pouvez choisir qu'entre 1 ou 2 personnes")
        return false
    }
    enleveErreur("nombre")
    return true
}

function testDateArr(){
    if(datearr.value ===''){
        afficheErreur("arrive","Vous devez choisir une date d'arrivée")
        return false
    }else if(datearr.valueAsDate < ajd){
        afficheErreur("arrive","Vous ne pouvez pas choisir une date inférieur à celle d'aujourd'hui")
        return false
    }else if(datearr.valueAsDate > datedep.valueAsDate){
        afficheErreur("arrive", "Vous ne pouvez pas choisir une date supérieur a votre date de départ")
        return false
    }
    enleveErreur("arrive")
    return true
}

function testDateDep(){
    if(datedep.value === ""){
        afficheErreur("depart","Vous devez choisir une date d'arrivée")
        return false
    }else if(datedep.valueAsDate < ajd){
        afficheErreur("depart","Vous ne pouvez pas choisir une date inférieur à celle d'aujourd'hui")
        return false
    }else if(datearr.valueAsDate > datedep.valueAsDate){
        afficheErreur("depart", "Vous ne pouvez pas choisir une date inférieure à celle d'arrivée")
        return false
    }
    enleveErreur("depart")
    return true
}

function afficheErreur (id,messageErreur){
    //Afficher une erreur : mettre une bordure sur le bon input, et remplir le paragraphe d'erreur associé
    //Paramètres : l'id de l'input dans lequel il ya une erreur
    //Paramètres : messageErrreur : le message à afficher
    //Retour : Rien !
    let input = document.getElementById(id)
    input.classList.add("input-error")
    let p = document.getElementById("error-"+id)
    p.innerText = messageErreur
    p.classList.remove("d-none")
}

function enleveErreur(id){
    //Role : enlève l'erreur sur l'input et cache le paragraphe associé
    let input = document.getElementById(id)
    input.classList.remove("input-error")
    let p = document.getElementById("error-"+id)
    p.innerText = ""
    p.classList.add("d-none")
}

function hasCode(text){
    //Cette fonction cherche dans une chaine s'il y a une balise script
    let reg = /<script/
    return reg.test(text)
}

let monform = document.getElementById("reservation-form")
// A la soumission du formulaire
monform.addEventListener("submit",(e)=>{
    //J'attends avant d'envoyer le formulaire
    e.preventDefault()
    // On relance nos tests
    // On réappelle nos fonctions de test
    let test1 = testNom()
    let test2 = testPrenom()
    let test3 = testEmail()
    let test4 = testTel()
    let test5 = testPostale()
    let test6 = testChoix()
    let test7 = testNombre()
    let test8 = testDateArr()
    let test9 = testDateDep()
        
    //Si une d'entre elle retourne false
    if(test1 === false || test2 === false || test3 === false || test4 === false || test5 === false || test6 === false || test7 === false || test8 === false || test9 === false){
        //On envoie pas le formulaire (on ne fait rien du coup)
    }else{
        //sinnon elles retournent toutes true 
        //j'envoie le formulaire
        let recap = document.getElementById("recap")
        monform.classList.add("flou")
        recap.classList.remove("d-none")
    }

    let backbutton = document.getElementById("backbutton")
    backbutton.addEventListener("click",(e)=>{

        e.preventDefault()
        let recap = document.getElementById("recap")
        monform.classList.remove("flou")
        recap.classList.add("d-none")
        total = 0
        recap.innerHTML = `<h3 class="textcenter w100">Résumé de votre réservation</h3>
                            <div class="recapgen w100  flexwrap flexcolumn gap25">
                                <h4>Informations générales</h4>
                                <p>Nom :</p>
                                <p>Prénom :</p>
                                <p>Email :</p>
                                <p>Tel :</p>
                                <p>Adresse postale :</p>
                            </div>
                            <div class="recapres w100 flexwrap flexcolumn gap25">
                                <h4>Votre réservation</h4>
                                <p>Chambre :</p>
                                <p>Pour x personnes</p>
                                <p>Date d'arrivée :</p>
                                <p>Date de départ :</p>
                            </div>
                            <div class="recapopt w100 flexwrap flexcolumn gap25">
                                <h4>Options et services supplémentaires</h4>
                                <p id="opt"></p>
                            </div>
                            <div class="recaprepas w100 flexwrap flexcolumn gap25">
                                <h4>Repas</h4> 
                                <p id="repas"></p>
                            </div>
                            <div class="recapalim w100 flexwrap flexcolumn gap25">
                                <h4>Restrictions Alimentaires</h4>
                                <p id="aliment"></p>
                            </div>
                            <div class="recapaler w100 flexwrap flexcolumn gap25">
                                <h4>Allergies</h4>
                                <p id="allergies"></p>

                            </div>
                            <p id="panier" class="w100">Total du séjour :</p>
                            <a href="" id="paybutton" class="smallbutton">Accèder au paiement</a>
                            <a href="" id="backbutton" class="flexwrap justcenter aligncenter">Modifier la réservation</a>`
    })
})