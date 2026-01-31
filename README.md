# 🐾 VetAI Assistant - Veterinary AI-Powered Health Assistant

A full-stack web application that helps pet owners monitor their pets' health and get AI-powered diagnostic suggestions. The application enables users to register their animals, track health records, and receive intelligent symptom analysis using OpenAI's GPT models.

> ⚠️ **Disclaimer**: This application provides AI-generated suggestions and is **not a substitute for professional veterinary care**. Always consult a licensed veterinarian for medical advice.

## ✨ Features

### 🔐 User Authentication
- Secure user registration and login
- JWT-based authentication
- Protected routes for authenticated users

### 🐕 Animal Management
- Register and manage multiple pets
- Support for various species (dogs, cats, birds, rabbits, etc.)
- Track pet details including name, species, breed, age, weight, and gender

### 📋 Health Records
- Maintain comprehensive health history for each pet
- Log symptoms, conditions, and veterinary visits
- View all health records across all pets

### 🤖 AI-Powered Diagnosis
- Intelligent symptom analysis using OpenAI GPT models
- Get possible conditions based on reported symptoms
- Receive recommended actions and home care tips
- Urgency assessment and veterinarian visit recommendations
- Medication suggestions and warning signs to watch

### 📊 Dashboard
- Overview of all registered pets
- Quick access to health records
- Summary statistics and insights

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Hook Form** - Form handling and validation
- **React Hot Toast** - Toast notifications
- **date-fns** - Date formatting utilities
- **Vitest** - Unit testing framework
- **Testing Library** - React component testing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **OpenAI API** - AI-powered diagnostic analysis
- **express-validator** - Input validation
- **Jest** - Testing framework
- **Supertest** - HTTP assertions

## 📁 Project Structure

```
veterinary-ai-app/
├── frontend/                    # React.js application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Auth/           # Authentication components
│   │   │   ├── Dashboard/      # Dashboard components
│   │   │   ├── Animals/        # Animal management components
│   │   │   └── Health/         # Health tracking components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service functions
│   │   ├── context/            # React context providers
│   │   ├── layouts/            # Layout components
│   │   ├── App.jsx             # Main application component
│   │   └── main.jsx            # Application entry point
│   ├── public/                 # Static assets
│   └── package.json
│
├── backend/                     # Node.js/Express API
│   ├── src/
│   │   ├── models/             # Mongoose data models
│   │   │   ├── User.js         # User model
│   │   │   ├── Animal.js       # Animal model
│   │   │   └── HealthRecord.js # Health record model
│   │   ├── routes/             # API route definitions
│   │   │   ├── auth.js         # Authentication routes
│   │   │   ├── animals.js      # Animal CRUD routes
│   │   │   ├── health.js       # Health record routes
│   │   │   └── ai.js           # AI diagnosis routes
│   │   ├── controllers/        # Request handlers
│   │   ├── services/           # Business logic services
│   │   │   └── aiService.js    # OpenAI integration
│   │   ├── middleware/         # Express middleware
│   │   │   └── auth.js         # JWT authentication
│   │   ├── config/             # Configuration files
│   │   │   └── database.js     # MongoDB connection
│   │   └── server.js           # Express app entry point
│   ├── tests/                  # Backend tests
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **OpenAI API Key** (for AI diagnosis features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/zbidiamira/veterinary_assistant.git
   cd veterinary_assistant
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Configuration

#### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/vetai_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# OpenAI API Configuration
OPENAI_API_KEY=your-openai-api-key-here
OPENAI_MODEL=gpt-4o-mini
```

#### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=VetAI Assistant
```

### Running the Application

#### Development Mode

**Start the backend server:**
```bash
cd backend
npm run dev
```

**Start the frontend development server (in a new terminal):**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173 (Vite default)
- Backend API: http://localhost:5000/api

#### Production Mode

**Build the frontend:**
```bash
cd frontend
npm run build
```

**Start the backend in production:**
```bash
cd backend
npm start
```

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get current user profile |

### Animals
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/animals` | Get all animals for user |
| GET | `/api/animals/:id` | Get single animal |
| POST | `/api/animals` | Create new animal |
| PUT | `/api/animals/:id` | Update animal |
| DELETE | `/api/animals/:id` | Delete animal |

### Health Records
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health/animals/:animalId/records` | Get health records for an animal |
| GET | `/api/health/records` | Get all health records for user |
| POST | `/api/health/animals/:animalId/records` | Create health record |
| PUT | `/api/health/records/:id` | Update health record |
| DELETE | `/api/health/records/:id` | Delete health record |

### AI Diagnosis
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/analyze` | Analyze symptoms and get diagnosis |
| GET | `/api/ai/status` | Check AI service status |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | API health check |

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
```

### Frontend Tests
```bash
cd frontend
npm test                 # Run tests in watch mode
npm run test:run         # Run all tests once
npm run test:coverage    # Run tests with coverage report
```

## 🔧 Development

### Linting
```bash
cd frontend
npm run lint
```

### Build
```bash
cd frontend
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for providing the GPT API
- [MongoDB](https://www.mongodb.com/) for the database
- [React](https://reactjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling
- All contributors and supporters of this project

---

<p align="center">
  Made with ❤️ for pet owners everywhere
</p>
