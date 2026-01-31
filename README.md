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
