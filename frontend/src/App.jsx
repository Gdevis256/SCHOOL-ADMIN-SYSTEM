import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import ChoosePage from "./components/ChoosePage";
import AdminLogin from "./components/AdminLogin";
import StudentLogin from "./components/StudentLogin";
import TeacherLogin from "./components/TeacherLogin";
import AdminSignUp from "./components/AdminSignUp";
import StudentSignUp from "./components/StudentSignUp";
import TeacherSignUp from "./components/TeacherSignUp";

import AdminLayout from "./layouts/AdminLayout";
import ClassesDashboard from "./pages/Admin/ClassesDashboard";
import SubjectsDashboard from "./pages/Admin/SubjectsDashboard";
import Teachers from "./pages/Admin/Teachers";
import StudentsPage from "./pages/Admin/StudentsPage";
import NoticesPage from "./pages/Admin/NoticesPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/Admin/DashboardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/ChoosePage" element={<ChoosePage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/admin-signup" element={<AdminSignUp />} />
        <Route path="/student-signup" element={<StudentSignUp />} />
        <Route path="/teacher-signup" element={<TeacherSignUp />} />

        <Route path="/Admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="classes" element={<ClassesDashboard />} />
          <Route path="subjects" element={<SubjectsDashboard />} /> 
          <Route path="teachers" element={<Teachers />} /> 
          <Route path="students" element={<StudentsPage />} /> 
          <Route path="Notices" element={<NoticesPage />} /> 
          <Route path="Profile" element={<ProfilePage />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
