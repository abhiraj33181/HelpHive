# HelpHive India

HelpHive India is a full-stack local services platform for discovering and booking verified providers, browsing nearby shops, exploring rental properties, chatting with providers, paying for appointments, and getting product help from an AI assistant.

This repository contains:

- `client/`: React + Vite frontend
- `Server/`: Express + MongoDB backend

## Highlights

- User, provider, and admin flows in one project
- Provider discovery with search, category filters, rating filters, and location filtering
- Appointment booking and cancellation flow
- Razorpay payment integration
- Real-time chat with Socket.IO
- Nearby shops and nearby rental listings
- Review and rating system for providers
- HelpHive AI assistant powered by Groq
- Cookie-based authentication with separate user, provider, and admin sessions

## Tech Stack

### Frontend

- React 19
- Vite 7
- React Router DOM 7
- Tailwind CSS 4
- Axios
- React Toastify
- Socket.IO Client
- Lucide React

### Backend

- Node.js
- Express 5
- MongoDB + Mongoose
- JWT authentication
- Cookie Parser + CORS
- Multer
- Cloudinary
- Razorpay
- Socket.IO
- Groq SDK

## Project Structure

```text
HelpHive/
|-- client/
|   |-- public/
|   |-- src/
|   |   |-- assets/
|   |   |-- components/
|   |   |-- context/
|   |   |-- Pages/
|   |   |-- services/
|   |   |-- utils/
|   |   |-- App.jsx
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- index.html
|   |-- package.json
|   `-- vite.config.js
|-- Server/
|   |-- src/
|   |   |-- config/
|   |   |-- controllers/
|   |   |-- middlewares/
|   |   |-- models/
|   |   |-- routes/
|   |   `-- utils/
|   |-- index.js
|   `-- package.json
`-- Readme.md
```

## Main Application Areas

### Public Pages

- Home page
- Providers listing
- About page
- Contact page
- Nearby shops page
- Nearby properties page
- AI assistant page

### User Area

- Signup and login
- Profile management
- Appointment booking and cancellation
- Payment via Razorpay
- Chat with providers
- My appointments dashboard
- Provider reviews

### Provider Area

- Provider signup and login
- Dashboard and profile
- Appointment management
- Chat with users
- Shop CRUD
- Property CRUD

### Admin Area

- Admin login
- Dashboard metrics
- Provider onboarding
- Provider list management
- Appointment monitoring

## Frontend Routes

The main client route setup lives in `client/src/App.jsx`.

Core routes include:

- `/`
- `/about`
- `/contact`
- `/providers`
- `/providers/:service`
- `/appointment/:provId`
- `/auth/:authType`
- `/shops`
- `/property`
- `/ai`
- `/dashboard/*`
- `/provider/dashboard/*`
- `/admin/*`

## Backend API Overview

The backend server starts from `Server/index.js` and exposes the following route groups:

### Health

- `GET /api/health`

### Admin

- `POST /api/admin/login`
- `GET /api/admin/logout`
- `POST /api/admin/add-provider`
- `GET /api/admin/all-providers`
- `POST /api/admin/change-availablity`
- `GET /api/admin/appointments`
- `POST /api/admin/appointment-cancel`
- `GET /api/admin/dashboard`
- `GET /api/admin/profile`

### Provider

- `GET /api/provider/list`
- `GET /api/provider/logout`
- `POST /api/provider/login`
- `POST /api/provider/register`
- `GET /api/provider/appointments`
- `POST /api/provider/complete-appointment`
- `POST /api/provider/accept-appointment`
- `POST /api/provider/cancel-appointment`
- `GET /api/provider/dashboard`
- `GET /api/provider/profile`
- `POST /api/provider/update-profile`
- `POST /api/provider/chat`

### User

- `POST /api/user/register`
- `POST /api/user/login`
- `POST /api/user/logout`
- `GET /api/user/getProfile`
- `POST /api/user/updateProfile`
- `POST /api/user/bookAppointment`
- `GET /api/user/listAppointment`
- `POST /api/user/cancelAppointment`
- `POST /api/user/payment-razorpay`
- `POST /api/user/verify-razorpay`
- `POST /api/user/chat`

### Shops

- `POST /api/shop/add`
- `PUT /api/shop/update/:shopId`
- `DELETE /api/shop/delete/:shopId`
- `GET /api/shop/my-shops`
- `GET /api/shop/nearby`

### Properties

- `POST /api/property/add`
- `PUT /api/property/update/:propertyId`
- `DELETE /api/property/delete/:propertyId`
- `GET /api/property/my-properties`
- `GET /api/property/nearby`

### Chat

- `POST /api/chat/get`
- `POST /api/chat/get-provider`
- `POST /api/chat/delete-for-all`
- `POST /api/chat/mark-seen`

### AI

- `POST /api/ai/ask`

### Reviews

- `POST /api/reviews/add`
- `GET /api/reviews/provider/:providerId`
- `DELETE /api/reviews/delete/:reviewId`

## Environment Variables

Create separate env files for the client and server.

### Client `.env`

Create `client/.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_public_key
```

### Server `.env`

Create `Server/.env`:

```env
PORT=4000
NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password

CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
currency=INR

GROQ_API_KEY=your_groq_api_key

CLIENT_URL=http://localhost:5173
```

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd HelpHive
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../Server
npm install
```

## Run Locally

Open two terminals.

### Start backend

```bash
cd Server
npm start
```

For auto-reload development, the project defines `npm run dev`, but that script expects `nodemon`. If `nodemon` is not installed in your environment, either install it globally or add it as a dev dependency.

```bash
cd Server
npm run dev
```

### Start frontend

```bash
cd client
npm run dev
```

Frontend default URL:

```text
http://localhost:5173
```

Backend default URL:

```text
http://localhost:4000
```

## Available Scripts

### Client

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Server

```bash
npm start
npm run dev
```

## Authentication Notes

- User session cookie: `token`
- Provider session cookie: `pToken`
- Admin session cookie: `aToken`

The backend uses centralized cookie settings in `Server/src/utils/cookieOptions.js`.

- In development: cookies use `sameSite: 'lax'` and `secure: false`
- In production: cookies use `sameSite: 'none'` and `secure: true`

## AI Assistant Notes

The AI assistant is limited to HelpHive-related topics. It supports:

- booking help
- payment help
- cancellations
- provider-side guidance
- HelpHive product usage

It also stores short conversation memory using the `chatMemoryModel` collection.

## Geo Features

Nearby shops and nearby properties depend on browser geolocation.

- If the browser blocks location access, the UI shows an explicit error state
- Shop and property data use MongoDB geospatial queries
- Shop and property models define `2dsphere` indexes

## Chat and Realtime

- Chat APIs are provided through `/api/chat/*`
- Socket.IO is initialized on the backend in `Server/src/utils/socket.js`
- Client socket usage lives in `client/src/utils/socket.js`

## Build and Verification

Recommended checks:

### Client

```bash
cd client
npm run build
```

### Server syntax check

```bash
cd Server
node --check index.js
node --check src/controllers/adminController.js
node --check src/controllers/providerController.js
node --check src/controllers/userController.js
```

## Deployment Notes

- `client/vercel.json` and `Server/vercel.json` are present for deployment configuration
- Set all client and server environment variables in the hosting platform
- Ensure `CLIENT_URL` contains the deployed frontend origin
- Use production-ready MongoDB, Cloudinary, Razorpay, and Groq credentials

## Current Notes

- The frontend production build may show a chunk-size warning because the main bundle is large; this is a performance optimization task, not a build failure
- The server `npm run dev` script depends on `nodemon`
- The root README is the main project guide; `client/README.md` still contains the default Vite template text unless you want to replace that separately

## Recommended Next Improvements

- Add API documentation with request/response examples
- Add Postman or Bruno collection for backend testing
- Add automated tests for auth, booking, and CRUD flows
- Split the client bundle with dynamic imports for better performance

## Author

Abhishek Raj

