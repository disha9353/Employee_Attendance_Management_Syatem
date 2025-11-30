# Employee Attendance System

A complete, production-ready Employee Attendance System built with React, Node.js, Express, and MongoDB. Features role-based access control for Employees and Managers with comprehensive attendance tracking, reporting, and analytics.

## Features

### Employee Features
- ✅ User Registration & Login
- ✅ Check In / Check Out functionality
- ✅ View personal attendance history with calendar view
- ✅ Monthly attendance summary (Present/Absent/Late/Half-day)
- ✅ Dashboard with today's status, monthly stats, and last 7 days history
- ✅ Profile management

### Manager Features
- ✅ Manager Login
- ✅ Dashboard with team overview (total employees, today's attendance, late arrivals, absent list)
- ✅ View all employees' attendance with advanced filters
- ✅ Team calendar view with color-coded attendance
- ✅ Department-wise statistics and charts
- ✅ Weekly attendance trend charts
- ✅ Export attendance reports to CSV

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Recharts** - Charts and graphs
- **React Calendar** - Calendar component
- **Axios** - HTTP client
- **date-fns** - Date utilities

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## Project Structure

```
Employee_Attendence_System/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Attendance.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── attendance.js
│   │   └── dashboard.js
│   ├── middleware/
│   │   └── auth.js
│   ├── scripts/
│   │   └── seed.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Alert.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/
│   │   │   ├── employee/
│   │   │   │   ├── EmployeeLogin.jsx
│   │   │   │   ├── EmployeeRegister.jsx
│   │   │   │   ├── EmployeeDashboard.jsx
│   │   │   │   ├── MarkAttendance.jsx
│   │   │   │   ├── MyAttendanceHistory.jsx
│   │   │   │   └── EmployeeProfile.jsx
│   │   │   └── manager/
│   │   │       ├── ManagerLogin.jsx
│   │   │       ├── ManagerDashboard.jsx
│   │   │       ├── AllEmployeesAttendance.jsx
│   │   │       ├── TeamCalendarView.jsx
│   │   │       └── Reports.jsx
│   │   ├── store/
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       ├── authSlice.js
│   │   │       └── attendanceSlice.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher) - Make sure MongoDB is running
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Employee_Attendence_System
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/employee_attendance
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory (optional):

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed Database (Optional)

To populate the database with sample data:

```bash
cd backend
npm run seed
```

This will create:
- 1 Manager account: `manager@company.com` / `manager123`
- 5 Employee accounts: `alice@company.com`, `bob@company.com`, etc. / `employee123`
- Sample attendance records for the last 30 days

## Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new employee
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Attendance (Employee)
- `POST /api/attendance/checkin` - Check in (Protected)
- `POST /api/attendance/checkout` - Check out (Protected)
- `GET /api/attendance/today` - Get today's status (Protected)
- `GET /api/attendance/my-history` - Get attendance history (Protected)
- `GET /api/attendance/my-summary` - Get monthly summary (Protected)

### Attendance (Manager)
- `GET /api/attendance/all` - Get all attendance (Protected, Manager only)
- `GET /api/attendance/employee/:id` - Get employee attendance (Protected, Manager only)
- `GET /api/attendance/summary` - Get team summary (Protected, Manager only)
- `GET /api/attendance/today-status` - Get today's status for all (Protected, Manager only)
- `GET /api/attendance/export` - Export CSV (Protected, Manager only)

### Dashboard
- `GET /api/dashboard/employee` - Employee dashboard data (Protected)
- `GET /api/dashboard/manager` - Manager dashboard data (Protected, Manager only)

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: 'employee' | 'manager'),
  employeeId: String (unique, auto-generated),
  department: String,
  createdAt: Date
}
```

### Attendance Model
```javascript
{
  userId: ObjectId (ref: User),
  date: Date,
  checkInTime: Date,
  checkOutTime: Date,
  status: String (enum: 'present' | 'absent' | 'late' | 'half-day'),
  totalHours: Number,
  createdAt: Date
}
```

## Features Details

### Attendance Status Logic
- **Present**: Check-in before 9:30 AM and worked full day
- **Late**: Check-in after 9:30 AM
- **Half-day**: Worked less than 4 hours
- **Absent**: No check-in recorded

### Calendar Color Codes
- 🟢 **Green**: Present
- 🔴 **Red**: Absent
- 🟡 **Yellow**: Late
- 🟠 **Orange**: Half-day

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Use a strong `JWT_SECRET`
3. Update `MONGODB_URI` to production database
4. Use process manager like PM2: `pm2 start server.js`

### Frontend
1. Build the app: `npm run build`
2. Serve the `dist` folder using a web server (nginx, Apache, etc.)
3. Update `VITE_API_URL` to production API URL

## Security Features
- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes with role-based access control
- Input validation with express-validator
- CORS enabled for frontend communication

## Mobile Responsive
The entire application is fully responsive and works seamlessly on:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (320px+)

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod` or `brew services start mongodb-community`
- Check `MONGODB_URI` in `.env` file

### Port Already in Use
- Change `PORT` in backend `.env`
- Update frontend proxy in `vite.config.js`

### CORS Issues
- Ensure backend CORS is configured correctly
- Check API URL in frontend `.env`

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue in the repository.

---

**Built with ❤️ using React, Node.js, and MongoDB**

