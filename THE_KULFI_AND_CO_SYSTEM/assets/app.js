const DEFAULT_SETTINGS = {
  shop_name: "THE KULFI & CO",
  shop_phone: "0788245424 / 0760766195",
  shop_address: "68A, Main Street, Nintavur - 25",
  cashier_name: "Admin",
  tagline: "Enjoy the Rich, Creamy Delight of our traditional and Specialty Kulfi flavors!",
  default_discount: "0"
};

const BANKS = [
  "BOC","People's Bank","HNB","Sampath Bank","Amana Bank","NTB","Commercial Bank","Seylan Bank",
  "DFCC Bank","NDB Bank","Pan Asia Bank","Union Bank","Cargills Bank","Standard Chartered","HSBC",
  "Citibank","National Savings Bank (NSB)","Regional Development Bank (RDB)","Sanasa Development Bank","Other"
];

const DEFAULT_ITEMS = [
  {id:1,name:"Fruit n Nut Kulfi",category:"Rich in Flavors",price:200,image:"fruit_n_nut_kulfi.jpg",emoji:"🥜",active:true},
  {id:2,name:"Badam Kulfi",category:"Rich in Flavors",price:200,image:"badam_kulfi.jpg",emoji:"🌰",active:true},
  {id:3,name:"Fruit n Nut Choco Kulfi",category:"Rich in Flavors",price:200,image:"choco_kulfi.jpg",emoji:"🍫",active:true},
  {id:4,name:"Oreo Kulfi",category:"Rich in Flavors",price:200,image:"oreo_kulfi.jpg",emoji:"🍪",active:true},
  {id:5,name:"Milo Kulfi",category:"Rich in Flavors",price:200,image:"milo_kulfi.jpg",emoji:"☕",active:true},
  {id:6,name:"Nescafe Kulfi",category:"Rich in Flavors",price:200,image:"nescafe_kulfi.jpg",emoji:"☕",active:true},
  {id:7,name:"Duriyan Kulfi",category:"Seasonal Flavors",price:250,image:"duriyan_kulfi.jpg",emoji:"🍈",active:true},
  {id:8,name:"Karutha Kulambaan Kulfi",category:"Seasonal Flavors",price:200,image:"karutha_kulambaan_kulfi.jpg",emoji:"🥭",active:true},
  {id:9,name:"Avacado Kulfi",category:"Seasonal Flavors",price:200,image:"avacado_kulfi.jpg",emoji:"🥑",active:true},
  {id:10,name:"Passion Fruit Kulfi",category:"Seasonal Flavors",price:200,image:"passion_fruit_kulfi.jpg",emoji:"🍋",active:true},
  {id:11,name:"Jack Fruit Kulfi",category:"Seasonal Flavors",price:200,image:"jack_fruit_kulfi.jpg",emoji:"🍈",active:true},
  {id:12,name:"Wood Apple Kulfi",category:"Seasonal Flavors",price:200,image:"wood_apple_kulfi.jpg",emoji:"🍏",active:true},
  {id:13,name:"Milk Ice Pop",category:"Regular Pops",price:130,image:"milk_ice_pop.jpg",emoji:"🥛",active:true},
  {id:14,name:"Faluda Ice Pop",category:"Regular Pops",price:130,image:"faluda_ice_pop.jpg",emoji:"🥤",active:true},
  {id:15,name:"3 in 1 Ice Pop",category:"Regular Pops",price:180,image:"3_in_1_ice_pop.jpg",emoji:"🍦",active:true},
  {id:16,name:"Banana Ice Pop",category:"Regular Pops",price:130,image:"banana_ice_pop.jpg",emoji:"🍌",active:true},
  {id:17,name:"BlueBerry Ice Pop",category:"Regular Pops",price:130,image:"blueberry_ice_pop.jpg",emoji:"🫐",active:true},
  {id:18,name:"Mango Ice Pop",category:"Regular Pops",price:130,image:"mango_ice_pop.jpg",emoji:"🥭",active:true},
  {id:19,name:"Strawberry Ice Pop",category:"Regular Pops",price:130,image:"strawberry_ice_pop.jpg",emoji:"🍓",active:true},
  {id:20,name:"Kuluki Ice Pop",category:"Regular Pops",price:130,image:"kuluki_ice_pop.jpg",emoji:"🍋",active:true},
  {id:21,name:"Choco Ice Pop",category:"Regular Pops",price:160,image:"choco_ice_pop.jpg",emoji:"🍫",active:true},
  {id:22,name:"Nestea",category:"Hot & Beverages",price:100,image:"nestea.jpg",emoji:"🍵",active:true},
  {id:23,name:"Nescafe",category:"Hot & Beverages",price:100,image:"nescafe.jpg",emoji:"☕",active:true},
  {id:24,name:"Croissant Spicy Bun",category:"Bakery",price:60,image:"croissant_spicy_bun.jpg",emoji:"🥐",active:true},
  {id:25,name:"Watlapam Small",category:"Desserts",price:150,image:"watlapam.jpg",emoji:"🍮",active:true},
  {id:26,name:"Watlapam Medium",category:"Desserts",price:250,image:"watlapam.jpg",emoji:"🍮",active:true},
  {id:27,name:"Watlapam Large",category:"Desserts",price:350,image:"watlapam.jpg",emoji:"🍮",active:true},
  {id:28,name:"Custard Pudding Small",category:"Desserts",price:150,image:"custard_pudding.jpg",emoji:"🍨",active:true},
  {id:29,name:"Custard Pudding Medium",category:"Desserts",price:250,image:"custard_pudding.jpg",emoji:"🍨",active:true},
  {id:30,name:"Custard Pudding Large",category:"Desserts",price:350,image:"custard_pudding.jpg",emoji:"🍨",active:true}
];

let cart = [];

function getSettings(){ return JSON.parse(localStorage.getItem("kulfi_settings") || JSON.stringify(DEFAULT_SETTINGS)); }
function setSettings(s){ localStorage.setItem("kulfi_settings", JSON.stringify(s)); }
function getItems(){ return JSON.parse(localStorage.getItem("kulfi_items") || JSON.stringify(DEFAULT_ITEMS)); }
function setItems(items){ localStorage.setItem("kulfi_items", JSON.stringify(items)); }
function getSales(){ return JSON.parse(localStorage.getItem("kulfi_sales") || "[]"); }
function setSales(sales){ localStorage.setItem("kulfi_sales", JSON.stringify(sales)); }

function showPage(page){
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(page+"Page").classList.remove("hidden");
  renderAll();
}

function init(){
  if(!localStorage.getItem("kulfi_settings")) setSettings(DEFAULT_SETTINGS);
  if(!localStorage.getItem("kulfi_items")) setItems(DEFAULT_ITEMS);
  BANKS.forEach(b => document.getElementById("cardBank").innerHTML += `<option value="${b}">${b}</option>`);
  tick(); setInterval(tick,1000);
  loadSettingsToForm();
  renderAll();
}
document.addEventListener("DOMContentLoaded", init);

function tick(){ document.getElementById("clock").innerText = new Date().toLocaleString(); }

function renderAll(){
  const s = getSettings();
  document.getElementById("headerShopName").innerText = s.shop_name;
  document.getElementById("cashierName").value = document.getElementById("cashierName").value || s.cashier_name;
  document.getElementById("discountPercent").value = document.getElementById("discountPercent").value || s.default_discount;
  document.getElementById("billNo").innerText = nextBillNo();
  renderStats(); renderCategories(); renderItems(); renderCart(); renderManageItems(); renderSales();
}

function renderStats(){
  const sales = getSales();
  const today = new Date().toISOString().slice(0,10);
  const todaySales = sales.filter(s => s.dateISO === today);
  const total = todaySales.reduce((a,b)=>a+b.grand_total,0);
  document.getElementById("todaySales").innerText = "Rs."+Math.round(total);
  document.getElementById("todayBills").innerText = todaySales.length;
  document.getElementById("activeItems").innerText = getItems().filter(i=>i.active).length;

  const counts = {};
  sales.forEach(b => b.items.forEach(i => counts[i.name]=(counts[i.name]||0)+i.qty));
  const best = Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];
  document.getElementById("bestItem").innerText = best ? best[0] : "No sales yet";
}

function renderCategories(){
  const sel = document.getElementById("categoryFilter");
  const current = sel.value;
  const cats = [...new Set(getItems().filter(i=>i.active).map(i=>i.category))].sort();
  sel.innerHTML = `<option value="">All Categories</option>` + cats.map(c=>`<option value="${c}">${c}</option>`).join("");
  sel.value = current;
}

function imageOrEmoji(item){
  if(item.image){
    return `<img src="images/${item.image}" onerror="this.outerHTML='${item.emoji || "🍦"}'">`;
  }
  return item.emoji || "🍦";
}

function getDisplayItems(){
  const items = getItems().filter(i=>i.active);
  const used = new Set();
  const result = [];
  const groups = {
    "Watlapam": ["Watlapam Small","Watlapam Medium","Watlapam Large"],
    "Custard Pudding": ["Custard Pudding Small","Custard Pudding Medium","Custard Pudding Large"]
  };
  Object.entries(groups).forEach(([groupName,names])=>{
    const variants = items.filter(i => names.includes(i.name));
    variants.forEach(v => used.add(v.id));
    if(variants.length){
      result.push({type:"group",name:groupName,category:variants[0].category,image:variants[0].image,emoji:variants[0].emoji,variants});
    }
  });
  items.forEach(i => { if(!used.has(i.id)) result.push({...i,type:"single"}); });
  return result.sort((a,b)=>(a.category+a.name).localeCompare(b.category+b.name));
}

function renderItems(){
  const q = (document.getElementById("searchBox").value || "").toLowerCase();
  const cat = document.getElementById("categoryFilter").value;
  const grid = document.getElementById("itemsGrid");
  grid.innerHTML = "";
  getDisplayItems().filter(i => i.name.toLowerCase().includes(q) && (!cat || i.category===cat)).forEach(item=>{
    if(item.type==="group"){
      const safe = JSON.stringify(item.variants).replace(/"/g,'&quot;');
      grid.innerHTML += `<div class="item" onclick="openSizeModal('${item.name}', ${safe})">
        <div class="add-badge">S/M/L</div><div class="item-img">${imageOrEmoji(item)}</div>
        <div class="item-body"><div class="cat">${item.category}</div><h3>${item.name}</h3><div class="price">Choose Size</div></div></div>`;
    }else{
      grid.innerHTML += `<div class="item" onclick="addToCart(${item.id})">
        <div class="add-badge">+</div><div class="item-img">${imageOrEmoji(item)}</div>
        <div class="item-body"><div class="cat">${item.category}</div><h3>${item.name}</h3><div class="price">Rs.${item.price}</div></div></div>`;
    }
  });
}

function openSizeModal(title, variants){
  document.getElementById("sizeTitle").innerText = title + " - Choose Size";
  document.getElementById("sizeButtons").innerHTML = variants.map(v => `<button class="size-option" onclick="addToCart(${v.id}); closeSizeModal();"><b>${v.name.replace(title,'').trim()}</b><span>Rs.${v.price}</span></button>`).join("");
  document.getElementById("sizeModal").style.display = "flex";
}
function closeSizeModal(){ document.getElementById("sizeModal").style.display = "none"; }

function addToCart(id){
  const item = getItems().find(i=>i.id===id);
  if(!item) return;
  const found = cart.find(i=>i.id===id);
  if(found) found.qty++;
  else cart.push({id:item.id,name:item.name,price:item.price,qty:1});
  renderCart();
}
function inc(id){ cart.find(i=>i.id===id).qty++; renderCart(); }
function dec(id){ const item=cart.find(i=>i.id===id); if(item.qty>1)item.qty--; else cart=cart.filter(i=>i.id!==id); renderCart(); }
function rem(id){ cart=cart.filter(i=>i.id!==id); renderCart(); }
function clearCart(){ cart=[]; document.getElementById("cashInput").value=""; document.getElementById("balanceBox").value=""; document.getElementById("cardLast4").value=""; renderCart(); }

function subTotal(){ return cart.reduce((sum,item)=>sum+item.qty*item.price,0); }
function discountPercent(){ return Number(document.getElementById("discountPercent").value || 0); }
function discountAmount(){ return subTotal()*discountPercent()/100; }
function grandTotal(){ return subTotal()-discountAmount(); }

function renderCart(){
  const c = document.getElementById("cart");
  if(!cart.length)c.innerHTML='<div class="cart-empty">Select items to create bill 🧾</div>';
  else c.innerHTML = cart.map(i=>`<div class="cart-row">
    <div><b>${i.name}</b><div class="mini">Rs.${i.price} × ${i.qty} = Rs.${i.price*i.qty}</div></div>
    <div class="qty"><button onclick="dec(${i.id})">−</button><b>${i.qty}</b><button onclick="inc(${i.id})">+</button></div>
    <button class="round remove" onclick="rem(${i.id})">×</button></div>`).join("");
  document.getElementById("subTotal").innerText = Math.round(subTotal());
  document.getElementById("discountAmount").value = "Rs."+Math.round(discountAmount());
  document.getElementById("grandTotal").innerText = Math.round(grandTotal());
  updateBalance();
}

function togglePaymentFields(){
  const m = document.getElementById("paymentMethod").value;
  document.getElementById("cardFields").style.display = m==="Card" ? "block" : "none";
  document.getElementById("cashInput").style.display = m==="Cash" ? "block" : "none";
  if(m==="Card") document.getElementById("cashInput").value="";
  updateBalance();
}
function updateBalance(){
  const m = document.getElementById("paymentMethod").value;
  if(m==="Cash"){
    const cash = Number(document.getElementById("cashInput").value || 0);
    document.getElementById("balanceBox").value = cash ? "Rs." + Math.round(cash-grandTotal()) : "";
  }else document.getElementById("balanceBox").value = "Paid by Card";
}

function nextBillNo(){ return String(getSales().length + 1).padStart(4,"0"); }

function pad(text,len,side="right"){ text=String(text); if(text.length>len)return text.substring(0,len); return side==="left"?text.padStart(len," "):text.padEnd(len," "); }
function wrap(text,width){ let words=text.split(" "),lines=[],line=""; words.forEach(w=>{if((line+w).length>width){lines.push(line.trim());line=w+" ";}else line+=w+" ";}); if(line.trim())lines.push(line.trim()); return lines; }

function makeReceipt(bill){
  const s = getSettings();
  let r="";
  r+="================================\n";
  r+="          THE KULFI & CO\n";
  r+="   Traditional & Specialty Kulfi\n";
  r+="================================\n";
  r+="📍 "+s.shop_address+"\n";
  r+="☎  "+s.shop_phone+"\n";
  r+="👤 Cashier : "+bill.cashier_name+"\n";
  r+="--------------------------------\n";
  r+="Bill No : "+bill.bill_no+"\n";
  r+="Date    : "+bill.date+"\n";
  r+="Time    : "+bill.time+"\n";
  r+="--------------------------------\n";
  r+="Item              Qty Rate  Amt\n";
  r+="--------------------------------\n";
  bill.items.forEach(i=>{ r+=pad(i.name,16)+pad(i.qty,3,"left")+pad(i.price,5,"left")+pad(i.qty*i.price,5,"left")+"\n"; });
  r+="--------------------------------\n";
  r+="Sub Total              Rs."+Math.round(bill.total)+"\n";
  r+="Discount "+String(Math.round(bill.discount_percent)).padStart(3," ")+"%          Rs."+Math.round(bill.discount_amount)+"\n";
  r+="--------------------------------\n";
  r+="TOTAL                  Rs."+Math.round(bill.grand_total)+"\n";
  r+="Payment : "+bill.payment_method+"\n";
  if(bill.payment_method==="Cash"){ r+="Cash                   Rs."+Math.round(bill.cash)+"\n"; r+="Balance                Rs."+Math.round(bill.balance)+"\n"; }
  else{ r+="Card Bank : "+bill.card_bank+"\n"; r+="Card Last : **** "+bill.card_last4+"\n"; }
  r+="--------------------------------\n\n";
  wrap(s.tagline,30).forEach(line=>r+=" "+line+"\n");
  r+="\n      Thank You For Choosing\n";
  r+="          THE KULFI & CO\n\n";
  r+="          Visit Us Again!\n";
  r+="================================\n";
  return r;
}

function saveAndPrint(){
  if(!cart.length){ alert("Please select items first."); return; }
  const method = document.getElementById("paymentMethod").value;
  const bank = document.getElementById("cardBank").value;
  const last4 = document.getElementById("cardLast4").value.trim();
  if(method==="Card" && (!bank || last4.length!==4 || isNaN(last4))){ alert("Please select card bank and enter valid last 4 digits."); return; }
  const now = new Date();
  const bill = {
    bill_no: nextBillNo(),
    dateISO: now.toISOString().slice(0,10),
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    created_at: now.toLocaleString(),
    items: JSON.parse(JSON.stringify(cart)),
    total: subTotal(),
    discount_percent: discountPercent(),
    discount_amount: discountAmount(),
    grand_total: grandTotal(),
    payment_method: method,
    cash: Number(document.getElementById("cashInput").value || 0),
    balance: method==="Cash" ? Number(document.getElementById("cashInput").value || 0)-grandTotal() : 0,
    card_bank: bank,
    card_last4: last4,
    cashier_name: document.getElementById("cashierName").value || getSettings().cashier_name
  };
  const sales = getSales(); sales.push(bill); setSales(sales);
  document.getElementById("receiptText").innerText = makeReceipt(bill);
  document.getElementById("receiptArea").style.display = "block";
  window.print();
  clearCart(); renderAll();
}

function loadSettingsToForm(){
  const s=getSettings();
  document.getElementById("setShopName").value=s.shop_name;
  document.getElementById("setPhone").value=s.shop_phone;
  document.getElementById("setAddress").value=s.shop_address;
  document.getElementById("setCashier").value=s.cashier_name;
  document.getElementById("setDiscount").value=s.default_discount;
  document.getElementById("setTagline").value=s.tagline;
}
function saveSettings(){
  const s={
    shop_name:document.getElementById("setShopName").value,
    shop_phone:document.getElementById("setPhone").value,
    shop_address:document.getElementById("setAddress").value,
    cashier_name:document.getElementById("setCashier").value,
    default_discount:document.getElementById("setDiscount").value,
    tagline:document.getElementById("setTagline").value
  };
  setSettings(s); alert("Settings saved"); renderAll();
}

function renderManageItems(){
  const box=document.getElementById("manageItems"); if(!box)return;
  box.innerHTML = getItems().map(i=>`<div class="manage-row">
    <input class="field" id="n${i.id}" value="${i.name}">
    <input class="field" id="c${i.id}" value="${i.category}">
    <input class="field" id="p${i.id}" type="number" value="${i.price}">
    <input class="field" id="e${i.id}" value="${i.emoji||''}">
    <input class="field" id="img${i.id}" value="${i.image||''}" placeholder="image.jpg">
    <button class="btn btn-green" onclick="updateItem(${i.id})">Update</button>
    <button class="btn btn-danger" onclick="deleteItem(${i.id})">Hide</button>
  </div>`).join("");
}
function addNewItem(){
  const items=getItems();
  const id=Math.max(...items.map(i=>i.id),0)+1;
  items.push({id,name:val("newName"),category:val("newCategory"),price:Number(val("newPrice")),emoji:val("newEmoji")||"🍦",image:val("newImage"),active:true});
  setItems(items); ["newName","newCategory","newPrice","newEmoji","newImage"].forEach(id=>document.getElementById(id).value=""); renderAll();
}
function val(id){ return document.getElementById(id).value.trim(); }
function updateItem(id){
  const items=getItems(); const i=items.find(x=>x.id===id);
  i.name=val("n"+id); i.category=val("c"+id); i.price=Number(val("p"+id)); i.emoji=val("e"+id); i.image=val("img"+id); i.active=true;
  setItems(items); renderAll();
}
function deleteItem(id){ const items=getItems(); const i=items.find(x=>x.id===id); i.active=false; setItems(items); renderAll(); }

function renderSales(){
  const table=document.getElementById("salesTable"); if(!table)return;
  const sales=getSales();
  table.innerHTML = `<tr><th>Bill</th><th>Date</th><th>Total</th><th>Discount</th><th>Grand Total</th><th>Payment</th><th>Cashier</th><th>Reprint</th></tr>` +
  sales.map((b,idx)=>`<tr><td>${b.bill_no}</td><td>${b.created_at}</td><td>Rs.${Math.round(b.total)}</td><td>${b.discount_percent}%</td><td>Rs.${Math.round(b.grand_total)}</td><td>${b.payment_method}</td><td>${b.cashier_name}</td><td><button class="btn mini-btn" onclick="reprint(${idx})">Print</button></td></tr>`).join("");
}
function reprint(idx){ const b=getSales()[idx]; document.getElementById("receiptText").innerText=makeReceipt(b); document.getElementById("receiptArea").style.display="block"; window.print(); }
function clearSales(){ if(confirm("Clear all sales?")){ setSales([]); renderAll(); } }
function exportCSV(){
  const sales=getSales();
  let csv="Bill No,Date Time,Sub Total,Discount %,Discount Amount,Grand Total,Payment,Cash,Balance,Card Bank,Card Last4,Cashier\n";
  sales.forEach(b=>csv += [b.bill_no,b.created_at,b.total,b.discount_percent,b.discount_amount,b.grand_total,b.payment_method,b.cash,b.balance,b.card_bank,b.card_last4,b.cashier_name].map(x=>`"${x}"`).join(",")+"\n");
  const blob=new Blob([csv],{type:"text/csv"}); const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="the_kulfi_and_co_sales.csv"; a.click();
}
