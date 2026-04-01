# 🚀 Lead Management System
A Full-stack Lead Management System built using **Next.js, Node.js, Express, and MongoDB Atlas**.
This project demonstrates CRUD operations, filtering, sorting, and a basic dashboard for managing leads.

---

## 📁 Project Structure

```
root/
  ├── frontend/   → Next.js (App Router)
  ├── backend/    → Node.js + Express API
```

---

## 🧰 Tech Stack

* **Frontend:** Next.js (App Router), Axios, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (via Mongoose)

---

## ✨ Features

### 1. Lead Management (CRUD)

* Create a new lead with:

  * Company Name (required)
  * Contact Person (required)
  * Email (required, valid format)
  * Phone (optional)
  * Lead Source (Website, Referral, Conference, LinkedIn, Cold Outreach, Other)
  * Temperature (Hot, Warm, Cold)
  * Notes (optional)
  * Date Added (auto-generated)

* View all leads (card or table layout)

* Edit existing leads

* Delete leads with confirmation

---

### 2. Temperature System

Each lead is categorized:

* 🔴 **Hot** → Ready to buy, needs immediate attention
* 🟠 **Warm** → Interested, needs nurturing
* 🔵 **Cold** → Low interest or long-term prospect

---

### 3. Filtering & Sorting

* Filter by:

  * Temperature (All / Hot / Warm / Cold)
  * Lead Source

* Sort by:

  * Date (Newest / Oldest)
  * Company Name (A-Z / Z-A)

---

### 4. Dashboard / Summary

Displays key metrics:

* Total Leads
* Hot Leads count
* Warm Leads count
* Cold Leads count

---

## 🔌 Backend API

### Base URL

```
/api/leads
```

### Endpoints

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| GET    | /api/leads       | Get all leads (with filters) |
| GET    | /api/leads/stats | Get lead statistics          |
| GET    | /api/leads/:id   | Get single lead              |
| POST   | /api/leads       | Create new lead              |
| PUT    | /api/leads/:id   | Update lead                  |
| DELETE | /api/leads/:id   | Delete lead                  |

---

## 📦 Data Model (Example)

```
{
  companyName: "TechCorp Inc",
  contactPerson: "John Smith",
  email: "john@techcorp.com",
  phone: "+1-555-0123",
  source: "LinkedIn",
  temperature: "hot",
  notes: "Interested in demo",
  dateAdded: "2024-01-15T10:30:00Z"
}
```

---

## ✅ Validation Rules

* Company Name: Required (2–100 characters)
* Contact Person: Required (2–100 characters)
* Email: Required (valid format)
* Temperature: Must be `hot`, `warm`, or `cold`

---

## 🎨 Frontend Requirements

* Clean and minimal UI
* Responsive design (desktop/tablet)
* Visual indicators for temperature
* Form validation with error messages
* Loading states during API calls
* Success/Error notifications

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone <repo-url>
```

---

### 2. Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection
PORT=5000
```

Run backend:

```
npm run dev
```

---

### 3. Frontend Setup

```
cd frontend
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Run frontend:

```
npm run dev
```

---

## 🧪 Notes

* Uses static structure for UI (no external images or URLs)
* Focused on functionality over design complexity
* Built as a practical task/demo project

---

## 📌 Future Improvements

* Authentication (JWT)
* Pagination
* Advanced filtering
* Role-based access
* Deployment (Vercel + Render)

---

## 👨‍💻 Author

Developed as a technical assignment using MERN stack with Next.js frontend.