// Récupération des données via fetch
const main = document.querySelector('#main-container')
const url = "http://localhost:3000/api/furniture"

fetch(url)
    .then(resultat => resultat.json())
    .then(json =>{
        console.log("En dessous, les produits (Il doit en avoir 5)")
        console.log(json)
        json.forEach(({_id, name, description, price, imageUrl}) =>{
            const div = document.createElement("div")
            const h3 = document.createElement("h2")
            const h4 = document.createElement("h3")
            const p = document.createElement("p")
            const img = document.createElement("img")
            const lien = document.createElement("a")
            

            const nodeName = document.createTextNode (name)
            const nodePrice = document.createTextNode (price + " €")
            const nodeDescription = document.createTextNode (description)
            img.src = imageUrl
            lien.href = 'fiche-produit.html?id=' + _id;
            lien.textContent = "Voir le produit"


            main.appendChild (div)
            div.appendChild (h3)
            div.appendChild (h4)
            div.appendChild (p)
            div.appendChild (img)
            div.appendChild (lien)

            h3.appendChild(nodeName)
            h4.appendChild(nodePrice)
            p.appendChild(nodeDescription)

            lien.className = "btn"
            //console.log(_id)
        })
    })
    .catch(err =>{
        alert("Le serveur ne répond pas");
        console.error(err)
})