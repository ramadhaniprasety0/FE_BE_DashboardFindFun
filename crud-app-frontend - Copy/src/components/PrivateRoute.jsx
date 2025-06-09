import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');  // Mengambil token dari localStorage

  if (!token) {
    // Jika tidak ada token, arahkan ke halaman login
    return <Navigate to="/login" />;
  }

  return <Outlet />;  // Menampilkan konten halaman yang dilindungi jika token ada
};

export default PrivateRoute;
