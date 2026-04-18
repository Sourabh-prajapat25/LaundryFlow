# 🚀 LaundryFlow – Mini Laundry Order Management System

A lightweight and user-friendly laundry order management system built as part of a Software Engineering assignment. The system helps a dry cleaning store manage orders, track status, and view basic analytics through a clean dashboard interface.

---

## 🌐 Project Links

- 🔗 GitHub Repository: https://github.com/Sourabh-prajapat25/LaundryFlow


---

## 📌 Features

### Core Features
- ✅ Create orders with customer details
- ✅ Automatic bill calculation based on garment type
- ✅ Unique Order ID generation
- ✅ Update order status:
  - RECEIVED → PROCESSING → READY → DELIVERED
- ✅ View all orders in a table
- ✅ Filter orders by status
- ✅ Search by customer name or phone
- ✅ Dashboard with:
  - Total Orders
  - Total Revenue
  - Orders per status

---

### 🚀 Additional Features (Added to go beyond requirements)
- 📅 Estimated Delivery Date (auto-calculated)
- 🗑️ Delete Order with confirmation
- 🔔 Toast notifications for actions
- 📭 Empty state handling (no orders case)
- 💎 Clean modern UI (responsive + dashboard layout)

---

## 🛠 Tech Stack

| Layer      | Technology |
|-----------|-----------|
| Frontend  | HTML, CSS, JavaScript |
| Backend   | Node.js, Express.js |
| Storage   | In-memory (array-based) |

---

## ⚙️ How to Run Locally

```bash
npm install
npm start
```

Open in browser:
```bash
http://localhost:3000
```

---

## 🧠 System Design Overview

This project is a lightweight order management system designed for speed and simplicity.

### 📦 Data Structure

Orders are stored in an in-memory array, where each order includes:

- ID
- Customer Name
- Phone Number
- Garment Type
- Quantity
- Total Cost
- Status (workflow-based)
- Delivery Date
  
### 🔧 Backend

The backend provides RESTful APIs for:

- Create orders
- Read orders
- Update order details & status
- Delete orders

  
### 🌐 Frontend
- Communicates with backend via Fetch API
- Dynamically updates UI based on state
- Provides filtering, dashboard stats, and interactive controls
  
---

## 🤖 AI Usage Report (Important)
### Tools Used
- ChatGPT (primary development assistant)
### How AI Was Used
- Generated initial backend API structure (Express routes)
- Helped design frontend layout and UI components
- Assisted in implementing filtering, dashboard, and state updates
- Used for debugging and improving code quality
- Suggested UX improvements (toasts, empty states, UI polish)
### Sample Prompts
- "Build a Node.js Express API for order management system"
- "Create a dashboard UI using HTML CSS JS"
- "Add filtering and search functionality in frontend"
- "Implement status update and dashboard stats logic"
### Where AI Was Incorrect / Limited
- Delivery date logic was initially placed incorrectly
- Missing delete functionality in first iteration
- Table column mismatch in UI
### Improvements Made Manually
- Fixed delivery date logic inside order creation
- Implemented delete API and frontend integration
- Improved UI consistency and responsiveness
- Added empty state handling
- Refactored code for better readability
### ⚖️ Tradeoffs
- Used in-memory storage instead of database for faster development
- Skipped authentication to focus on core functionality
- No persistent storage (data resets on server restart)

  
---

## 🚀 Future Improvements
- Database integration (MongoDB / PostgreSQL)
- User authentication (admin login)
- Invoice generation (PDF)
- SMS / Email notifications
- Deployment optimization

  ---

  
## 🎯 Conclusion

This project demonstrates:

- Fast execution under time constraints
- Practical problem-solving
- Effective use of AI tools
- Clean and functional UI/UX

The focus was to build a working system quickly while maintaining clarity, usability, and scalability for future improvements.
