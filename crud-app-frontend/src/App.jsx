import { Routes, Route, } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
     
      <Routes>
        <Route path="/*" element={<Dashboard />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App;
