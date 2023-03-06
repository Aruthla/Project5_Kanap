async function fetchApi(product_id){
  const r = await fetch(`http://localhost:3000/api/products/${product_id}`);
  if(r.ok === true){
    const data = await r.json();
    return data;
  }
  else{
    return null;
  };
};

function displayCartProduct(products){
  const displayCart = document.getElementById("cart__items");
  let productNbTotal = 0;
  let totalPrice = 0;
  products.forEach(async (productCart) => {
    const productDataFromApi = await fetchApi(productCart.id);
    if(productDataFromApi){
      productNbTotal += productCart.quantity;
      totalPrice += productCart.quantity*productDataFromApi.price;

      document.getElementById("totalQuantity").textContent = `${productNbTotal}`;

      document.getElementById("totalPrice").textContent = `${totalPrice}`;

      let baliseArticleCart = document.createElement("article")
      baliseArticleCart.setAttribute("data-id", `${productCart.id}`);
      baliseArticleCart.setAttribute("data-color", `${productCart.color}`);
      baliseArticleCart.classList.add("cart__item");
      displayCart.appendChild(baliseArticleCart);

      let baliseImgCartContainer = document.createElement("div");
      baliseImgCartContainer.classList.add("cart__item__img");
      baliseArticleCart.appendChild(baliseImgCartContainer);
      
      let baliseImgCart = document.createElement("img")
      baliseImgCart.setAttribute("src", `${productDataFromApi.imageUrl}`)
      baliseImgCart.setAttribute("alt", `${productDataFromApi.altTxt}`)
      baliseImgCartContainer.appendChild(baliseImgCart);

      let baliseCartContainer = document.createElement("div");
      baliseCartContainer.classList.add("cart__item__content");
      baliseArticleCart.appendChild(baliseCartContainer);

      let baliseDescriptionCartContainer = document.createElement("div");
      baliseDescriptionCartContainer.classList.add("cart__item__content__description");
      baliseCartContainer.appendChild(baliseDescriptionCartContainer);

      let baliseTitleCart = document.createElement("h2");
      baliseTitleCart.textContent = `${productDataFromApi.name}`
      baliseDescriptionCartContainer.appendChild(baliseTitleCart);

      let baliseTextColorCart = document.createElement("p");
      baliseTextColorCart.textContent = `${productCart.color}`
      baliseDescriptionCartContainer.appendChild(baliseTextColorCart);

      let baliseTextPriceCart = document.createElement("p");
      baliseTextPriceCart.textContent = `${productDataFromApi.price}€`
      baliseDescriptionCartContainer.appendChild(baliseTextPriceCart);

      let baliseSettingsCartContainer = document.createElement("div");
      baliseSettingsCartContainer.classList.add("cart__item__content__settings");
      baliseCartContainer.appendChild(baliseSettingsCartContainer);

      let baliseQuantityCartContainer = document.createElement("div");
      baliseQuantityCartContainer.classList.add("cart__item__content__settings__quantity");
      baliseSettingsCartContainer.appendChild(baliseQuantityCartContainer);

      let baliseQuantityCart = document.createElement("p");
      baliseQuantityCart.textContent = "Qté : "
      baliseQuantityCartContainer.appendChild(baliseQuantityCart);

      let baliseInputQuantity = document.createElement("input");
      baliseInputQuantity.classList.add("itemQuantity");
      baliseInputQuantity.setAttribute("type", "number");
      baliseInputQuantity.setAttribute("name", "itemQuantity");
      baliseInputQuantity.setAttribute("value", `${productCart.quantity}`);
      baliseInputQuantity.addEventListener('change', function (e) {
        e.preventDefault();
        if (checkNbArticle(baliseInputQuantity)){
          const addToMyLocalStorage = () => {
            myLocalStorage.push(cartProduct);
            localStorage.setItem("cart", JSON.stringify(myLocalStorage));
          }
        
          let myLocalStorage = JSON.parse(localStorage.getItem("cart"));
          if (myLocalStorage){
            var articlePresent = false;
            myLocalStorage.forEach((productStorage, index) => {
              if (productStorage.id == productCart.id && productStorage.color == productCart.color){
                myLocalStorage[index].quantity = Number(baliseInputQuantity.value);
                articlePresent = true;
              }
            });
            if (articlePresent == true){
              localStorage.setItem("cart", JSON.stringify(myLocalStorage));
            }
            else{
              addToMyLocalStorage();
            }
          }
          location.reload();
        }
        else{
          alert("Merci de renseigner une valeur entre 1 et 100.");
          baliseInputQuantity.value = 0;
        }
      });
      baliseQuantityCartContainer.appendChild(baliseInputQuantity);

      let baliseDeleteCartContainer = document.createElement("div");
      baliseDeleteCartContainer.classList.add("cart__item__content__settings__delete");
      baliseSettingsCartContainer.appendChild(baliseDeleteCartContainer);

      let baliseDeleteCart = document.createElement("p");
      baliseDeleteCart.classList.add("deleteItem");
      baliseDeleteCart.textContent = "Supprimer"
      baliseDeleteCartContainer.appendChild(baliseDeleteCart);
      baliseDeleteCart.addEventListener("click", function(e) {
        e.preventDefault();
        const item = e.target;
        const cartproduct = item.parentElement;
        removeFromLocal(productCart);
        cartproduct.remove();
        window.location.reload();
      });
    }
    else{
      alert("Une erreur est survenue lors de la récupération des données");
    };
  });
};

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

function removeFromLocal(productCart) {
  let productsCart;
  if (localStorage.getItem("cart")) {
    productsCart = JSON.parse(localStorage.getItem("cart"));
  } else {
    productsCart = [];
  }
  const index = productsCart.findIndex(item => item.id === productCart.id && item.color === productCart.color && item.quantity === productCart.quantity);
  productsCart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(productsCart));
}

function submitEvent(){
  const submitForm = document.getElementById("order");
  submitForm.addEventListener("click", (e)=>{
    e.preventDefault();
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value
    };

    const regExEmail = (value) => {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    };

    const errorFirstName = document.getElementById("firstNameErrorMsg");
    const errorLastName = document.getElementById("lastNameErrorMsg");
    const errorAddress = document.getElementById("addressErrorMsg");
    const errorCity = document.getElementById("cityErrorMsg");
    const errorEmail = document.getElementById("emailErrorMsg");

    function FirstNameControl(){
      const firstName = contact.firstName;
      if(firstName){
        errorFirstName.textContent = "";
        return true;
      }
      else{
        errorFirstName.textContent = "Veuillez bien remplir ce champ";
        alert("Veuillez bien remplir le formulaire");
        return false;
      };
    };

    function lastNameControl(){
      const lastName = contact.lastName;
      if(lastName){
        errorLastName.textContent = "";
        return true;
      }
      else{
        errorLastName.textContent = "Veuillez bien remplir ce champ";
        alert("Veuillez bien remplir le formulaire");
        return false;
      };
    };

    function addressControl(){
      const address = contact.address;
      if(address){
        errorAddress.textContent = "";
        return true;
      }
      else{
        errorAddress.textContent = "Veuillez bien remplir ce champ";
        alert("Veuillez bien remplir le formulaire");
        return false;
      };
    };

    function cityControl(){
      const city = contact.city;
      if(city){
        errorCity.textContent = "";
        return true;
      }
      else{
        errorCity.textContent = "Veuillez bien remplir ce champ";
        alert("Veuillez bien remplir le formulaire");
        return false;
      };
    };

    function emailControl(){
      const email = contact.email;
      if(regExEmail(email)){
        errorEmail.textContent = "";
        return true;
      }
      else{
        errorEmail.textContent = "Veuillez bien remplir ce champ";
        alert("Veuillez bien remplir le formulaire");
        return false;
      };
    };

    const toSubmit ={
      contact,
      products: getIdFromLocalStorage(),
    };

    function getIdFromLocalStorage(){
      const myLocalStorage = JSON.parse(localStorage.getItem("cart"));
      const idFromStorage = [];
      for (let i = 0; i < myLocalStorage.length; i++){
        let productId = myLocalStorage[i].id;
        idFromStorage.push(productId);
      };
      return idFromStorage;
    }
    
    if(FirstNameControl() && lastNameControl() && addressControl() && cityControl() && emailControl()){
      localStorage.setItem("contact", JSON.stringify(contact));
    }
    else{
      alert("Merci de remplir le formulaire");
    };

    const postProductById = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(toSubmit),
      headers:{
        "Content-Type": "application/json",
      }
    })
    .then((res) => res.json())
    .then ((data) => {
      window.location.href = `confirmation.html?orderId=${data.orderId}`;
      console.log(data);
    })
    .catch((err) => console.log(err))

    console.log(postProductById);
  });
};

async function init(){
  const myLocalStorage = JSON.parse(localStorage.getItem("cart"));
  
  if(myLocalStorage && Array.isArray(myLocalStorage) && myLocalStorage.length > 0){
    displayCartProduct(myLocalStorage);
    submitEvent();
  }
  else{
    const emptyCart = document.getElementById("cart__items");
    emptyCartTitle = document.createElement("h2");
    emptyCartTitle.textContent ="Votre panier est vide";
    emptyCart.appendChild(emptyCartTitle);
  };
};

init();