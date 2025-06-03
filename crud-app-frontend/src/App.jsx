import { Routes, Route, } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "../src/page/LoginPage";
import PrivateRoute from './components/PrivateRoute';
import HomePage from "./page/HomePage";
import MainLayout from "./MainLayout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
     
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/*" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>

      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App;
