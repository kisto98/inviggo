
# Inviggo - Advertisement Platform

Inviggo is a full-stack web application that allows users to register, post, browse, and manage advertisements. The application is built with **React** (frontend), **Bootstrap** (UI), **Spring Boot** (backend), and **MySQL** (database).

---

## 📦 Tech Stack

- **Frontend:** React, React Router, Bootstrap
- **Backend:** Java Spring Boot, Spring Security, JWT
- **Database:** MySQL
- **Build Tool:** Maven

---

## 🖼️ Features

### Frontend (React)
- Responsive and modern UI with Bootstrap
- User registration and login
- Advertisement listing with:
  - Search
  - Category filtering
  - Price range filtering
  - My ads only toggle
- Pagination
- Advertisement creation, editing, and deletion
- Conditional controls based on user authentication

### Backend (Spring Boot)
- REST API for authentication and advertisements
- JWT-based authentication
- CORS configuration
- Secure endpoints with role-based access
- Password encryption using BCrypt
- CSRF disabled for APIs (RESTful design)

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16+)
- Java 17+
- MySQL
- Maven

---

### 1. Clone the Repository

```bash
git clone https://github.com/kisto98/inviggo
cd inviggo
```

---

### 2. Backend Setup

1. Configure your MySQL database in `application.properties`:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/inviggo_marketplace
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   ```
2. Run the backend server:

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   The backend will be available at: `http://localhost:8080`

---

### 3. Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   The frontend will be available at: `http://localhost:3000`

---
