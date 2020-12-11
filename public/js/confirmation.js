// Affichage du numéro de commande avec message de remerciement
function commande(){
    let data = JSON.parse(sessionStorage.getItem('order'));
    let prix = JSON.parse(sessionStorage.getItem('prix'));
    let conteneurRecap = document.getElementById("recapitulatif")

    const p1 = document.createElement("p")
    p1.textContent = "Merci pour votre achat " + data.contact.firstName + " " + data.contact.lastName
    recapitulatif.appendChild (p1)

    const p2 = document.createElement("p")
    p2.textContent = "Votre commande " + data.orderId + " a bien été enregistrée."
    recapitulatif.appendChild (p2)

    const p3 = document.createElement("p")
    p3.textContent = "Montant de votre commande : " + prix + " €."
    recapitulatif.appendChild (p3)

    console.log("Votre numéro de commande : ")
    console.log(data.orderId)
    console.log("Et le montant total : ")
    console.log(prix)
}
commande();