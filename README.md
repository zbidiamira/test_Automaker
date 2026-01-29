# 🏥 Veterinary AI Assistant

An AI-powered veterinary assistant web app using React.js for pet health management and diagnosis.

---

## 📋 Project Overview

This application allows pet owners to:
- Register and manage their accounts
- Add and track multiple animals
- Record health history and symptoms
- Get AI-powered diagnostic suggestions

---

## 🚀 Pull Request Breakdown

### **PR #1: Project Initialization & Setup**
**Branch:** `feature/project-setup`

**Description:**
Initial project scaffolding with frontend and backend setup.

**Tasks:**
- [ ] Initialize Git repository
- [ ] Create frontend with Vite + React.js
- [ ] Create backend with Node.js + Express
- [ ] Setup project folder structure
- [ ] Configure ESLint and Prettier
- [ ] Add `.gitignore` files
- [ ] Setup environment variables templates (`.env.example`)

**Files to Create:**
```
veterinary-ai-app/
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.example
│   └── src/
│       ├── main.jsx
│       └── App.jsx
├── backend/
│   ├── package.json
│   ├── .env.example
│   └── src/
│       └── server.js
└── README.md
```

**Dependencies:**
- Frontend: `react`, `react-dom`, `react-router-dom`, `axios`, `tailwindcss`
- Backend: `express`, `cors`, `dotenv`, `nodemon`

---

### **PR #2: Database Setup & Models**
**Branch:** `feature/database-models`

**Description:**
Setup MongoDB connection and create all database models.

**Tasks:**
- [ ] Configure MongoDB connection
- [ ] Create User model with validation
- [ ] Create Animal model with validation
- [ ] Create HealthRecord model with validation
- [ ] Add database connection error handling

**Files to Create:**
```
backend/src/
├── config/
│   └── database.js
└── models/
    ├── User.js
    ├── Animal.js
    └── HealthRecord.js
```

**User Model Schema:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| firstName | String | Yes | User's first name |
| lastName | String | Yes | User's last name |
| email | String | Yes | Unique email address |
| password | String | Yes | Hashed password |
| phone | String | No | Contact number |
| createdAt | Date | Auto | Account creation date |

**Animal Model Schema:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| owner | ObjectId | Yes | Reference to User |
| name | String | Yes | Animal's name |
| species | String | Yes | Dog, Cat, Bird, etc. |
| breed | String | No | Specific breed |
| age | Number | No | Age in years |
| weight | Number | No | Weight in kg |
| gender | String | No | Male/Female |
| image | String | No | Photo URL |
| createdAt | Date | Auto | Registration date |

**HealthRecord Model Schema:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| animal | ObjectId | Yes | Reference to Animal |
| symptoms | Array | Yes | List of symptoms |
| diagnosis | String | No | AI-generated diagnosis |
| medications | Array | No | Recommended medications |
| notes | String | No | Additional notes |
| severity | String | No | Low/Medium/High |
| createdAt | Date | Auto | Record date |

---

### **PR #3: Authentication Backend (API)**
**Branch:** `feature/auth-backend`

**Description:**
Implement user authentication API endpoints with JWT.

**Tasks:**
- [ ] Install authentication dependencies (`bcryptjs`, `jsonwebtoken`)
- [ ] Create auth middleware for protected routes
- [ ] Implement user registration endpoint
- [ ] Implement user login endpoint
- [ ] Implement get current user endpoint
- [ ] Implement password hashing
- [ ] Add input validation

**Files to Create:**
```
backend/src/
├── middleware/
│   └── auth.js
├── controllers/
│   └── authController.js
└── routes/
    └── auth.js
```

**API Endpoints:**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |

---

### **PR #4: Authentication Frontend (UI)**
**Branch:** `feature/auth-frontend`

**Description:**
Create login and registration UI components with form validation.

**Tasks:**
- [ ] Create AuthContext for state management
- [ ] Create Login component with form
- [ ] Create Register component with form
- [ ] Implement authService for API calls
- [ ] Add form validation with React Hook Form
- [ ] Setup protected routes
- [ ] Add toast notifications for feedback
- [ ] Style with Tailwind CSS

**Files to Create:**
```
frontend/src/
├── context/
│   └── AuthContext.jsx
├── services/
│   └── authService.js
├── components/
│   └── Auth/
│       ├── Login.jsx
│       └── Register.jsx
└── pages/
    ├── LoginPage.jsx
    └── RegisterPage.jsx
```

**Features:**
- Email validation
- Password strength indicator
- "Remember me" functionality
- Redirect after successful login
- Error message display

---

### **PR #5: Common UI Components & Layout**
**Branch:** `feature/common-components`

**Description:**
Create shared UI components and main application layout.

**Tasks:**
- [ ] Create Navbar component with navigation links
- [ ] Create Footer component
- [ ] Create Sidebar component for dashboard
- [ ] Create Loading spinner component
- [ ] Create Button component
- [ ] Create Card component
- [ ] Create Modal component
- [ ] Setup responsive design

**Files to Create:**
```
frontend/src/components/Common/
├── Navbar.jsx
├── Footer.jsx
├── Sidebar.jsx
├── Loading.jsx
├── Button.jsx
├── Card.jsx
└── Modal.jsx
```

**Navbar Features:**
- Logo and brand name
- Navigation links (Home, Dashboard, My Animals)
- User profile dropdown
- Login/Logout buttons
- Mobile hamburger menu

---

### **PR #6: Animal Management Backend (API)**
**Branch:** `feature/animals-backend`

**Description:**
Implement CRUD API endpoints for animal management.

**Tasks:**
- [ ] Create animal controller with all operations
- [ ] Create animal routes
- [ ] Implement get all animals for user
- [ ] Implement get single animal by ID
- [ ] Implement create new animal
- [ ] Implement update animal
- [ ] Implement delete animal
- [ ] Add image upload support (optional)

**Files to Create:**
```
backend/src/
├── controllers/
│   └── animalController.js
└── routes/
    └── animals.js
```

**API Endpoints:**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/animals` | Get all user's animals | Yes |
| GET | `/api/animals/:id` | Get single animal | Yes |
| POST | `/api/animals` | Create new animal | Yes |
| PUT | `/api/animals/:id` | Update animal | Yes |
| DELETE | `/api/animals/:id` | Delete animal | Yes |

---

### **PR #7: Animal Management Frontend (UI)**
**Branch:** `feature/animals-frontend`

**Description:**
Create animal management UI components.

**Tasks:**
- [ ] Create AnimalList component (grid/list view)
- [ ] Create AddAnimal form component
- [ ] Create AnimalDetail component
- [ ] Create EditAnimal component
- [ ] Implement animalService for API calls
- [ ] Add animal avatar/photo upload
- [ ] Create empty state for no animals
- [ ] Add search and filter functionality

**Files to Create:**
```
frontend/src/
├── services/
│   └── animalService.js
├── components/
│   └── Animals/
│       ├── AnimalList.jsx
│       ├── AnimalCard.jsx
│       ├── AddAnimal.jsx
│       ├── AnimalDetail.jsx
│       └── EditAnimal.jsx
└── pages/
    ├── AnimalsPage.jsx
    └── AnimalDetailPage.jsx
```

**Features:**
- Species icon display
- Age calculator
- Grid/List view toggle
- Confirmation modal for delete
- Quick edit functionality

---

### **PR #8: Customer Dashboard**
**Branch:** `feature/dashboard`

**Description:**
Create the main customer dashboard with overview statistics.

**Tasks:**
- [ ] Create CustomerDashboard component
- [ ] Create statistics cards (total animals, recent checkups)
- [ ] Create recent activity feed
- [ ] Create quick action buttons
- [ ] Add dashboard widgets
- [ ] Implement responsive layout

**Files to Create:**
```
frontend/src/
├── components/
│   └── Dashboard/
│       ├── CustomerDashboard.jsx
│       ├── StatCard.jsx
│       ├── RecentActivity.jsx
│       └── QuickActions.jsx
└── pages/
    └── DashboardPage.jsx
```

**Dashboard Widgets:**
- Total animals count
- Recent health records
- Upcoming checkups reminder
- Quick "Add Animal" button
- Quick "Check Symptoms" button

---

### **PR #9: Health Records Backend (API)**
**Branch:** `feature/health-backend`

**Description:**
Implement health records API endpoints.

**Tasks:**
- [ ] Create health controller
- [ ] Create health routes
- [ ] Implement get health history for animal
- [ ] Implement create health record
- [ ] Implement update health record
- [ ] Implement delete health record
- [ ] Add filtering by date range

**Files to Create:**
```
backend/src/
├── controllers/
│   └── healthController.js
└── routes/
    └── health.js
```

**API Endpoints:**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/health/animal/:animalId` | Get animal's health history | Yes |
| GET | `/api/health/:id` | Get single health record | Yes |
| POST | `/api/health` | Create health record | Yes |
| PUT | `/api/health/:id` | Update health record | Yes |
| DELETE | `/api/health/:id` | Delete health record | Yes |

---

### **PR #10: Health Records Frontend (UI)**
**Branch:** `feature/health-frontend`

**Description:**
Create health history and symptom tracking UI.

**Tasks:**
- [ ] Create HealthHistory component (timeline view)
- [ ] Create AddSymptom form component
- [ ] Create HealthRecordCard component
- [ ] Create HealthDetail component
- [ ] Implement healthService for API calls
- [ ] Add symptom autocomplete suggestions
- [ ] Create health summary charts

**Files to Create:**
```
frontend/src/
├── services/
│   └── healthService.js
├── components/
│   └── Health/
│       ├── HealthHistory.jsx
│       ├── HealthRecordCard.jsx
│       ├── AddSymptom.jsx
│       ├── HealthDetail.jsx
│       └── HealthChart.jsx
└── pages/
    └── HealthHistoryPage.jsx
```

**Features:**
- Timeline view of health records
- Severity color coding
- Filter by date/severity
- Export health report (PDF)

---

### **PR #11: AI Diagnostic System Backend**
**Branch:** `feature/ai-backend`

**Description:**
Integrate AI service for symptom analysis and diagnosis suggestions.

**Tasks:**
- [ ] Setup OpenAI API integration
- [ ] Create AI controller
- [ ] Create AI routes
- [ ] Implement symptom analysis endpoint
- [ ] Implement disease prediction logic
- [ ] Add medication recommendations
- [ ] Create care instructions generator
- [ ] Add rate limiting for API calls

**Files to Create:**
```
backend/src/
├── services/
│   └── aiService.js
├── controllers/
│   └── aiController.js
└── routes/
    └── ai.js
```

**API Endpoints:**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/ai/diagnose` | Analyze symptoms | Yes |
| POST | `/api/ai/recommendations` | Get care recommendations | Yes |

**AI Request Body:**
```json
{
  "animalId": "string",
  "species": "string",
  "symptoms": ["symptom1", "symptom2"],
  "duration": "string",
  "severity": "string"
}
```

---

### **PR #12: AI Diagnostic System Frontend**
**Branch:** `feature/ai-frontend`

**Description:**
Create AI diagnosis UI with symptom input and results display.

**Tasks:**
- [ ] Create DiagnosisResult component
- [ ] Create SymptomChecker wizard component
- [ ] Create symptom selection UI (checkboxes/tags)
- [ ] Implement aiService for API calls
- [ ] Add loading states during AI processing
- [ ] Create diagnosis report display
- [ ] Add "Save to Health Record" functionality
- [ ] Create disclaimer modal

**Files to Create:**
```
frontend/src/
├── services/
│   └── aiService.js
├── components/
│   └── Health/
│       ├── SymptomChecker.jsx
│       ├── SymptomSelector.jsx
│       ├── DiagnosisResult.jsx
│       └── DiagnosisReport.jsx
└── pages/
    └── DiagnosisPage.jsx
```

**Symptom Checker Flow:**
1. Select animal from list
2. Choose symptoms from categorized list
3. Add duration and severity
4. Submit for AI analysis
5. Display diagnosis results
6. Option to save to health record

---

### **PR #13: Testing & Quality Assurance**
**Branch:** `feature/testing`

**Description:**
Add unit tests and integration tests.

**Tasks:**
- [ ] Setup Jest for backend testing
- [ ] Setup React Testing Library for frontend
- [ ] Write auth API tests
- [ ] Write animal API tests
- [ ] Write health API tests
- [ ] Write component unit tests
- [ ] Add E2E tests with Cypress (optional)
- [ ] Setup CI/CD pipeline

**Files to Create:**
```
backend/
├── tests/
│   ├── auth.test.js
│   ├── animals.test.js
│   └── health.test.js
frontend/
├── src/
│   └── __tests__/
│       ├── Login.test.jsx
│       ├── AnimalList.test.jsx
│       └── Dashboard.test.jsx
└── cypress/ (optional)
```

---

### **PR #14: Final Polish & Deployment**
**Branch:** `feature/deployment`

**Description:**
Final UI polish, optimization, and deployment setup.

**Tasks:**
- [ ] Add loading skeletons
- [ ] Implement error boundaries
- [ ] Add 404 page
- [ ] Optimize images and assets
- [ ] Add SEO meta tags
- [ ] Setup Dockerfile for containerization
- [ ] Configure production environment
- [ ] Deploy backend to Railway/Render
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Setup domain and SSL

**Files to Create:**
```
├── Dockerfile
├── docker-compose.yml
├── .github/
│   └── workflows/
│       └── deploy.yml
└── nginx.conf (optional)
```

---

## 📁 Final Project Structure

```
veterinary-ai-app/
├── frontend/                    # React.js application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Dashboard/
│   │   │   │   ├── CustomerDashboard.jsx
│   │   │   │   ├── StatCard.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   ├── Animals/
│   │   │   │   ├── AnimalList.jsx
│   │   │   │   ├── AnimalCard.jsx
│   │   │   │   ├── AddAnimal.jsx
│   │   │   │   └── AnimalDetail.jsx
│   │   │   ├── Health/
│   │   │   │   ├── HealthHistory.jsx
│   │   │   │   ├── AddSymptom.jsx
│   │   │   │   ├── SymptomChecker.jsx
│   │   │   │   └── DiagnosisResult.jsx
│   │   │   └── Common/
│   │   │       ├── Navbar.jsx
│   │   │       ├── Footer.jsx
│   │   │       ├── Sidebar.jsx
│   │   │       └── Modal.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── AnimalsPage.jsx
│   │   │   ├── AnimalDetailPage.jsx
│   │   │   ├── HealthHistoryPage.jsx
│   │   │   └── DiagnosisPage.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── animalService.js
│   │   │   ├── healthService.js
│   │   │   └── aiService.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/                     # Node.js/Express API
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Animal.js
│   │   │   └── HealthRecord.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── animals.js
│   │   │   ├── health.js
│   │   │   └── ai.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── animalController.js
│   │   │   ├── healthController.js
│   │   │   └── aiController.js
│   │   ├── services/
│   │   │   └── aiService.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── config/
│   │   │   └── database.js
│   │   └── server.js
│   └── package.json
│
└── README.md
```

---

## 🔧 Technology Stack

| Category | Technology |
|----------|------------|
| Frontend Framework | React.js |
| Frontend Build Tool | Vite |
| Routing | React Router v6 |
| State Management | Context API |
| UI Library | Tailwind CSS |
| HTTP Client | Axios |
| Forms | React Hook Form |
| Backend Server | Node.js + Express |
| Database | MongoDB + Mongoose |
| Authentication | JWT (JSON Web Tokens) |
| Password Hashing | bcryptjs |
| AI Integration | OpenAI API |
| Testing | Jest, React Testing Library |

---

## 📅 Estimated Timeline

| PR | Description | Estimated Time |
|----|-------------|----------------|
| PR #1 | Project Setup | 1 day |
| PR #2 | Database & Models | 1 day |
| PR #3 | Auth Backend | 1 day |
| PR #4 | Auth Frontend | 2 days |
| PR #5 | Common Components | 2 days |
| PR #6 | Animals Backend | 1 day |
| PR #7 | Animals Frontend | 2 days |
| PR #8 | Dashboard | 1 day |
| PR #9 | Health Backend | 1 day |
| PR #10 | Health Frontend | 2 days |
| PR #11 | AI Backend | 2 days |
| PR #12 | AI Frontend | 2 days |
| PR #13 | Testing | 2 days |
| PR #14 | Deployment | 1 day |

**Total Estimated Time: ~3 weeks**

---

## 🏁 Getting Started

Once you're ready to start implementation, begin with **PR #1: Project Initialization & Setup**.
