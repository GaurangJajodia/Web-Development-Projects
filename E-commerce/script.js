document.addEventListener("DOMContentLoaded",()=>{
    const products=[
        {id:1, name:"Product 1", price:20} ,
        {id:2, name:"Product 2", price:10} ,
        {id:3, name:"Product 3", price:40},
    ];
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage= document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");
   function RenderProducts(){
        productList.innerHTML="";
        products.forEach((product)=>{
            const ProductDiv = document.createElement("div");
            ProductDiv.classList.add("product");
            ProductDiv.innerHTML= `<span>${product.name}-$${product.price}</span>
                                  <button class="btn" data-id="${product.id}">Add To Cart</button>`;
            productList.appendChild(ProductDiv)
   });
}
    productList.addEventListener("click",(e)=>{
        if(e.target.tagName='BUTTON'){
          const ProductId = parseInt(e.target.getAttribute("data-id"));
         const product= products.find((p)=>p.id===ProductId)
         addToCart(product);
        }
    });
    function addToCart(product){
        if(!product) return;
        cart.push(product);
        saveLocalStorage();
        RenderCart();
    }
    function saveLocalStorage(){
        localStorage.setItem("cart",JSON.stringify(cart));
    }
    function RenderCart (){
        cartItems.querySelectorAll(".cart-item").forEach((element)=>element.remove());
        if(cart.length===0){
            emptyCartMessage.classList.remove("hidden");
            cartTotalMessage.classList.add("hidden");
            return;
        }
        emptyCartMessage.classList.add("hidden");
        cartTotalMessage.classList.remove("hidden");
        cart.forEach((item)=>{
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML=`<span>${item.name}-$${item.price}</span>
                                <button class="btn" data-id=${item.id}>Delete</button>`;
            cartItems.appendChild(cartItem);
        })
        RenderPrice();
    }
    function RenderPrice (){
        let price=0;
        cart.forEach((i)=>{
            price+=i.price;
        })
        totalPriceDisplay.innerHTML=`${price.toFixed(2)}`;
    }
    cartItems.addEventListener("click",(e)=>{
        if(e.target.tagName='BUTTON'){
          const cartItemId =  parseInt(e.target.getAttribute("data-id"));
          DeleteFromCart(cartItemId);
        }
    });
    function DeleteFromCart(cartItemId){
        cart=cart.filter((item)=>item.id!==cartItemId);
        saveLocalStorage();
        RenderCart();
    }
    checkOutBtn.addEventListener("click",()=>{
        cart.length=0
        totalPriceDisplay.textContent=0
        saveLocalStorage();
        RenderCart;
        alert("Successfully checkedout");
    });
    RenderProducts();
    RenderCart();
})
