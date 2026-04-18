async function loadDashboard() {
  const res = await fetch("/api/dashboard");
  const data = await res.json();

  document.getElementById("totalOrders").innerText = data.totalOrders;
  document.getElementById("revenue").innerText = "₹" + data.totalRevenue;
  document.getElementById("received").innerText = data.received;
  document.getElementById("processing").innerText = data.processing;
  document.getElementById("ready").innerText = data.ready;
  document.getElementById("delivered").innerText = data.delivered;
}

async function createOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const garment = document.getElementById("garment").value;
  const qty = document.getElementById("qty").value;

  if (!name || !phone || !qty) {
    alert("Please fill all fields");
    return;
  }

  const res = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      phone,
      garment,
      qty: Number(qty)
    })
  });

  const data = await res.json();


  showToast("Order Created: " + data.id);

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("qty").value = "";

  loadOrders();
  loadDashboard();
}

function showToast(msg){
  const div = document.createElement("div");
  div.innerText = msg;
  div.style.position="fixed";
  div.style.bottom="20px";
  div.style.right="20px";
  div.style.background="#111";
  div.style.color="#fff";
  div.style.padding="12px 20px";
  div.style.borderRadius="8px";
  document.body.appendChild(div);

  setTimeout(()=>div.remove(),3000);
}

async function loadOrders() {
  const search = document.getElementById("search").value;
  const status = document.getElementById("filterStatus").value;

  const res = await fetch(
    `/api/orders?search=${search}&status=${status}`
  );

  const data = await res.json();

  const table = document.getElementById("ordersTable");
  table.innerHTML = "";

  data.forEach(order => {
    table.innerHTML += `
      <tr>
        <td>${order.id}</td>
        <td>${order.name}</td>
        <td>${order.phone}</td>
        <td>${order.garment}</td>
        <td>${order.qty}</td>
        <td>₹${order.total}</td>
        <td>
          <span class="status ${order.status}">
            ${order.status}
          </span>
        </td>
        <td>
          <select onchange="updateStatus('${order.id}', this.value)">
            <option ${order.status==="RECEIVED"?"selected":""}>RECEIVED</option>
            <option ${order.status==="PROCESSING"?"selected":""}>PROCESSING</option>
            <option ${order.status==="READY"?"selected":""}>READY</option>
            <option ${order.status==="DELIVERED"?"selected":""}>DELIVERED</option>
          </select>
        </td>
      </tr>
    `;
  });
}

async function updateStatus(id, status) {
  await fetch("/api/orders/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  });

  loadOrders();
  loadDashboard();
}

loadDashboard();
loadOrders();async function loadDashboard() {
  const res = await fetch("/api/dashboard");
  const data = await res.json();

  document.getElementById("totalOrders").innerText = data.totalOrders;
  document.getElementById("revenue").innerText = "₹" + data.totalRevenue;
  document.getElementById("received").innerText = data.received;
  document.getElementById("processing").innerText = data.processing;
  document.getElementById("ready").innerText = data.ready;
  document.getElementById("delivered").innerText = data.delivered;
}

async function createOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const garment = document.getElementById("garment").value;
  const qty = document.getElementById("qty").value;

  if (!name || !phone || !qty) {
    showToast("Please fill all fields");
    return;
  }

  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      phone,
      garment,
      qty: Number(qty)
    })
  });

  const data = await res.json();

  showToast("Order Created: " + data.id);

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("qty").value = "";

  loadOrders();
  loadDashboard();
}

function showToast(msg){
  const div = document.createElement("div");
  div.innerText = msg;
  div.style.position="fixed";
  div.style.bottom="20px";
  div.style.right="20px";
  div.style.background="#111";
  div.style.color="#fff";
  div.style.padding="12px 20px";
  div.style.borderRadius="8px";
  document.body.appendChild(div);

  setTimeout(()=>div.remove(),3000);
}

async function loadOrders() {
  const search = document.getElementById("search").value;
  const status = document.getElementById("filterStatus").value;

  const res = await fetch(`/api/orders?search=${search}&status=${status}`);
  const data = await res.json();

  const table = document.getElementById("ordersTable");
  table.innerHTML = "";

  // ✅ Empty state
  if (data.length === 0) {
    table.innerHTML = `<tr><td colspan="9">No orders found</td></tr>`;
    return;
  }

  data.forEach(order => {
    table.innerHTML += `
      <tr>
        <td>${order.id}</td>
        <td>${order.name}</td>
        <td>${order.phone}</td>
        <td>${order.garment}</td>
        <td>${order.qty}</td>
        <td>₹${order.total}</td>
        <td><span class="status ${order.status}">${order.status}</span></td>
        <td>
          <select onchange="updateStatus('${order.id}', this.value)">
            <option ${order.status==="RECEIVED"?"selected":""}>RECEIVED</option>
            <option ${order.status==="PROCESSING"?"selected":""}>PROCESSING</option>
            <option ${order.status==="READY"?"selected":""}>READY</option>
            <option ${order.status==="DELIVERED"?"selected":""}>DELIVERED</option>
          </select>
        </td>
        <td>${order.deliveryDate}</td>
        <td>
          <button onclick="deleteOrder('${order.id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

async function updateStatus(id, status) {
  await fetch("/api/orders/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });

  loadOrders();
  loadDashboard();
}

async function deleteOrder(id){
  if(!confirm("Delete this order?")) return;

  await fetch("/api/orders/" + id, { method: "DELETE" });

  showToast("Order Deleted");

  loadOrders();
  loadDashboard();
}

loadDashboard();
loadOrders();