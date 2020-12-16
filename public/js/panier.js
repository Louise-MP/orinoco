//////////////// PARTIE PRODUIT ////////////////

//Affichage du produit
const affichagePanier = () => {
    //je récupére mon produit dans session storage "panier"
    let panier = JSON.parse(sessionStorage.getItem("panier"))
    let prixTotal = JSON.parse(sessionStorage.getItem("prixTotal"))
    let prixPanier = document.getElementById("affichageTotal")

    const items = document.getElementById("items")
    

    // affichage du prix total du panier 
    if (prixTotal != null) {

        prixPanier.textContent = 'Prix total : ' + prixTotal +  ' €'
        prixPanier.id = 'prixTotal'

        const div = document.createElement("div")
        div.textContent = "Le panier est vide"
        items.appendChild(div)

    } else  {
        prixPanier.textContent = ' 0 €'
    }

    // s'il n'y pas de produit dans le panier on affiche un message
    if ( panier == null) {
        const div = document.createElement("div")
        div.textContent = "Il n'y a pas encore d'article dans votre panier"
        items.appendChild(div)
        console.log("Panier vide")
    } else {
        //s'il y a un article dans le panier on créer un tableau avec chaque article
        items.innerHTML = ''
        Object.values(panier).map( (furniture) => {
            const itemList = document.createElement("div")
            itemList.classList.add("description")
            items.appendChild(itemList)
            
            
                const productName = document.createElement("h3")
                productName.textContent = furniture.name
                productName.classList.add("product-title")
                itemList.appendChild(productName)

                const productVarnish = document.createElement("p")
                productVarnish.textContent = "Vernis : " + furniture.varnish
                productVarnish.classList.add("product-varnish")
                itemList.appendChild(productVarnish)

                const description = document.createElement("p")
                description.textContent = furniture.description
                description.classList.add("product-description")
                itemList.appendChild(description)

                const quantite = document.createElement("p")
                quantite.textContent = "Quantité : " + furniture.quantity
                quantite.classList.add("product-quantity")
                itemList.appendChild(quantite)

                const prix = document.createElement("p")
                prix.textContent = "Prix : " + furniture.price + "€"
                prix.classList.add("product-price")
                itemList.appendChild(prix)

              console.log("Votre panier :")
              console.log(panier)
        })
    }
}
affichagePanier()



//////////////// PARTIE FORMULAIRE////////////////


// email
email.addEventListener('input', ({ target: { value } }) => {
  if(value.length === 0)
    email.style.borderColor = "black"
    else if(!value.includes('@'))
    email.style.borderColor = "red"
    else
    email.style.borderColor = "green"
})

const achat = (e) => {
  e.preventDefault()
// on créer une alerte si le panier est vide qui dit qu'on ne peut pas passer la commande  
  let panier = sessionStorage.getItem('panier')
  panier = JSON.parse(panier)

  let total = sessionStorage.getItem('prixTotal')

  if (panier == null || total == 0){
    alert("Votre panier est vide, vous ne pouvez pas passer de commande")
  }

// on déclare un tableau de produits pour la requête POST plus tard
 let products = []

 // on fait une fonction pour récupérer les id des produits au panier, pour l'afficher dans la requête POST
const productId = (products) => {

  let panier = JSON.parse(sessionStorage.getItem('panier'))
  
  products = Object.values(panier).map( (data) => {
    let qte = parseInt(data.qte)
    console.log(typeof qte)
    console.log(qte)
    
    for (let i = 0 ; i< qte ; i ++){
        products.push(data._id)  
      }
       console.log(products)
      return products
     })
 
  }
  productId(products)
  
    // on récupère la valeur des champs saisis par le user
     
    let nom = document.getElementById('nom').value
    let prenom = document.getElementById('prenom').value
    let email = document.getElementById('email').value
    let adresse = document.getElementById('adresse').value
    let ville = document.getElementById('ville').value
   


  // on met les valeurs dans un objet pour la requête POST
    let contact = {
        "lastName": nom,
        "firstName": prenom,
        "email": email,
        "address": adresse,
        "city": ville,
    }

// création de l'objet obligatoire pour la requête à envoyer au serveur
  let objet = {
    contact,
    products
  }

  let achat = JSON.stringify(objet)
  if (prenom == ''){
    alert("Prénom incorrect")

  } else if (nom == ''){
    alert("Nom incorrect")
  } else if (email == ''){
    alert("Email incorrect")
  } else if (adresse == ''){
    alert("Adresse incorrect")
  } else if (ville == ''){
    alert("Ville incorrect")
   
 // console.log(achat);
 // console.log(products);
  
  
  // si tout à été bien rempli, on envoi la commande au serveur, avec toutes les coordonnées du client
  } else {
  let request = new XMLHttpRequest()
       request.onreadystatechange = function () {
         if (this.readyState == XMLHttpRequest.DONE) {
           let confirmation = JSON.parse(this.responseText)
           sessionStorage.setItem('order', JSON.stringify(confirmation))
           let prix = JSON.parse(sessionStorage.getItem('prixTotal'))
           sessionStorage.setItem('prix', JSON.stringify(prix))
          console.log(typeof prix)
          console.log( prix)
           //une fois la requête envoyée, on est redirigé sur la page de confirmation de commande
           window.location.href = "confirmation.html"
         }
       }
  request.open("post", "http://localhost:3000/api/furniture/order")
  request.setRequestHeader("Content-Type", "application/json")
  request.send(achat)
      }
}

// je récupère l'id submit,  j'effectue la fonction achat pour pouvoir récupérer les données dans la page confirmation
let formValid = document.getElementById('submit')
formValid.addEventListener ('click', function (e) {
  achat(e)
})
