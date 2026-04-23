# AutoService Pro - Vehicle Service Management System

A premium, full-stack vehicle service management platform designed for both customers and service center staff. The system features a modern React frontend with rich metrics visualization and a robust Django REST Framework backend.

## 🚀 Project Overview

- **Customer Portal**: Appointment booking, service history tracking, and vehicle management.
- **Staff Portal**: Operational dashboard, live inventory management, and appointment scheduling.
- **Revenue Analytics**: Real-time financial intelligence dashboard for management.
- **Branding**: Professional, high-contrast UI with a premium "Mechanical" aesthetic (Inter font, Orange/Navy/Slate palette).

---

## 🛠️ Tech Stack

- **Backend**: Django 6.0, Django REST Framework (DRF)
- **Frontend**: React, Vite, Recharts, Lucide Icons
- **Database**: SQLite (Development) / PostgreSQL compatible
- **Styling**: Vanilla CSS (No heavy frameworks for maximum performance)

---

## ⚙️ Setup & Installation

### Prerequisites
- Python 3.14+
- Node.js 18+
- npm or yarn

### 1. Backend Setup (Django)

Navigate to the backend directory:
```bash
cd auto-service/backend
```

Create and activate a virtual environment:
```bash
python3 -m venv env
source env/bin/python3/activate  # On Linux/macOS
# or
env\Scripts\activate            # On Windows
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Run Migrations:
```bash
python manage.py migrate
```

**Seed the Database (Prerequisite for Dashboard Data):**
This command populates the system with sample customers, staff, vehicles, and 30 days of revenue history.
```bash
python seed_db.py
```

Run the Server:
```bash
python manage.py runserver
```
The API will be available at `http://localhost:8000/`.

### 2. Frontend Setup (React)

Navigate to the frontend directory:
```bash
cd auto-service/frontend
```

Install dependencies:
```bash
npm install
```

Run the Dev Server:
```bash
npm run dev
```
The application will be available at (typically) `http://localhost:5173/` or `http://localhost:5174/`.

---

## 🔌 API Endpoints Documentation

### Authentication (`/users/auth/`)
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `register/` | POST | Register a new user (Customer or Staff). |
| `verify-otp/` | POST | Verify the 6-digit OTP sent to email. |
| `login/` | POST | Authenticate and receive user data. |
| `me/` | GET | Get current authenticated user profile. |

### Service Management (`/api/`)
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `vehicles/` | GET/POST | Manage customer vehicles. |
| `appointments/` | GET/POST | Book or list service appointments. |
| `inventory/` | GET | List live spare parts inventory and stock levels. |
| `repair-orders/` | GET/POST | Detailed job cards and prices for repairs. |
| `repair-orders/dashboard_stats/` | GET | Aggregated revenue, growth, and distribution data. |
| `bike-models/` | GET | Reference list of supported vehicle models. |

---

## 📈 Database Schema Highlights

- **CustomUser**: Extends Django's user with `user_type` (Staff/Customer), `mob_no`, and `user_id`.
- **Vehicle**: Linked to owners with specific identification numbers.
- **RepairOrder**: The core transaction model linked to revenue. Stores `labor_charge`, `total_price`, and `is_paid` status.
- **InventoryPart**: Tracks SKU levels, unit prices, and stock alerts.

## 🤝 Contribution

1. Ensure the backend virtual environment is active before running scripts.
2. Maintain the `Inter` font consistency in all New components.
3. Use the absolute API URLs (pointing to port 8000) in frontend fetch calls.

---
**AutoService Pro** - *Engineered for Excellence.*
