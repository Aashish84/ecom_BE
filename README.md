# E-Commerce Backend API - Project Template

A scalable backend API template built with **Node.js, Express.js, and Prisma ORM**. This project provides a structured foundation for building REST APIs with authentication, validation, error handling, and database management. Beginners can use this as a reference to understand modern backend architecture and add their own features.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Project Structure & Architecture](#project-structure--architecture)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [How It Works](#how-it-works)
- [Adding New Features](#adding-new-features)
- [Common Commands](#common-commands)
- [Learning Path](#learning-path)

## 🎯 Project Overview

This is a **project template and learning resource** for building production-ready REST APIs. It demonstrates:
- Organized file structure with separation of concerns
- Request/response handling with middleware
- Database operations with Prisma ORM
- Input validation using schemas
- Error handling patterns
- Authentication and authorization basics

**Perfect for**: Developers learning backend development with Node.js and Express.js

## 🛠 Technology Stack

| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web framework for HTTP server |
| **Prisma** | ORM (Object-Relational Mapping) for database queries |
| **MariaDB/MySQL/Postgres** | Relational database |
| **JWT** | Token-based authentication |
| **Bcryptjs** | Password encryption/hashing |
| **Zod** | Schema validation and type checking |
| **Dotenv** | Environment variable management |
| **Nodemon** | Auto-reload during development |

## 📁 Project Structure & Architecture

```
ecom-BE/
├── src/
│   ├── app.js                     # Express app setup & middleware
│   ├── server.js                  # Server entry point
│   │
│   ├── controllers/               # Request handlers
│   │   ├── auth.controller.js     # Example: Auth logic
│   │   └── product.controller.js  # Example: Product logic
│   │
│   ├── services/                  # Business logic & DB queries
│   │   ├── auth.service.js        # Example: Auth service
│   │   ├── product.service.js     # Example: Product service
│   │   └── prisma.js              # Prisma client instance
│   │
│   ├── routes/                    # API endpoint definitions
│   │   ├── auth.routes.js         # Example: Auth routes
│   │   ├── product.routes.js      # Example: Product routes
│   │   └── test.routes.js         # Example: Test route
│   │
│   ├── middlewares/               # Request interceptors
│   │   ├── auth.middleware.js     # JWT verification
│   │   ├── validate.js            # Schema validation (Zod)
│   │   └── error.handler.js       # Global error handling
│   │
│   ├── validations/               # Validation schemas
│   │   ├── auth.validations.js    # Example: Auth schemas
│   │   └── product.validations.js # Example: Product schemas
│   │
│   └── utils/                     # Helper utilities
│       ├── ApiError.js            # Custom error class
│       └── jwt.js                 # JWT helper functions
│
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── migrations/                # Database version history
│
├── package.json                   # Dependencies & scripts
├── .env                           # Environment variables (create this)
└── README.md                      # This file
```

## 🔍 Architecture Explained

### **1. Request Flow**

```
HTTP Request
    ↓
Express App (app.js)
    ↓
Middleware (auth, validate, error handler)
    ↓
Route Handler (routes/*)
    ↓
Controller (controllers/*)
    ↓
Service Layer (services/*)
    ↓
Prisma ORM → Database
    ↓
Response → Client
```

### **2. Layer Responsibilities**

| Layer | Responsibility | Example |
|-------|-----------------|---------|
| **Routes** | Map HTTP paths to controllers | `router.post("/", controller.create)` |
| **Controllers** | Handle HTTP requests/responses | Extract data from request, call service |
| **Services** | Business logic & DB operations | Validation, data processing, Prisma queries |
| **Middlewares** | Process requests before handlers | Auth verification, input validation, error catching |
| **Validations** | Define data schemas | Email format, required fields |

### **3. Middleware Execution Order**

```javascript
app.use(express.json())           // Parse JSON body
  ↓
app.use(authMiddleware)           // Verify JWT token
  ↓
app.use(validate(schema))         // Validate request data
  ↓
route.handler()                   // Main logic
  ↓
errorHandler(err, req, res, next) // Catch errors
```

## 📋 Prerequisites

- **Node.js** v14+ ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **MariaDB/MySQL** database
  - Local install: [MariaDB](https://mariadb.org/download/)
  - Docker: `docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql`
- **Git** for version control
- **Code Editor** (VS Code recommended)

## 💾 Installation & Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd ecom-BE
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
```bash
# Create .env file in project root
touch .env
```

### 4. Configure `.env`
```env
# Database
DATABASE_URL="mysql://root:password@localhost:3306/ecom_db"

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your_random_secret_key_change_in_production
JWT_EXPIRY=7d
```

**Replace values**: `root`, `password`, `localhost` with your database credentials

### 5. Create Database
```bash
mysql -u root -p -e "CREATE DATABASE ecom_db;"
```

### 6. Run Migrations
```bash
# This creates tables in database based on schema.prisma
npx prisma migrate dev --name init
```

### 7. Start Server
```bash
npm run dev
```

Server should run on `http://localhost:3000`

## 🚀 How It Works

### Adding a Simple Route (Step-by-Step)

Let's say you want to add a `GET /api/users` endpoint.

#### Step 1: Define Database Schema
Edit `prisma/schema.prisma`:
```prisma
model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}
```

#### Step 2: Create Migration
```bash
npx prisma migrate dev --name add_users_table
```

This creates the `users` table in database.

#### Step 3: Create Service (Business Logic)
Create `src/services/user.service.js`:
```javascript
const { prisma } = require("./prisma");

class UserService {
  async getAll() {
    return prisma.user.findMany();
  }
  
  async getById(id) {
    return prisma.user.findUniqueOrThrow({ where: { id } });
  }
  
  async create(data) {
    return prisma.user.create({ data });
  }
}

module.exports = new UserService();
```

#### Step 4: Create Controller (Request Handler)
Create `src/controllers/user.controller.js`:
```javascript
const userService = require("../services/user.service");

class UserController {
  async getAll(req, res, next) {
    try {
      const users = await userService.getAll();
      res.json({ data: users });
    } catch (error) {
      next(error); // Pass to error handler middleware
    }
  }
  
  async getById(req, res, next) {
    try {
      const user = await userService.getById(parseInt(req.params.id));
      res.json({ data: user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
```

#### Step 5: Create Routes
Create `src/routes/user.routes.js`:
```javascript
const router = require("express").Router();
const controller = require("../controllers/user.controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);

module.exports = router;
```

#### Step 6: Register Routes in App
Edit `src/app.js`:
```javascript
const userRoutes = require("./routes/user.routes");
app.use("/api/users", userRoutes);
```

**Done!** Now you have `GET /api/users` working.

## ✅ Adding New Features

### Pattern: Adding Authentication to Routes

```javascript
// routes/product.routes.js
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, validate(productSchema), controller.create);
```

### Pattern: Adding Validation

```javascript
// validations/product.validations.js
const { z } = require("zod");

const productSchema = z.object({
  name: z.string().min(3, "Name too short"),
  price: z.number().positive("Price must be positive"),
});

module.exports = { productSchema };
```

### Pattern: Error Handling

```javascript
// services/product.service.js
const { ApiError } = require("../utils/ApiError");

async create(data) {
  const existing = await prisma.product.findFirst({
    where: { name: data.name }
  });
  
  if (existing) {
    throw new ApiError(409, "Product already exists");
  }
  
  return prisma.product.create({ data });
}
```

### Pattern: Adding Database Operations

```javascript
// services/order.service.js - Common queries

// CREATE
const order = await prisma.order.create({
  data: { userId: 1, total: 100 }
});

// READ
const order = await prisma.order.findUnique({
  where: { id: 1 }
});

// UPDATE
const updated = await prisma.order.update({
  where: { id: 1 },
  data: { status: "shipped" }
});

// DELETE
await prisma.order.delete({
  where: { id: 1 }
});

// LIST WITH FILTERS
const orders = await prisma.order.findMany({
  where: { userId: 1 },
  orderBy: { createdAt: "desc" }
});
```

## 📚 Common Commands

```bash
# Development
npm run dev                        # Start with auto-reload

# Database
npx prisma migrate dev --name name # Create & run migration
npx prisma studio                  # GUI database viewer
npx prisma generate               # Regenerate Prisma client

# Testing
curl http://localhost:3000/api/test
```

## 🎓 Learning Path

### Phase 1: Understand the Structure
1. ✅ Read this README completely
2. 📂 Explore each directory and understand file purposes
3. 📖 Read the example files (auth, product) to see patterns

### Phase 2: Learn the Layers
1. 🔗 Trace a request through: Route → Controller → Service
2. 📋 Understand how middleware intercepts requests
3. 🛡️ See how validation prevents bad data

### Phase 3: Add Your Own Feature
1. ✏️ Add a new database model in `schema.prisma`
2. 🗄️ Run migrations to create tables
3. 📝 Create service with CRUD operations
4. 🎮 Create controller to handle HTTP requests
5. 🛣️ Create routes and register them in app
6. ✔️ Test your endpoint with curl or Postman

### Phase 4: Advanced Topics
- Relationships between models (one-to-many, many-to-many)
- Pagination and filtering
- File uploads
- Background jobs
- Caching strategies
- API documentation (Swagger/OpenAPI)

## 🔐 Security Best Practices

```javascript
// Environment variables - NEVER hardcode secrets
const secret = process.env.JWT_SECRET;

// Input validation - validate everything
const schema = z.object({ email: z.string().email() });

// Password hashing - never store plain passwords
const hashed = await bcryptjs.hash(password, 10);

// Error messages - don't expose internal details
throw new ApiError(400, "Invalid credentials"); // Generic
// NOT: throw new ApiError(400, "Email not found in database");
```

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| `Database connection refused` | Check MariaDB is running, verify DATABASE_URL |
| `EADDRINUSE: port already in use` | Change PORT in `.env` |
| `Cannot find module @prisma/client` | Run `npm install` and `npx prisma generate` |
| `Unexpected end of JSON input` | Check `.env` format and `.env` isn't in `.gitignore` |

## 📖 External Resources

- **Express.js**: https://expressjs.com/
- **Prisma ORM**: https://www.prisma.io/docs/
- **JWT Tokens**: https://jwt.io/
- **Zod Validation**: https://zod.dev/
- **REST API Best Practices**: https://restfulapi.net/

## 📝 Project Checklist

Use this when adding new features:

- [ ] Added database model in `schema.prisma`
- [ ] Ran `npx prisma migrate dev --name description`
- [ ] Created service with CRUD methods
- [ ] Created controller with request handlers
- [ ] Created validation schema (if accepting input)
- [ ] Created routes file
- [ ] Registered routes in `app.js`
- [ ] Added error handling
- [ ] Tested with curl/Postman

## 🤝 Contributing to This Project

When adding new features, follow these conventions:

1. **Naming**: Use camelCase for files, PascalCase for classes
2. **Services**: One service per entity (UserService, ProductService)
3. **Validation**: Put schemas in validations/ folder
4. **Errors**: Use ApiError with proper HTTP status codes
5. **Comments**: Explain "why", not "what" the code does

## 📞 Getting Help

1. Check the **Common Issues** section above
2. Review similar code in existing examples
3. Read external documentation for specific libraries
4. Debug using `console.log()` or VS Code debugger

---

**Happy Building! 🚀**

This template is meant to be extended. Start simple, understand each layer, then add your own features following the established patterns.
