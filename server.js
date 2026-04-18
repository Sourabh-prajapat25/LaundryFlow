const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let orders = [];
let count = 1;

const prices = {
  Shirt: 40,
  Pants: 60,
  Saree: 100,
  Jacket: 120
};

app.post("/api/orders", (req, res) => {
  const { name, phone, garment, qty } = req.body;

  if (!name || !phone || !garment || !qty) {
    return res.status(400).json({ error: "All fields required" });
  }

  const total = prices[garment] * qty;

  // ✅ Delivery date (FIXED — correct place)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);

  const order = {
    id: `ORD${String(count).padStart(3, "0")}`,
    name,
    phone,
    garment,
    qty,
    total,
    status: "RECEIVED",
    deliveryDate: deliveryDate.toDateString()
  };

  count++;
  orders.push(order);

  res.json(order);
});

app.get("/api/orders", (req, res) => {
  const { search, status } = req.query;

  let result = [...orders];

  if (search) {
    result = result.filter(
      o =>
        o.name.toLowerCase().includes(search.toLowerCase()) ||
        o.phone.includes(search)
    );
  }

  if (status && status !== "ALL") {
    result = result.filter(o => o.status === status);
  }

  res.json(result);
});

app.put("/api/orders/:id", (req, res) => {
  const order = orders.find(o => o.id === req.params.id);

  if (!order) return res.status(404).json({ error: "Order not found" });

  order.status = req.body.status;
  res.json(order);
});

// ✅ DELETE FEATURE
app.delete("/api/orders/:id", (req, res) => {
  orders = orders.filter(o => o.id !== req.params.id);
  res.json({ success: true });
});

app.get("/api/dashboard", (req, res) => {
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  res.json({
    totalOrders: orders.length,
    totalRevenue: revenue,
    received: orders.filter(o => o.status === "RECEIVED").length,
    processing: orders.filter(o => o.status === "PROCESSING").length,
    ready: orders.filter(o => o.status === "READY").length,
    delivered: orders.filter(o => o.status === "DELIVERED").length
  });
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);