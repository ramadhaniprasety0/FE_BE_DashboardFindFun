import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');  // Mengambil token dari localStorage

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;  // Menampilkan konten halaman yang dilindungi jika token ada
};

export default PrivateRoute;
