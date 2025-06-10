import { Routes, Route, } from "react-router-dom";
// Page Dashboard
import Dashboard from "./components/Dashboard";
import Login from "../src/page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import PrivateRoute from './components/PrivateRoute';

// Page User Umum
import PrivateRouteUser from "./components/PrivateRouteUser";
import MainLayout from "./MainLayout";
import HomePage from "./page/HomePage";
import FilmHomepage from "./page/Films/FilmsPage";
import MusicsPage from "./page/Musics/MusicsPage";
import DetailMusicsPage from "./page/Musics/DetailMusicsPage";
import DetailFilmPage from "./page/Films/DetailFilmsPage";
import FormTiketFilm from "./page/Films/FormTiketFilmPage";
import PaymentFilmPage from "./page/Films/PaymentFilmPage";

// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
     
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/*" element={<HomePage />} />
          <Route path="/films" element={<FilmHomepage />} />
          <Route path="/music" element={<MusicsPage />} />
          <Route path="/music/:id" element={<DetailMusicsPage />} />
          {/* <Route path="/films/detail/:id" element={<DetailFilmPage />} /> */}
          <Route path="/films/tiket/:id/bioskop" element={<FormTiketFilm />} />
          <Route path="/payment-tiket/:id/schedule/:tiketId" element={<PaymentFilmPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route element={<PrivateRouteUser />}>
            <Route path="/films/detail/:id" element={<DetailFilmPage />} />
          </Route>
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>

      </Routes>
      
    </div>
  )
}

export default App;
