// Récupération des données via fetch
const main = document.querySelector('#main-container')
const url = "http://localhost:3000/api/furniture"

fetch(url)
    .then(resultat => resultat.json())//je récupérère l'objet json
    .then(json =>{ 
        // ensuite je vérifie que l'objet et bien récuperé dans la console
        console.log("En dessous, les produits (Il doit en avoir 5)")
        console.log(json)

        //maintenant je crée une boucle pour parcourir l'objet json
        json.forEach(({_id, name, description, price, imageUrl}) =>{

            //je commence par créer les éléments HTML
            const div = document.createElement("div")
            const h3 = document.createElement("h2")
            const h4 = document.createElement("h3")
            const p = document.createElement("p")
            const img = document.createElement("img")
            const lien = document.createElement("a")
            
            //ici j'attribu les valeurs de l'objet json
            const nodeName = document.createTextNode (name)
            const nodePrice = document.createTextNode (price + " €")
            const nodeDescription = document.createTextNode (description)
            img.src = imageUrl
            lien.href = 'fiche-produit.html?id=' + _id;
            lien.textContent = "Voir le produit"

            //j'ajoute les éléments que j'ai crée, au DOM (=> HTML)
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