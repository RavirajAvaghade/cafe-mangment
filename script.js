function login(e){
  e.preventDefault();
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  if(u==="admin" && p==="1234"){
    localStorage.setItem("cafeUser",u);
    window.location="index.html";
  }else{
    alert("Invalid Login");
  }
}

function protect(){
  if(!localStorage.getItem("cafeUser")){
    window.location="login.html";
  }
}

function logout(){
  localStorage.removeItem("cafeUser");
  window.location="login.html";
}
function addItem(name, price){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find(i => i.name === name);
  if(item){
    item.qty++;
  } else {
    cart.push({name, price, qty:1});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}
function goToOrder(){
  window.location.href = "order.html";
}
function loadOrder(){
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;
  const body = document.getElementById("orderBody");

  body.innerHTML = "";

  cart.forEach(i=>{
    total += i.price * i.qty;
    body.innerHTML += `
      <tr>
        <td>${i.name}</td>
        <td>${i.qty}</td>
        <td>₹${i.price*i.qty}</td>
      </tr>`;
  });

  document.getElementById("total").innerText = total;
}

function goPayment(){
  window.location.href = "payment.html";
}

function loadOrder(){
  let order = JSON.parse(localStorage.getItem("order")) || [];
  const body = document.getElementById("orderBody");
  const totalEl = document.getElementById("total");

  body.innerHTML = "";
  let total = 0;

  order.forEach((o, i) => {
    if(!o.qty) o.qty = 1;

    total += o.price * o.qty;

    body.innerHTML += `
      <tr>
        <td>${o.item}</td>
        <td>₹${o.price}</td>
        <td>
          <button onclick="changeQty(${i}, -1)">-</button>
          ${o.qty}
          <button onclick="changeQty(${i}, 1)">+</button>
        </td>
        <td>
          <button onclick="removeItem(${i})">❌</button>
        </td>
      </tr>
    `;
  });

  totalEl.innerText = total;
  localStorage.setItem("order", JSON.stringify(order));
}

function changeQty(index, change){
  let order = JSON.parse(localStorage.getItem("order")) || [];
  order[index].qty += change;
  if(order[index].qty < 1) order[index].qty = 1;
  localStorage.setItem("order", JSON.stringify(order));
  loadOrder();
}

function removeItem(index){
  let order = JSON.parse(localStorage.getItem("order")) || [];
  order.splice(index,1);
  localStorage.setItem("order", JSON.stringify(order));
  loadOrder();
}
function loadBill(){
  let order = JSON.parse(localStorage.getItem("order")) || [];
  let body = document.getElementById("billBody");
  let total = 0;

  body.innerHTML = "";

  order.forEach(o=>{
    body.innerHTML += `
      <tr>
        <td>${o.item}</td>
        <td>${o.qty}</td>
        <td>₹${o.price * o.qty}</td>
      </tr>`;
    total += o.price * o.qty;
  });

  document.getElementById("billTotal").innerText = total;

  let history = JSON.parse(localStorage.getItem("history")) || [];
  history.push({date:new Date().toLocaleString(), total});
  localStorage.setItem("history", JSON.stringify(history));

  localStorage.removeItem("order");
}

function loadHistory(){
  let history = JSON.parse(localStorage.getItem("history")) || [];
  let body = document.getElementById("historyBody");

  body.innerHTML = "";
  history.forEach(h=>{
    body.innerHTML += `<tr><td>${h.date}</td><td>₹${h.total}</td></tr>`;
  });
}

function loadReport(){
  let history = JSON.parse(localStorage.getItem("history")) || [];
  let sum = history.reduce((a,b)=>a+b.total,0);
  document.getElementById("sales").innerText = sum;
}
function saveCafeName(){
  const name = document.getElementById("cafeName").value;
  if(name){
    localStorage.setItem("cafeName", name);
    alert("Cafe name saved");
  }
}

function loadSettings(){
  const name = localStorage.getItem("cafeName");
  if(name && document.getElementById("cafeName")){
    document.getElementById("cafeName").value = name;
  }
}

function clearOrders(){
  if(confirm("Clear current order?")){
    localStorage.removeItem("order");
    alert("Current order cleared");
  }
}

function clearHistory(){
  if(confirm("Clear order history?")){
    localStorage.removeItem("history");
    alert("Order history cleared");
  }
}

function setTheme(theme){
  document.body.className = theme;
  localStorage.setItem("theme", theme);
}
function toggleMenu(){
  document.getElementById("sideMenu").classList.toggle("show");
}
// =====================
// CART SYSTEM
// =====================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addItem(name, price){
  const item = cart.find(i => i.name === name);

  if(item){
    item.qty++;
  } else {
    cart.push({ name, price, qty:1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart");
}

// =====================
// LOAD BILL
// =====================
function loadBill(){
  const tbody = document.getElementById("billBody");
  const totalBox = document.getElementById("grandTotal");

  tbody.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const amount = item.price * item.qty;
    total += amount;

    tbody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
        <td>${item.qty}</td>
        <td>₹${amount}</td>
      </tr>
    `;
  });

  totalBox.innerText = "₹ " + total;
}

// =====================
// CLEAR CART
// =====================
function clearCart(){
  cart = [];
  localStorage.removeItem("cart");
  alert("Order completed");
  window.location.href = "menu.html";
}
