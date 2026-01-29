# 🤖 Veterinary AI Assistant - Implementation Agent

This document serves as your AI implementation agent guide. Use these prompts with GitHub Copilot or any AI assistant to implement each PR systematically.

---

## 📋 How to Use This Agent

1. **Copy the prompt** for the PR you want to implement
2. **Paste it to your AI assistant** (GitHub Copilot Chat, Claude, etc.)
3. **Follow the generated code** and create the files
4. **Test each PR** before moving to the next
5. **Commit your changes** with the suggested commit message

---

## 🚀 PR Implementation Prompts

---

### **PR #1: Project Initialization & Setup**

#### Prompt to Use:
```
I'm building a Veterinary AI Assistant web app. Please help me set up the initial project structure.

Create the following:

1. FRONTEND (React + Vite + Tailwind):
   - Initialize a Vite React project in a folder called "frontend"
   - Install dependencies: react-router-dom, axios, react-hook-form, react-hot-toast
   - Configure Tailwind CSS
   - Create basic App.jsx with React Router setup
   - Create .env.example with VITE_API_URL=http://localhost:5000/api

2. BACKEND (Node.js + Express):
   - Initialize a Node.js project in a folder called "backend"
   - Install dependencies: express, cors, dotenv, mongoose, bcryptjs, jsonwebtoken
   - Install dev dependencies: nodemon
   - Create basic server.js with Express setup, CORS, and JSON middleware
   - Create .env.example with PORT, MONGODB_URI, JWT_SECRET
   - Add start scripts in package.json

3. Create proper .gitignore files for both frontend and backend

Please provide the complete file contents for each file.
```

#### Git Commands After Implementation:
```bash
git checkout -b feature/project-setup
git add .
git commit -m "feat: initial project setup with React frontend and Express backend"
git push origin feature/project-setup
```

---

### **PR #2: Database Setup & Models**

#### Prompt to Use:
```
I'm building a Veterinary AI Assistant. Create the MongoDB database configuration and Mongoose models.

Create these files in the backend/src folder:

1. config/database.js:
   - MongoDB connection using mongoose
   - Connection error handling
   - Console log on successful connection

2. models/User.js:
   - Fields: firstName, lastName, email (unique), password, phone, createdAt
   - Email validation
   - Pre-save hook for password hashing using bcryptjs
   - Method to compare passwords

3. models/Animal.js:
   - Fields: owner (ref to User), name, species (enum: Dog, Cat, Bird, Rabbit, Hamster, Fish, Reptile, Other), breed, age, weight, gender (enum: Male, Female), image, createdAt
   - Virtual for calculating age in human years

4. models/HealthRecord.js:
   - Fields: animal (ref to Animal), symptoms (array of strings), diagnosis, medications (array of objects with name, dosage, frequency), notes, severity (enum: Low, Medium, High, Critical), createdAt
   - Index on animal and createdAt for efficient queries

Include proper validation, required fields, and timestamps.
```

#### Git Commands:
```bash
git checkout -b feature/database-models
git add .
git commit -m "feat: add MongoDB configuration and Mongoose models"
git push origin feature/database-models
```

---

### **PR #3: Authentication Backend (API)**

#### Prompt to Use:
```
I'm building a Veterinary AI Assistant. Create the authentication API for the backend.

Create these files in backend/src:

1. middleware/auth.js:
   - JWT verification middleware
   - Extract token from Authorization header (Bearer token)
   - Attach user to request object
   - Handle invalid/expired token errors

2. controllers/authController.js:
   - register: Create new user, return JWT token
   - login: Validate credentials, return JWT token
   - getMe: Return current user data (without password)
   - Generate JWT with user id, expires in 30 days

3. routes/auth.js:
   - POST /register - public
   - POST /login - public
   - GET /me - protected (use auth middleware)

4. Update server.js:
   - Import database connection
   - Import and use auth routes at /api/auth

Include proper error handling, input validation, and HTTP status codes.
```

#### Git Commands:
```bash
git checkout -b feature/auth-backend
git add .
git commit -m "feat: implement JWT authentication API"
git push origin feature/auth-backend
```

---

### **PR #4: Authentication Frontend (UI)**

#### Prompt to Use:
```
I'm building a Veterinary AI Assistant with React. Create the authentication frontend.

Create these files in frontend/src:

1. context/AuthContext.jsx:
   - AuthProvider component
   - State: user, token, loading, error
   - Functions: login, register, logout
   - Persist token in localStorage
   - Auto-login on app load if token exists
   - useAuth custom hook

2. services/authService.js:
   - API calls using axios
   - Functions: registerUser, loginUser, getCurrentUser
   - Base URL from environment variable
   - Include auth token in headers

3. components/Auth/Login.jsx:
   - Form with email and password
   - Use react-hook-form for validation
   - Show loading state
   - Display error messages
   - Redirect to dashboard on success
   - Link to register page

4. components/Auth/Register.jsx:
   - Form with firstName, lastName, email, password, confirmPassword
   - Password match validation
   - Use react-hook-form
   - Redirect to dashboard on success
   - Link to login page

5. pages/LoginPage.jsx and pages/RegisterPage.jsx:
   - Wrapper pages for the components
   - Centered layout with card design

6. components/ProtectedRoute.jsx:
   - Redirect to login if not authenticated
   - Show loading while checking auth

Style everything with Tailwind CSS using a clean, modern veterinary theme (greens, blues).
```

#### Git Commands:
```bash
git checkout -b feature/auth-frontend
git add .
git commit -m "feat: implement authentication UI with login and register"
git push origin feature/auth-frontend
```

---

### **PR #5: Common UI Components & Layout**

#### Prompt to Use:
```
I'm building a Veterinary AI Assistant with React and Tailwind. Create the common UI components.

Create these files in frontend/src/components/Common:

1. Navbar.jsx:
   - Logo with paw icon and "VetAI Assistant" text
   - Navigation links: Home, Dashboard, My Animals, Diagnosis
   - User dropdown with profile and logout
   - Show Login/Register buttons if not authenticated
   - Mobile responsive hamburger menu
   - Sticky top position

2. Footer.jsx:
   - Copyright text
   - Quick links
   - Social media icons
   - Contact information

3. Sidebar.jsx:
   - Dashboard sidebar navigation
   - Links: Overview, My Animals, Health Records, AI Diagnosis, Profile
   - Active link highlighting
   - Collapsible on mobile

4. Loading.jsx:
   - Spinning loader component
   - Customizable size and color
   - Optional loading text

5. Button.jsx:
   - Reusable button component
   - Variants: primary, secondary, danger, outline
   - Sizes: sm, md, lg
   - Loading state with spinner
   - Disabled state

6. Card.jsx:
   - Reusable card container
   - Props: title, children, footer, className

7. Modal.jsx:
   - Reusable modal component
   - Props: isOpen, onClose, title, children
   - Close on backdrop click
   - Close on Escape key
   - Animation on open/close

8. Create a layouts/DashboardLayout.jsx:
   - Include Navbar
   - Include Sidebar
   - Main content area
   - Footer

Use a veterinary color scheme: primary green (#10B981), secondary blue (#3B82F6).
```

#### Git Commands:
```bash
git checkout -b feature/common-components
git add .
git commit -m "feat: add common UI components and dashboard layout"
git push origin feature/common-components
```

---

### **PR #6: Animal Management Backend (API)**

#### Prompt to Use:
```
I'm building a Veterinary AI Assistant. Create the animal management API.

Create these files in backend/src:

1. controllers/animalController.js:
   - getAnimals: Get all animals for logged-in user, populate owner name
   - getAnimal: Get single animal by ID, verify ownership
   - createAnimal: Create new animal, set owner to current user
   - updateAnimal: Update animal, verify ownership first
   - deleteAnimal: Delete animal, verify ownership, also delete related health records

2. routes/animals.js:
   - GET / - get all user's animals
   - GET /:id - get single animal
   - POST / - create animal
   - PUT /:id - update animal
   - DELETE /:id - delete animal
   - All routes protected with auth middleware

3. Update server.js:
   - Import and use animal routes at /api/animals

Include:
- Proper error handling (404 for not found, 403 for unauthorized)
- Input validation
- Pagination support for getAnimals (page, limit query params)
- Search by name functionality
```

#### Git Commands:
```bash
git checkout -b feature/animals-backend
git add .
git commit -m "feat: implement animal CRUD API endpoints"
git push origin feature/animals-backend
```

---

### **PR #7: Animal Management Frontend (UI)**

#### Prompt to Use:
```
I'm building a Veterinary AI Assistant with React. Create the animal management frontend.

Create these files in frontend/src:

1. services/animalService.js:
   - API calls: getAnimals, getAnimal, createAnimal, updateAnimal, deleteAnimal
   - Include auth token in headers

2. components/Animals/AnimalList.jsx:
   - Display animals in a responsive grid
   - Toggle between grid and list view
   - Search bar to filter by name
   - "Add New Animal" button
   - Empty state with illustration when no animals

3. components/Animals/AnimalCard.jsx:
   - Display animal image (or default avatar based on species)
   - Show name, species, breed, age
   - Quick action buttons: View, Edit, Delete
   - Species-specific icons (dog, cat, bird, etc.)

4. components/Animals/AddAnimal.jsx:
   - Form modal to add new animal
   - Fields: name, species (dropdown), breed, age, weight, gender
   - Image upload (optional, can use URL for now)
   - Form validation with react-hook-form
   - Success toast notification

5. components/Animals/AnimalDetail.jsx:
   - Full animal profile view
   - Display all animal information
   - Edit and Delete buttons
   - Link to view health records
   - "Check Symptoms" button to AI diagnosis

6. components/Animals/EditAnimal.jsx:
   - Pre-filled form with current animal data
   - Same fields as AddAnimal
   - Update functionality

7. pages/AnimalsPage.jsx:
   - Container page using DashboardLayout
   - Include AnimalList component
   - Handle add animal modal

8. pages/AnimalDetailPage.jsx:
   - Route: /animals/:id
   - Display AnimalDetail component
   - Fetch animal data on mount

Add species icons/emojis: 🐕 Dog, 🐈 Cat, 🐦 Bird, 🐰 Rabbit, 🐹 Hamster, 🐠 Fish, 🦎 Reptile
```

#### Git Commands:
```bash
git checkout -b feature/animals-frontend
git add .
git commit -m "feat: implement animal management UI"
git push origin feature/animals-frontend
```

---

### **PR #8: Customer Dashboard**

#### Prompt to Use:
```
I'm building a Veterinary AI Assistant with React. Create the customer dashboard.

Create these files in frontend/src:

1. components/Dashboard/CustomerDashboard.jsx:
   - Welcome message with user's name
   - Grid of stat cards
   - Recent activity section
   - Quick actions section

2. components/Dashboard/StatCard.jsx:
   - Icon, title, value, optional trend indicator
   - Different colors for different stats
   - Hover animation

3. components/Dashboard/RecentActivity.jsx:
   - Timeline/list of recent activities
   - Show recent health records added
   - Show newly registered animals
   - Timestamps with "time ago" format

4. components/Dashboard/QuickActions.jsx:
   - Grid of action buttons:
     * Add New Animal
     * Check Symptoms (AI)
     * View All Animals
     * Add Health Record
   - Each with icon and label
   - Link to respective pages

5. pages/DashboardPage.jsx:
   - Use DashboardLayout
   - Fetch dashboard data (animal count, recent records)
   - Display CustomerDashboard

Dashboard Stats to show:
- Total Animals count
- Health Records this month
- Last Checkup date
- Pending follow-ups (if any)

Use a clean, card-based layout with soft shadows and rounded corners.
```

#### Git Commands:
```bash
git checkout -b feature/dashboard
git add .
git commit -m "feat: implement customer dashboard with stats and quick actions"
git push origin feature/dashboard
```

---

### **PR #9: Health Records Backend (API)**

#### Prompt to Use:
```
I'm building a Veterinary AI Assistant. Create the health records API.

Create these files in backend/src:

1. controllers/healthController.js:
   - getHealthRecords: Get all health records for an animal
     * Verify user owns the animal
     * Support pagination
     * Support date range filtering (startDate, endDate query params)
     * Sort by createdAt descending
   - getHealthRecord: Get single health record by ID
   - createHealthRecord: Create new health record
     * Verify user owns the animal
     * Validate symptoms array is not empty
   - updateHealthRecord: Update health record
   - deleteHealthRecord: Delete health record
   - getRecentRecords: Get recent health records across all user's animals (for dashboard)

2. routes/health.js:
   - GET /animal/:animalId - get animal's health history
   - GET /recent - get recent records for dashboard
   - GET /:id - get single record
   - POST / - create record (body includes animalId)
   - PUT /:id - update record
   - DELETE /:id - delete record
   - All routes protected

3. Update server.js:
   - Import and use health routes at /api/health

Include severity levels: Low (green), Medium (yellow), High (orange), Critical (red)
```

#### Git Commands:
```bash
git checkout -b feature/health-backend
git add .
git commit -m "feat: implement health records API"
git push origin feature/health-backend
```

---

### **PR #10: Health Records Frontend (UI)**

#### Prompt to Use:
```
I'm building a Veterinary AI Assistant with React. Create the health records frontend.

Create these files in frontend/src:

1. services/healthService.js:
   - API calls: getHealthRecords, getHealthRecord, createHealthRecord, updateHealthRecord, deleteHealthRecord, getRecentRecords

2. components/Health/HealthHistory.jsx:
   - Timeline view of health records
   - Filter by date range
   - Filter by severity
   - Color-coded by severity
   - Expandable record cards

3. components/Health/HealthRecordCard.jsx:
   - Display date, symptoms, diagnosis
   - Severity badge with color
   - Medications list
   - Expand/collapse for details
   - Edit and Delete actions

4. components/Health/AddHealthRecord.jsx:
   - Modal form to add health record
   - Animal selector dropdown
   - Symptoms input (tag-style, add multiple)
   - Severity selector
   - Notes textarea
   - Optional: Add from AI diagnosis

5. components/Health/HealthDetail.jsx:
   - Full view of a health record
   - All information displayed
   - Medications with dosage instructions
   - Print/Export option

6. components/Health/HealthChart.jsx:
   - Simple chart showing health records over time
   - Can use a library like recharts or just CSS bars
   - Show severity distribution

7. pages/HealthHistoryPage.jsx:
   - Route: /animals/:animalId/health
   - Display animal name at top
   - Include HealthHistory component
   - "Add Record" button

Common symptom suggestions to include:
- Vomiting, Diarrhea, Lethargy, Loss of appetite
- Coughing, Sneezing, Itching, Hair loss
- Limping, Swelling, Fever, Eye discharge
```

#### Git Commands:
```bash
git checkout -b feature/health-frontend
git add .
git commit -m "feat: implement health records UI with timeline view"
git push origin feature/health-frontend
```

---

### **PR #11: AI Diagnostic System Backend**

#### Prompt to Use:
```
I'm building a Veterinary AI Assistant. Create the AI diagnostic backend integration.

Create these files in backend/src:

1. services/aiService.js:
   - Integration with OpenAI API (GPT-4 or GPT-3.5-turbo)
   - Function: analyzeSymptoms(species, symptoms, additionalInfo)
   - Create a detailed veterinary prompt that:
     * Specifies the AI is a veterinary diagnostic assistant
     * Includes the animal species
     * Lists all symptoms
     * Asks for: possible conditions, recommended actions, warning signs, when to see a vet
   - Parse and structure the AI response
   - Handle API errors and rate limiting

2. controllers/aiController.js:
   - diagnose: Analyze symptoms and return diagnosis
     * Validate required fields (animalId, symptoms)
     * Get animal info from database
     * Call AI service
     * Optionally save result to health records
   - getRecommendations: Get care recommendations for a condition

3. routes/ai.js:
   - POST /diagnose - analyze symptoms
   - POST /recommendations - get care tips
   - All routes protected

4. Update .env.example:
   - Add OPENAI_API_KEY placeholder

AI Response Structure:
{
  "possibleConditions": [
    { "name": "Condition", "probability": "High/Medium/Low", "description": "..." }
  ],
  "recommendedActions": ["Action 1", "Action 2"],
  "medications": [{ "name": "...", "dosage": "...", "notes": "..." }],
  "warningSignsToWatch": ["Sign 1", "Sign 2"],
  "urgency": "Low/Medium/High/Emergency",
  "shouldSeeVet": true/false,
  "disclaimer": "This is AI-generated advice..."
}

Include a disclaimer that this is not a substitute for professional veterinary care.
```

#### Git Commands:
```bash
git checkout -b feature/ai-backend
git add .
git commit -m "feat: implement AI diagnostic service with OpenAI integration"
git push origin feature/ai-backend
```

---

### **PR #12: AI Diagnostic System Frontend**

#### Prompt to Use:
```
I'm building a Veterinary AI Assistant with React. Create the AI diagnosis frontend.

Create these files in frontend/src:

1. services/aiService.js:
   - API calls: diagnoseSymptoms, getRecommendations

2. components/Health/SymptomChecker.jsx:
   - Multi-step wizard:
     * Step 1: Select animal from dropdown
     * Step 2: Select symptoms (checkbox grid with categories)
     * Step 3: Add additional details (duration, severity, notes)
     * Step 4: Review and submit
   - Progress indicator
   - Back/Next navigation
   - Loading state during AI analysis

3. components/Health/SymptomSelector.jsx:
   - Categorized symptom checkboxes:
     * Digestive: Vomiting, Diarrhea, Loss of appetite, Constipation
     * Respiratory: Coughing, Sneezing, Difficulty breathing, Nasal discharge
     * Skin/Coat: Itching, Hair loss, Rashes, Lumps
     * Behavioral: Lethargy, Aggression, Anxiety, Hiding
     * Physical: Limping, Swelling, Weight loss, Fever
   - Search/filter symptoms
   - Custom symptom input

4. components/Health/DiagnosisResult.jsx:
   - Display AI diagnosis results
   - Urgency level banner (color-coded)
   - Possible conditions list with probability
   - Recommended actions checklist
   - Medications section
   - Warning signs to watch
   - "Save to Health Record" button
   - "Print Report" button
   - Disclaimer prominently displayed

5. components/Health/DiagnosisReport.jsx:
   - Printable report format
   - Include animal info, symptoms, diagnosis
   - Date and time
   - QR code or reference number (optional)

6. pages/DiagnosisPage.jsx:
   - Route: /diagnosis
   - Include SymptomChecker component
   - Can also be accessed from AnimalDetail page

7. components/Health/DisclaimerModal.jsx:
   - Show before first diagnosis
   - User must acknowledge AI limitations
   - Checkbox: "I understand this is not a substitute for professional veterinary care"

Add a nice animation for the AI "thinking" state - maybe a pulsing paw icon.
```

#### Git Commands:
```bash
git checkout -b feature/ai-frontend
git add .
git commit -m "feat: implement AI symptom checker and diagnosis UI"
git push origin feature-ai-frontend
```

---

### **PR #13: Testing & Quality Assurance**

#### Prompt to Use:
```
I'm building a Veterinary AI Assistant. Set up testing for both frontend and backend.

BACKEND TESTING:

1. Install: jest, supertest, mongodb-memory-server

2. Create tests/setup.js:
   - Setup in-memory MongoDB for testing
   - Clear database between tests

3. Create tests/auth.test.js:
   - Test user registration (success and validation errors)
   - Test user login (success and invalid credentials)
   - Test protected route access

4. Create tests/animals.test.js:
   - Test CRUD operations
   - Test authorization (can't access other user's animals)

5. Create tests/health.test.js:
   - Test health record CRUD
   - Test filtering and pagination

FRONTEND TESTING:

1. Install: @testing-library/react, @testing-library/jest-dom, vitest, @testing-library/user-event

2. Create src/__tests__/Login.test.jsx:
   - Test form rendering
   - Test validation errors
   - Test successful login flow (mock API)

3. Create src/__tests__/AnimalList.test.jsx:
   - Test empty state
   - Test displaying animals
   - Test search functionality

4. Create src/__tests__/SymptomChecker.test.jsx:
   - Test wizard navigation
   - Test symptom selection
   - Test form submission

Add npm scripts:
- "test": run tests
- "test:watch": run tests in watch mode
- "test:coverage": run with coverage report
```

#### Git Commands:
```bash
git checkout -b feature/testing
git add .
git commit -m "feat: add unit and integration tests"
git push origin feature/testing
```

---

### **PR #14: Final Polish & Deployment**

#### Prompt to Use:
```
I'm building a Veterinary AI Assistant. Create the deployment configuration and final polish.

1. Create Dockerfile for backend:
   - Node.js base image
   - Copy package files and install dependencies
   - Copy source code
   - Expose port
   - Start command

2. Create Dockerfile for frontend:
   - Node.js base image for building
   - Nginx for serving
   - Multi-stage build

3. Create docker-compose.yml:
   - Backend service
   - Frontend service
   - MongoDB service
   - Environment variables
   - Volume for database persistence

4. Create .github/workflows/ci.yml:
   - Run on push and PR
   - Run tests for both frontend and backend
   - Build Docker images

5. Create .github/workflows/deploy.yml:
   - Deploy backend to Railway/Render
   - Deploy frontend to Vercel/Netlify
   - Only on main branch

6. Frontend polish:
   - Create pages/NotFoundPage.jsx (404 page with illustration)
   - Create components/ErrorBoundary.jsx
   - Add loading skeletons for lists
   - Add page transition animations
   - Add favicon and meta tags

7. Create DEPLOYMENT.md with instructions for:
   - Local development setup
   - Environment variables required
   - Deploying to cloud platforms
   - Database setup (MongoDB Atlas)

8. Update README.md with:
   - Project description
   - Screenshots placeholder
   - Setup instructions
   - API documentation link
   - Contributing guidelines
```

#### Git Commands:
```bash
git checkout -b feature/deployment
git add .
git commit -m "feat: add Docker configuration and deployment setup"
git push origin feature/deployment
```

---

## 🔄 Workflow Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    IMPLEMENTATION FLOW                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PR #1 ──► PR #2 ──► PR #3 ──► PR #4                        │
│  Setup     Database   Auth      Auth                         │
│                       Backend   Frontend                     │
│                          │                                   │
│                          ▼                                   │
│  PR #5 ◄─────────────────┘                                  │
│  Common Components                                           │
│         │                                                    │
│         ├──► PR #6 ──► PR #7                                │
│         │    Animals   Animals                               │
│         │    Backend   Frontend                              │
│         │                                                    │
│         ├──► PR #8                                          │
│         │    Dashboard                                       │
│         │                                                    │
│         ├──► PR #9 ──► PR #10                               │
│         │    Health    Health                                │
│         │    Backend   Frontend                              │
│         │                                                    │
│         └──► PR #11 ──► PR #12                              │
│              AI        AI                                    │
│              Backend   Frontend                              │
│                   │                                          │
│                   ▼                                          │
│              PR #13 ──► PR #14                               │
│              Testing    Deployment                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Completion Checklist

Use this to track your progress:

- [ ] **PR #1:** Project Initialization & Setup
- [ ] **PR #2:** Database Setup & Models
- [ ] **PR #3:** Authentication Backend
- [ ] **PR #4:** Authentication Frontend
- [ ] **PR #5:** Common UI Components
- [ ] **PR #6:** Animal Management Backend
- [ ] **PR #7:** Animal Management Frontend
- [ ] **PR #8:** Customer Dashboard
- [ ] **PR #9:** Health Records Backend
- [ ] **PR #10:** Health Records Frontend
- [ ] **PR #11:** AI Diagnostic Backend
- [ ] **PR #12:** AI Diagnostic Frontend
- [ ] **PR #13:** Testing
- [ ] **PR #14:** Deployment

---

## 💡 Tips for Using These Prompts

1. **Be specific:** If you need changes, ask the AI to modify specific parts
2. **Iterate:** Don't expect perfect code on first try - refine it
3. **Test frequently:** Run your code after each PR to catch issues early
4. **Ask follow-ups:** "Add error handling to this", "Make this responsive", etc.
5. **Combine context:** Share existing code with the AI for better integration

---

## 🆘 Troubleshooting Prompts

### If something doesn't work:
```
I'm getting this error: [paste error]
In this file: [paste relevant code]
How do I fix it?
```

### If you need to modify existing code:
```
I have this existing code: [paste code]
I need to: [describe change]
Please update it accordingly.
```

### If you need to understand code:
```
Explain what this code does and how it works:
[paste code]
```

---

**Ready to start? Begin with PR #1: Project Initialization & Setup!** 🚀
