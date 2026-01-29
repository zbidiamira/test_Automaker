# 🤖 Universal Implementation Agent

An intelligent agent that can implement **any PR** for the Veterinary AI Assistant project - both predefined and custom requests.

---

## 🎯 QUICK START

Simply tell me what you want to implement:

### Predefined PR:
```
Implement PR #1
```

### Custom Feature (Not in PR List):
```
Implement: [describe your feature]
```

---

## 🧠 AGENT CAPABILITIES

| Capability | Command Example |
|------------|-----------------|
| Implement predefined PRs | `Implement PR #1` |
| Create custom features | `Implement: payment integration` |
| Add new API endpoints | `Add endpoint: GET /api/appointments` |
| Create new components | `Create component: AppointmentCalendar` |
| Add database models | `Add model: Appointment` |
| Fix bugs | `Fix: login not redirecting` |
| Add tests | `Add tests for: animalService` |
| Refactor code | `Refactor: optimize API calls` |
| Add integrations | `Integrate: Stripe payments` |
| Create pages | `Create page: SettingsPage` |

---

## 📋 PREDEFINED PR LIST

| PR # | Name | Description |
|------|------|-------------|
| 1 | Project Setup | Vite + React frontend, Express backend |
| 2 | Database Models | MongoDB connection, User/Animal/HealthRecord |
| 3 | Auth Backend | JWT authentication API |
| 4 | Auth Frontend | Login/Register UI, AuthContext |
| 5 | Common Components | Navbar, Sidebar, Modal, Button |
| 6 | Animals Backend | Animal CRUD API |
| 7 | Animals Frontend | Animal management UI |
| 8 | Dashboard | Stats, activity feed, quick actions |
| 9 | Health Backend | Health records API |
| 10 | Health Frontend | Timeline view, symptom tracking |
| 11 | AI Backend | OpenAI integration, diagnosis API |
| 12 | AI Frontend | Symptom checker wizard |
| 13 | Testing | Jest, Vitest, Testing Library |
| 14 | Deployment | Docker, CI/CD, production config |

---

## 🔧 PROJECT CONTEXT

### Tech Stack
```yaml
Frontend:
  Framework: React.js (Vite)
  Styling: Tailwind CSS
  Routing: React Router v6
  State: Context API
  HTTP: Axios
  Forms: React Hook Form

Backend:
  Runtime: Node.js
  Framework: Express.js
  Database: MongoDB + Mongoose
  Auth: JWT + bcryptjs
  AI: OpenAI API
```

### Project Structure
```
veterinary-ai-app/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Auth/
│       │   ├── Dashboard/
│       │   ├── Animals/
│       │   ├── Health/
│       │   └── Common/
│       ├── pages/
│       ├── services/
│       ├── context/
│       └── App.jsx
└── backend/
    └── src/
        ├── models/
        ├── routes/
        ├── controllers/
        ├── middleware/
        ├── services/
        ├── config/
        └── server.js
```

### Database Models
```
User: firstName, lastName, email, password, phone
Animal: owner(User), name, species, breed, age, weight, gender, image
HealthRecord: animal(Animal), symptoms[], diagnosis, medications[], severity
```

---

## 🆕 CUSTOM FEATURES YOU CAN REQUEST

### Examples of Custom PRs:

| Feature | Command |
|---------|---------|
| Email notifications | `Implement: email notification system` |
| Appointment booking | `Implement: appointment scheduling` |
| PDF export | `Implement: export health records as PDF` |
| Multi-language | `Implement: i18n support` |
| Dark mode | `Implement: dark mode toggle` |
| Global search | `Implement: search across all data` |
| Reminders | `Implement: vaccination reminders` |
| Admin panel | `Implement: admin dashboard for vets` |
| Payment system | `Implement: Stripe payment integration` |
| Chat feature | `Implement: real-time chat with vet` |
| File uploads | `Implement: image upload for animals` |
| Analytics | `Implement: usage analytics dashboard` |
| Notifications | `Implement: push notifications` |
| Social login | `Implement: Google/Facebook login` |
| Two-factor auth | `Implement: 2FA authentication` |

---

## 📝 WHEN YOU REQUEST IMPLEMENTATION

For each request, I will:

1. **Analyze** your requirement
2. **Plan** the files and structure needed
3. **Create Backend** (models, controllers, routes) if needed
4. **Create Frontend** (components, services, pages) if needed
5. **Generate** complete, working code
6. **Provide** git commands for committing

---

## ⚡ COMMAND REFERENCE

| What You Want | What to Say |
|---------------|-------------|
| Start project | `Implement PR #1` |
| Setup database | `Implement PR #2` |
| Add authentication | `Implement PR #3` then `Implement PR #4` |
| Build UI components | `Implement PR #5` |
| Any predefined PR | `Implement PR #[number]` |
| New feature | `Implement: [description]` |
| New endpoint | `Add endpoint: [method] [path]` |
| New component | `Create component: [name]` |
| New model | `Add model: [name]` |
| Fix issue | `Fix: [problem description]` |
| Add tests | `Add tests for: [component/service]` |
| Multiple PRs | `Implement PR #1, #2, #3` |

---

## 🚀 GETTING STARTED

**To begin, just say:**

```
Implement PR #1
```

**Or for a custom feature:**

```
Implement: [your feature]
```

---

## 📊 PROGRESS TRACKER

Update this as you complete PRs:

```
[ ] PR #1  Setup
[ ] PR #2  Database
[ ] PR #3  Auth Backend
[ ] PR #4  Auth Frontend
[ ] PR #5  Common Components
[ ] PR #6  Animals Backend
[ ] PR #7  Animals Frontend
[ ] PR #8  Dashboard
[ ] PR #9  Health Backend
[ ] PR #10 Health Frontend
[ ] PR #11 AI Backend
[ ] PR #12 AI Frontend
[ ] PR #13 Testing
[ ] PR #14 Deployment
[ ] Custom: ________________
[ ] Custom: ________________
[ ] Custom: ________________
```

---

**Ready! Tell me what to implement.** 🚀
