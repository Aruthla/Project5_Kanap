function getOrderId(){
    const queryString_id = window.location.search;
    const urlSearchParams = new URLSearchParams(queryString_id);
    const orderId = urlSearchParams.get("orderId");
    return orderId;
};

const orderId = getOrderId();


let baliseOrderId = document.getElementById("orderId");
baliseOrderId.textContent = orderId;

const clearStorage = () => {
    const storage = localStorage;
    storage.clear();
};

clearStorage();
