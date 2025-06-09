import { Navigate, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';

const PrivateRouteUser = () => {
  const token = localStorage.getItem('token'); 
  
//   document.body.style.backgroundColor = "#121212";
//   document.querySelector('.navbar').style.display = 'none'; // menyembunyikan navbar
//   document.querySelector('footer').style.display = 'none'; 

  if (!token) {
    
    Swal.fire({
      title: 'Anda harus login terlebih dahulu',
      text: 'Silakan login untuk melanjutkan.',
      icon: 'warning',
      confirmButtonText: 'OK',
    }).then(() => {  
     return <Navigate to="/login" />;
    });
  }

//   document.body.style.backgroundColor = "";
//   document.querySelector('.navbar').style.display = ''; // mengembalikan navbar
//   document.querySelector('footer').style.display = ''; 

  return <Outlet />;  
};

export default PrivateRouteUser;
