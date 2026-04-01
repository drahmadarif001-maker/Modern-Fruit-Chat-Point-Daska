// Tabs
const tabs = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.product-section');

tabs.forEach(tab=>{
  tab.addEventListener('click',()=>{
    tabs.forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    sections.forEach(s=>s.classList.remove('active'));
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// CART SYSTEM
let cart = [];

// Add to cart
document.querySelectorAll(".add-cart").forEach(btn=>{
  btn.addEventListener("click",()=>{
    let card = btn.parentElement;
    let name = card.querySelector("h3").innerText;
    let price = parseInt(card.querySelector(".price").innerText);

    let item = cart.find(i=>i.name===name);

    if(item){
      item.qty++;
    }else{
      cart.push({name,price,qty:1});
    }

    updateCart();
  });
});

// Update cart
function updateCart(){
  let list = document.getElementById("cart-items");
  let total = 0;
  list.innerHTML = "";

  cart.forEach((item,index)=>{
    total += item.price * item.qty;

    let li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x${item.qty} = Rs ${item.price * item.qty}
      <button onclick="changeQty(${index},1)">+</button>
      <button onclick="changeQty(${index},-1)">-</button>
      <button onclick="removeItem(${index})">❌</button>
    `;
    list.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}

// Change qty
function changeQty(index,val){
  cart[index].qty += val;
  if(cart[index].qty <= 0){
    cart.splice(index,1);
  }
  updateCart();
}

// Remove item
function removeItem(index){
  cart.splice(index,1);
  updateCart();
}

// Send WhatsApp
function sendOrder(){
  if(cart.length===0){
    alert("Cart empty!");
    return;
  }

  let msg="🛒 Order:%0A";

  cart.forEach(i=>{
    msg+=`${i.name} x${i.qty} = Rs ${i.price*i.qty}%0A`;
  });

  let total=document.getElementById("total").innerText;
  msg+=`Total Bill: Rs ${total}`;

  window.open(`https://wa.me/923456862301?text=${msg}`);
}