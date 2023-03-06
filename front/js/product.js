//récupération de la requête dans l'url
const queryString_id = window.location.search;

//extraction de l'id
const urlSearchParams = new URLSearchParams(queryString_id);

const _id = urlSearchParams.get("id");
console.log(_id);

//affichage du produit (objet) sélectionné par l'id
let product = {};

//Récupération de l'URL
const getProductById = async (product_id) => {
  await fetch(`http://localhost:3000/api/products/${product_id}`)
  .then((res) => res.json())
  .then ((promise) => {
    product = promise;
  });
};

const displayProduct = async() => {
  await getProductById(_id);
  const img = document.querySelector(".item__img");
  const balImg = document.createElement("img")
  balImg.setAttribute("src", `${product.imageUrl}`)
  balImg.setAttribute("alt", `${product.altTxt}`)
  img.appendChild(balImg);
    
  const title = document.getElementById("title");
  title.textContent = product.name;
    
  const price = document.getElementById("price");
  price.textContent = product.price;

  const description = document.getElementById("description");
  description.textContent = product.description;

  const option = document.getElementById("colors");
  product.colors.forEach(color => {
    let baliseOption = document.createElement("option");
    baliseOption.innerText = color;
    baliseOption.setAttribute("value", color)
    option.appendChild(baliseOption);
  });

  const quantity = document.getElementById("quantity");
  quantity.setAttribute("id", "quantityProduct");
  quantity.setAttribute("value", "1");
};

displayProduct();

//vérification nombre d'article
function checkNbArticle(inputQuantity) {
  let valueQuantity = inputQuantity.value;
  if (valueQuantity > 0 && valueQuantity < 101 ){
    return true;
  }
  else {
    return false;
  }
}

quantity.addEventListener('change', function () {
  let inputQuantity = document.getElementById("quantityProduct");
  if (checkNbArticle(inputQuantity) == false){
    alert("Merci de renseigner une valeur entre 1 et 100.");
    inputQuantity.value = 0;
  }
});

//Add to cart
const btnAddToCart = document.getElementById("addToCart");

btnAddToCart.addEventListener("click", (event)=>{
  event.preventDefault();
  

  let inputQuantity = document.getElementById("quantityProduct").value;
  const option = document.getElementById("colors").value;

  let cartProduct = {
    id: product._id,
    color: option,
    quantity: parseInt(inputQuantity),
  }
  
  const confirmationPopUp = () => {
    if(window.confirm (`${product.name}, de couleur ${cartProduct.color} et au nombre de ${cartProduct.quantity} à bien été ajouté au panier
    Consulter le panier OK ou poursuivre vos achats ANNULER`)){
      window.location.href = "cart.html";
    }
  }

  const addToMyLocalStorage = () => {
    myLocalStorage.push(cartProduct);
    localStorage.setItem("cart", JSON.stringify(myLocalStorage));
  }

  let myLocalStorage = JSON.parse(localStorage.getItem("cart"));
  if (myLocalStorage){
    var articlePresent = false;
    myLocalStorage.forEach((productStorage, index) => {
      if (productStorage.id == cartProduct.id && productStorage.color == cartProduct.color){
        myLocalStorage[index].quantity = parseInt(myLocalStorage[index].quantity) + parseInt(cartProduct.quantity);
        articlePresent = true;
      }
    });
    if (articlePresent == true){
      localStorage.setItem("cart", JSON.stringify(myLocalStorage));
      confirmationPopUp();
    }
    else{
      addToMyLocalStorage();
      confirmationPopUp();
    }
  }
  else{
    myLocalStorage = [];
    addToMyLocalStorage();
    confirmationPopUp();
  }
})



