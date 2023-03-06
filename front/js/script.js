//Création tableau "produits"
let products = []

//Récupération de l'URL
const getProducts = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then ((promise) => {
      products = promise;
    });
  };


//Implantation dynamique
const productsDisplay = async () => {
  await getProducts();

  let baliseHtmlItems = document.getElementById("items")
  products.forEach(product => {

    let baliseA = document.createElement("a")
    baliseA.setAttribute("href", `product.html?id=${product._id}`)
    baliseHtmlItems.appendChild(baliseA);

    let baliseArticle = document.createElement("article")
    baliseA.appendChild(baliseArticle);

    let baliseImg = document.createElement("img")
    baliseImg.setAttribute("src", `${product.imageUrl}`)
    baliseImg.setAttribute("alt", `${product.altTxt}`)
    baliseArticle.appendChild(baliseImg);

    let baliseTitle = document.createElement("h3")
    baliseTitle.classList.add("productName")
    baliseTitle.textContent = `${product.name}`
    baliseArticle.appendChild(baliseTitle);

    let baliseDescritpion = document.createElement("p")
    baliseDescritpion.classList.add("productDescription")
    baliseDescritpion.textContent = `${product.description}`
    baliseArticle.appendChild(baliseDescritpion);
    
  });
}

//Affichage "produits"
productsDisplay();



