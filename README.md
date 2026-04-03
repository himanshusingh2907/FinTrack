# FinTrack

A backend API for managing financial records with role-based access control.

## Tech Stack

- Node.js
- Express
- MongoDB
- JWT
- Bcrypt
- Zod

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/himanshusingh2907/FinTrack
cd FinTrack/backend
```

### 2. Install dependencies
```bash
npm init -y
npm install express mongoose dotenv bcrypt jsonwebtoken zod cookie-parser express-rate-limit
```

### 3. Create .env file 
### 4. Run the server
```bash
node server.js
```

## Folder Structure 
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── dashboardController.js
│   ├── transactionController.js
│   └── userController.js
├── middlewares/
│   ├── auth.js
│   └── role.js
├── models/
│   ├── transactionSchema.js
│   └── userSchema.js
├── routes/
│   ├── authRoutes.js
│   ├── dashboardRoutes.js
│   ├── transactionRoutes.js
│   └── userRoute.js
├── utils/
│   ├── constants.js
│   ├── generateJwt.js
│   └── rateLimiter.js
├── validators/
│   ├── transactionValidator.js
│   └── userValidator.js
└── server.js  
## Roles

| Role | Permissions |
|---|---|
| viewer | Read transactions and dashboard |
| analyst | Read transactions + all dashboard analytics |
| admin | Full access including user management |

## API Endpoints

### Auth
| Method | Endpoint | Access |
|---|---|---|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |

### Users
| Method | Endpoint | Access |
|---|---|---|
| GET | /api/users/ | Admin |
| PATCH | /api/users/:id/role | Admin |
| PATCH | /api/users/:id/status | Admin |

### Transactions
| Method | Endpoint | Access |
|---|---|---|
| POST | /api/transactions | Admin |
| GET | /api/transactions | All roles |
| PATCH | /api/transactions/:id | Admin |
| DELETE | /api/transactions/:id | Admin |

### Dashboard
| Method | Endpoint | Access |
|---|---|---|
| GET | /api/dashboard/summary | Analyst + Admin |
| GET | /api/dashboard/category | Analyst + Admin |
| GET | /api/dashboard/recent | Analyst + Admin |
| GET | /api/dashboard/trends/monthly | Analyst + Admin |
| GET | /api/dashboard/trends/weekly | Analyst + Admin |
| GET | /api/dashboard/trends/daily | Analyst + Admin |

## Assumptions

- New users are assigned viewer role by default
- Only admin can change roles and activate or deactivate users
- Deleted transactions are soft deleted and not permanently removed
- Rate limiting is set to 50 requests per 15 minutes per IP
- JWT token is stored in httpOnly cookie and also returned in response
