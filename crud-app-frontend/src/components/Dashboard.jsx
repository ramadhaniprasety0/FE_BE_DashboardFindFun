import { useState, useEffect  } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Films
import AppCRUD from './AppCRUD';
import FormAddData from './FormAddData';
import FormEditData from './FormEditData';

// Music
import MusicApp from './MusicApp';
import FormAddMusic from './FormAddMusic';
import FormEditMusic from './FormEditMusic';

// Artist
import ArtistApp from './ArtistApp';
import FormAddArtist from './FormAddArtist';
import FormEditArtist from './FormEditArtist';

// Album
import AlbumApp from './AlbumApp';
import FormAddAlbum from './FormAddAlbum';
import FormEditAlbum from './FormEditAlbum';

import axios from 'axios';


// Komponen baru untuk dashboard
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function isMenuActive(pathname, menu) {
    const regex = new RegExp(`^/dashboard/(${menu}($|/)|add${menu}|edit${menu}/)`);
    return regex.test(pathname);
  }
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`bg-slider text-white ${collapsed ? 'p-2' : 'p-3'}`} 
           style={{ minHeight: '100vh', width: collapsed ? '60px' : '250px', transition: 'width 0.3s'}}>
        <div className="d-flex align-items-center mb-4" style={{ justifyContent: collapsed ? 'center' : 'space-between' }}>
          <div className="d-flex align-items-center justify-content-between gap-1" style={{ marginLeft: collapsed ? '0' : '16px'}}>
          {!collapsed && <img src="/findfun.svg" alt="Logo" style={{ width: '30px', height: '30px'}}/>}  
          {!collapsed && <h5 className="m-0">FindFun</h5>}
          </div>
          <button className="btn btn-sm btn-slider" onClick={toggleSidebar}>
            <i className={collapsed ? 'bi bi-arrow-right' : 'bi bi-arrow-left'}></i>
          </button>
        </div>
        <div className="nav flex-column">
          <Link 
            to="/dashboard" 
            className={`nav-link text-start text-white border-0  mb-2 ${location.pathname === '/dashboard' || location.pathname === '/' ? 'slider-active' : ''}`} 
            style={{ transition: 'all 0.3s ease-in-out', width: collapsed ? '46px' : '100%' }}
          >
            <i className="bi bi-speedometer2 me-1"></i>
            {!collapsed && 'Dashboard'}
          </Link>
          <Link 
            to="/dashboard/films" 
            className={`nav-link text-start text-white border-0 mb-2 ${isMenuActive(location.pathname, 'films') ? 'slider-active' : ''}`} 
            style={{ transition: 'all 0.3s ease-in-out', width: collapsed ? '46px' : '100%' }}
          >
            <i className="bi bi-film me-2"></i>
            {!collapsed && 'Data Film'}
          </Link>
          <Link 
            to="/dashboard/music" 
            className={`nav-link text-start text-white border-0 mb-2 ${isMenuActive(location.pathname, 'music') ? 'slider-active' : ''} ${isMenuActive(location.pathname, 'albums') ? 'slider-active' : ''}`} 
            style={{ transition: 'all 0.3s ease-in-out', width: collapsed ? '46px' : '100%' }}
          >
            <i className="bi bi-file-music me-2"></i>
            {!collapsed && 'Data Music'}
          </Link>
          <Link 
            to="/dashboard/artists" 
            className={`nav-link text-start text-white border-0 mb-2 ${isMenuActive(location.pathname, 'artists') ? 'slider-active' : ''}`} 
            style={{ transition: 'all 0.3s ease-in-out', width: collapsed ? '46px' : '100%' }}
          >
            <i className="bi bi-person-badge me-2"></i>
            {!collapsed && 'Data Artist'}
          </Link>
          <Link 
            to="/dashboard/tiket" 
            className={`nav-link text-start text-white border-0 mb-2 ${isMenuActive(location.pathname, 'tiket') ? 'slider-active' : ''}`}
            style={{ transition: 'all 0.3s ease-in-out', width: collapsed ? '46px' : '100%' }}
          >
            <i className="bi bi-ticket-detailed me-2"></i>
            {!collapsed && 'Tiket Bioskop'}
          </Link>
          <Link 
            to="/dashboard/konser" 
            className={`nav-link text-start text-white border-0 mb-2 ${isMenuActive(location.pathname, 'konser') ? 'slider-active' : ''}`}
            style={{ transition: 'all 0.3s ease-in-out', width: collapsed ? '46px' : '100%' }}
          >
            <i className="bi bi-ticket-perforated me-2"></i>
            {!collapsed && 'Tiket Konser'}
          </Link>
          <Link 
            to="/dashboard/users" 
            className={`nav-link text-start text-white border-0 mb-2 ${isMenuActive(location.pathname, 'users') ? 'slider-active' : ''}`}
            style={{ transition: 'all 0.3s ease-in-out', width: collapsed ? '46px' : '100%' }}
          >
            <i className="bi bi-people me-2"></i>
            {!collapsed && 'Pengguna'}
          </Link>
          <Link 
            to="/dashboard/settings" 
            className={`nav-link text-start text-white border-0 mb-2 ${isMenuActive(location.pathname, 'settings') ? 'slider-active' : ''}`}
            style={{ transition: 'all 0.3s ease-in-out', width: collapsed ? '46px' : '100%' }}
          >
            <i className="bi bi-gear me-2"></i>
            {!collapsed && 'Pengaturan'}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header */}
        <header className="bg-header border-bottom p-3 d-flex justify-content-between align-items-center shadow-sm">
          <div>
            <h5 className="m-0 fw-bold">FinFun Management System</h5>
          </div>
          <div className="d-flex align-items-center">
            <div className="dropdown me-3">
              <button className="btn btn-sm btn-bell position-relative" type="button">
                <i className="bi bi-bell"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  3
                </span>
              </button>
            </div>
            <div className="dropdown">
              <button className="btn d-flex align-items-center" type="button">
                <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-2" style={{ width: '30px', height: '30px' }}>
                  A
                </div>
                <span>Admin</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            {/* Route Films */}
            <Route path="/films" element={<FilmsManagement />} />
            <Route path="/addfilms" element={<FormAddData />} />
            <Route path="/editfilms/:id" element={<FormEditData />} />
            {/* Route Music */}
            <Route path='/music' element={<MusicManagement />} />
            <Route path='/addmusic' element={<FormAddMusic/>} />
            <Route path='/editmusic/:id' element={<FormEditMusic/>} />
            {/* Route Artist */}
            <Route path='/artists' element={<ArtistManagement />} />
            <Route path='/addartists' element={<FormAddArtist/>} />
            <Route path='/editartists/:id' element={<FormEditArtist/>} />
            {/* Route Album */}
            <Route path='/albums' element={<AlbumManagement />} />
            <Route path='/addalbums' element={<FormAddAlbum/>} />
            <Route path='/editalbums/:id' element={<FormEditAlbum/>} />
            {/* Route User */}
            <Route path="/users" element={<UsersManagement />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

// Dashboard Home Page
const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalFilms: 0,
    totalMusic: 0,
    totalUsers: 842,
    highestRating: 4.9,
    releasedThisMonth: 12
  });
  const [loading, setLoading] = useState(true);

  // Fetch film count from API
  useEffect(() => {
    const fetchFilmCount = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:3000/films/getfilms");
        
        // Update stats with actual film count
        setStats(prevStats => ({
          ...prevStats,
          totalFilms: data.data.length
        }));
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching film count:", error);
        setLoading(false);
      }
    };

    const fetchMusicCount = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:3000/music/getmusic");
        
        // Update stats with actual film count
        setStats(prevStats => ({
          ...prevStats,
          totalMusic: data.data.length
        }));
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Music count:", error);
        setLoading(false);
      }
    };

    fetchFilmCount();
    fetchMusicCount();
  }, []);

  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm mb-3">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 p-3 rounded me-3">
                  <i className="bi bi-film text-primary fs-4"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Total Film</h6>
                  <h4 className="mb-0">{stats.totalFilms}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm mb-3">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-danger bg-opacity-10 p-3 rounded me-3">
                  <i className="bi bi-file-music text-danger fs-4"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Total Music</h6>
                  <h4 className="mb-0">{stats.totalMusic}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm mb-3">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-success bg-opacity-10 p-3 rounded me-3">
                  <i className="bi bi-people text-success fs-4"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Total Pengguna</h6>
                  <h4 className="mb-0">842</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm mb-3">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-warning bg-opacity-10 p-3 rounded me-3">
                  <i className="bi bi-star text-warning fs-4"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Rating Tertinggi</h6>
                  <h4 className="mb-0">4.9</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm mb-3">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-info bg-opacity-10 p-3 rounded me-3">
                  <i className="bi bi-calendar-check text-info fs-4"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Dirilis Bulan Ini</h6>
                  <h4 className="mb-0">12</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="card-title m-0">Carousel Film Yang Sedang Tayang</h5>
            </div>
            <div className="card-body">
              <div className="bg-light p-4 rounded d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                <p className="text-muted">Menampilkan Carousel Film</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="card-title m-0">Film Terbaru</h5>
              <button className="btn btn-sm btn-light">Lihat Semua</button>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-light rounded d-flex justify-content-center align-items-center me-3" style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-film text-muted"></i>
                    </div>
                    <div>
                      <p className="m-0 fw-bold">The Last Adventure</p>
                      <small className="text-muted">Rating: 4.8 | 2023</small>
                    </div>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-light rounded d-flex justify-content-center align-items-center me-3" style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-film text-muted"></i>
                    </div>
                    <div>
                      <p className="m-0 fw-bold">Midnight Express</p>
                      <small className="text-muted">Rating: 4.7 | 2023</small>
                    </div>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-light rounded d-flex justify-content-center align-items-center me-3" style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-film text-muted"></i>
                    </div>
                    <div>
                      <p className="m-0 fw-bold">Dark Waters</p>
                      <small className="text-muted">Rating: 4.6 | 2023</small>
                    </div>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-light rounded d-flex justify-content-center align-items-center me-3" style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-film text-muted"></i>
                    </div>
                    <div>
                      <p className="m-0 fw-bold">The Secret Garden</p>
                      <small className="text-muted">Rating: 4.5 | 2023</small>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="card-title m-0">Music Terbaru</h5>
              <button className="btn btn-sm btn-light">Lihat Semua</button>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-light rounded d-flex justify-content-center align-items-center me-3" style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-file-music text-muted"></i>
                    </div>
                    <div>
                      <p className="m-0 fw-bold">The Last Adventure</p>
                      <small className="text-muted">Rating: 4.8 | 2023</small>
                    </div>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-light rounded d-flex justify-content-center align-items-center me-3" style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-file-music text-muted"></i>
                    </div>
                    <div>
                      <p className="m-0 fw-bold">Midnight Express</p>
                      <small className="text-muted">Rating: 4.7 | 2023</small>
                    </div>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-light rounded d-flex justify-content-center align-items-center me-3" style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-file-music text-muted"></i>
                    </div>
                    <div>
                      <p className="m-0 fw-bold">Dark Waters</p>
                      <small className="text-muted">Rating: 4.6 | 2023</small>
                    </div>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-light rounded d-flex justify-content-center align-items-center me-3" style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-file-music text-muted"></i>
                    </div>
                    <div>
                      <p className="m-0 fw-bold">The Secret Garden</p>
                      <small className="text-muted">Rating: 4.5 | 2023</small>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Films Management Page 
const FilmsManagement = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Manajemen Film</h4>
        <button 
          className="btn btn-add" 
          onClick={() => navigate('/dashboard/addfilms')}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Tambah Film
        </button>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <AppCRUD />
          </div>
        </div>
      </div>
    </div>
  );
};

// Music Management Page
const MusicManagement = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Manajemen Music</h4>
        <div className="d-flex gap-2">
        <button 
          className="btn btn-add" 
          onClick={() => navigate('/dashboard/addmusic')}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Tambah Music
        </button>
        <button 
          className="btn btn-add" 
          onClick={() => navigate('/dashboard/albums')}
        >
          <i className="bi bi-eye me-2"></i>
          Lihat Album
        </button>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <MusicApp />
          </div>
        </div>
      </div>
    </div>
  );
}

// Artists Management Page
const ArtistManagement = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Manajemen Artist</h4>
        <button 
          className="btn btn-add" 
          onClick={() => navigate('/dashboard/artists')}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Tambah Artist
        </button>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <ArtistApp />
          </div>
        </div>
      </div>
    </div>
  );
}

// Album Management Page
const AlbumManagement = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Manajemen Album Artist</h4>
        <button 
          className="btn btn-add" 
          onClick={() => navigate('/dashboard/addalbums')}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Tambah Album
        </button>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <AlbumApp />
          </div>
        </div>
      </div>
    </div>
  );
}
// Users Management Page
const UsersManagement = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Daftar Pengguna</h4>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Tambah Pengguna
        </button>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Status</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Budi Santoso</td>
                  <td>budi@example.com</td>
                  <td>Admin</td>
                  <td><span className="badge bg-success">Aktif</span></td>
                  <td>
                    <button className="btn btn-sm btn-light me-2"><i className="bi bi-pencil"></i></button>
                    <button className="btn btn-sm btn-light"><i className="bi bi-trash"></i></button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Ani Wijaya</td>
                  <td>ani@example.com</td>
                  <td>Editor</td>
                  <td><span className="badge bg-success">Aktif</span></td>
                  <td>
                    <button className="btn btn-sm btn-light me-2"><i className="bi bi-pencil"></i></button>
                    <button className="btn btn-sm btn-light"><i className="bi bi-trash"></i></button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Dina Permata</td>
                  <td>dina@example.com</td>
                  <td>Staff</td>
                  <td><span className="badge bg-success">Aktif</span></td>
                  <td>
                    <button className="btn btn-sm btn-light me-2"><i className="bi bi-pencil"></i></button>
                    <button className="btn btn-sm btn-light"><i className="bi bi-trash"></i></button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Eko Purnomo</td>
                  <td>eko@example.com</td>
                  <td>Viewer</td>
                  <td><span className="badge bg-warning">Pending</span></td>
                  <td>
                    <button className="btn btn-sm btn-light me-2"><i className="bi bi-pencil"></i></button>
                    <button className="btn btn-sm btn-light"><i className="bi bi-trash"></i></button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Fitri Hapsari</td>
                  <td>fitri@example.com</td>
                  <td>Viewer</td>
                  <td><span className="badge bg-danger">Nonaktif</span></td>
                  <td>
                    <button className="btn btn-sm btn-light me-2"><i className="bi bi-pencil"></i></button>
                    <button className="btn btn-sm btn-light"><i className="bi bi-trash"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings Page
const SettingsPage = () => {
  return (
    <div>
      <h4 className="mb-4">Pengaturan</h4>
      
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white">
          <h5 className="card-title m-0">Pengaturan Situs</h5>
        </div>
        <div className="card-body">
          <div className="mb-3 row">
            <label htmlFor="siteName" className="col-sm-3 col-form-label">Nama Situs</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="siteName" defaultValue="Cinema Management System" />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="adminEmail" className="col-sm-3 col-form-label">Email Admin</label>
            <div className="col-sm-9">
              <input type="email" className="form-control" id="adminEmail" defaultValue="admin@example.com" />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="logoUpload" className="col-sm-3 col-form-label">Logo Situs</label>
            <div className="col-sm-9">
              <input type="file" className="form-control" id="logoUpload" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-9 offset-sm-3">
              <button type="button" className="btn btn-primary">Simpan Perubahan</button>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white">
          <h5 className="card-title m-0">Pengaturan Notifikasi</h5>
        </div>
        <div className="card-body">
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="emailNotif" defaultChecked />
            <label className="form-check-label" htmlFor="emailNotif">Terima notifikasi melalui email</label>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="newFilmNotif" defaultChecked />
            <label className="form-check-label" htmlFor="newFilmNotif">Pemberitahuan film baru</label>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="newUserNotif" defaultChecked />
            <label className="form-check-label" htmlFor="newUserNotif">Pemberitahuan pengguna baru</label>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="systemNotif" defaultChecked />
            <label className="form-check-label" htmlFor="systemNotif">Pemberitahuan sistem</label>
          </div>
          <button type="button" className="btn btn-primary">Simpan Perubahan</button>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white">
          <h5 className="card-title m-0">Pengaturan Keamanan</h5>
        </div>
        <div className="card-body">
          <div className="mb-3 row">
            <label htmlFor="currentPassword" className="col-sm-3 col-form-label">Password Saat Ini</label>
            <div className="col-sm-9">
              <input type="password" className="form-control" id="currentPassword" />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="newPassword" className="col-sm-3 col-form-label">Password Baru</label>
            <div className="col-sm-9">
              <input type="password" className="form-control" id="newPassword" />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="confirmPassword" className="col-sm-3 col-form-label">Konfirmasi Password</label>
            <div className="col-sm-9">
              <input type="password" className="form-control" id="confirmPassword" />
            </div>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="twoFactorAuth" />
            <label className="form-check-label" htmlFor="twoFactorAuth">Aktifkan Otentikasi Dua Faktor</label>
          </div>
          <div className="row">
            <div className="col-sm-9 offset-sm-3">
              <button type="button" className="btn btn-primary">Perbarui Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard