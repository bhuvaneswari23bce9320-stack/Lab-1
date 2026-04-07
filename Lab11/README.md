# Lab Sheet 11 - Node.js Basics

## Exercises Overview

### Exercise 1 - RESTful API with Express
A REST API for managing **users** supporting full CRUD via HTTP methods.

**Endpoints:**
| Method | Route        | Description       |
|--------|--------------|-------------------|
| GET    | /users       | Get all users     |
| GET    | /users/:id   | Get user by ID    |
| POST   | /users       | Create new user   |
| PUT    | /users/:id   | Update user by ID |
| DELETE | /users/:id   | Delete user by ID |

**Run:**
```bash
cd Exercise1
npm install
npm start
```

---

### Exercise 2 - Middleware Demo
Demonstrates middleware chaining, logging, request counting, auth simulation, and route-level middleware.

**Endpoints:**
| Method | Route  | Description            |
|--------|--------|------------------------|
| GET    | /      | Public route           |
| GET    | /admin | Admin-only (needs header `role: admin`) |
| POST   | /data  | Accepts JSON body      |

**Run:**
```bash
cd Exercise2
npm install
npm start
```

---

### Exercise 3 - MongoDB CRUD with Mongoose
Full CRUD operations on a **products** collection in MongoDB.

**Endpoints:**
| Method | Route           | Description          |
|--------|-----------------|----------------------|
| POST   | /products       | Create product       |
| GET    | /products       | Get all products     |
| GET    | /products/:id   | Get product by ID    |
| PUT    | /products/:id   | Update product by ID |
| DELETE | /products/:id   | Delete product by ID |

**Requirements:** MongoDB must be running locally on port 27017.

**Run:**
```bash
cd Exercise3
npm install
npm start
```
