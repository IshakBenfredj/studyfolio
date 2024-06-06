import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import UserContextProvider, { UserContext } from "./context/userContext.jsx";
import DataContextProvider from "./context/dataContext.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";

import Login from "./pages/Login";
import LostPass from "./pages/LostPass.jsx";
import DashboardAdmin from "./pages/admin";
import DashboardStudent from "./pages/student";
import DashboardTeacher from "./pages/teacher";
import AddTeacher from "./pages/admin/AddTeacher";
import AddStudent from "./pages/admin/AddStudent";
import AddPromo from "./pages/admin/AddPromo.jsx";
import Students from "./pages/admin/Students.jsx";
import Teachers from "./pages/admin/Teachers.jsx";
import DashboardHome from "./pages/admin/AdminDashboard.jsx";
import AddModule from "./pages/admin/AddModule.jsx";
import Modules from "./pages/admin/Modules.jsx";
import Promos from "./pages/admin/Promos.jsx";
import ModulesStudent from "./pages/student/Modules.jsx";
import AddResource from "./pages/teacher/AddResource.jsx";
import AddTest from "./pages/teacher/AddTest.jsx";
import AddQuizzes from "./pages/teacher/AddQuizzes.jsx";
import TeacherDashboard from "./pages/teacher/TeacherDashboard.jsx";
import Resources from "./pages/teacher/Resources.jsx";
import ModuleDetails from "./pages/modules/index.jsx";
import ActivityDetails from "./pages/modules/ActivityDetails.jsx";
import Home from "./pages/student/Home.jsx";
import Profile from "./pages/student/Profile.jsx";
import ActivitySub from "./pages/modules/ActivitySub.jsx";

function App() {
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
    setLoading(false);
  }, [setUser]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<PublicRoute Element={Login} />} />
        <Route path="lost_password" element={<PublicRoute Element={LostPass} />} />

        <Route path="/admin/dashboard" element={<PrivateRoute Element={DashboardAdmin} allowedRoles={['admin']} />}>
          <Route path="" element={<PrivateRoute Element={DashboardHome} allowedRoles={['admin']} />} />
          <Route path="addStudents" element={<PrivateRoute Element={AddStudent} allowedRoles={['admin']} />} />
          <Route path="studentsList" element={<PrivateRoute Element={Students} allowedRoles={['admin']} />} />
          <Route path="addTeachers" element={<PrivateRoute Element={AddTeacher} allowedRoles={['admin']} />} />
          <Route path="teachersList" element={<PrivateRoute Element={Teachers} allowedRoles={['admin']} />} />
          <Route path="addPromo" element={<PrivateRoute Element={AddPromo} allowedRoles={['admin']} />} />
          <Route path="promosList" element={<PrivateRoute Element={Promos} allowedRoles={['admin']} />} />
          <Route path="addModule" element={<PrivateRoute Element={AddModule} allowedRoles={['admin']} />} />
          <Route path="modulesList" element={<PrivateRoute Element={Modules} allowedRoles={['admin']} />} />
        </Route>

        <Route path="/teacher/dashboard" element={<PrivateRoute Element={DashboardTeacher} allowedRoles={['teacher']} />}>
          <Route path="" element={<PrivateRoute Element={TeacherDashboard} allowedRoles={['teacher']} />} />
          <Route path="resources" element={<PrivateRoute Element={Resources} allowedRoles={['teacher']} />} />
          <Route path="addResource" element={<PrivateRoute Element={AddResource} allowedRoles={['teacher']} />} />
          <Route path="addTest" element={<PrivateRoute Element={AddTest} allowedRoles={['teacher']} />} />
          <Route path="addQuiz" element={<PrivateRoute Element={AddQuizzes} allowedRoles={['teacher']} />} />
          <Route path="module/:id_module" element={<PrivateRoute Element={ModuleDetails} allowedRoles={['teacher']} />} />
          <Route path="activity/:id_act" element={<PrivateRoute Element={ActivitySub} allowedRoles={['teacher']} />} />
        </Route>

        <Route path="/student" element={<PrivateRoute Element={DashboardStudent} allowedRoles={['student']} />}>
          <Route path="" element={<PrivateRoute Element={Home} allowedRoles={['student']} />} />
          <Route path="modules" element={<PrivateRoute Element={ModulesStudent} allowedRoles={['student']} />} />
          <Route path="activity/:id_act" element={<PrivateRoute Element={ActivityDetails} allowedRoles={['student']} />} />
          <Route path="profile/:id" element={<PrivateRoute Element={Profile} allowedRoles={['student']} />} />
          <Route path="module/:id_module" element={<PrivateRoute Element={ModuleDetails} allowedRoles={['student']} />} />
        </Route>
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <UserContextProvider>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </UserContextProvider>
  );
}

export default AppWrapper;
