// App.js
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home.jsx';
import Profile from './pages/Profile/profile.jsx';
import Notifikasi from './pages/Notifikasi/notifikasi.jsx';
// import Login from './pages/Login/login.jsx';
import Lay from './pages/Layanan/lay.jsx';
import EditPengajuan from './pages/Detail Pengajuan/editPengajuan.jsx';
import Pengaduan from './pages/Pengaduan/pengaduan.jsx';
import DetailPengaduan from './pages/Detail Pengajuan/detailPengaduan.jsx';
// import Register from './pages/Login/register.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/bantuan-logistik" element={<Lay />} />
      {/* <Route path="/home" element={<ProtectedRoute element={Home} />} /> */}
      <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
      <Route path="/notifikasi" element={<ProtectedRoute element={Notifikasi} />} />
      {/* <Route path="/bantuan-logistik" element={<ProtectedRoute element={Lay} />} /> */}
      <Route path="/santunan-kematian" element={<ProtectedRoute element={Lay} />} />
      <Route path="/SKT" element={<ProtectedRoute element={Lay} />} />
      <Route path="/SIO" element={<ProtectedRoute element={Lay} />} />
      <Route path="/pengumpulan-uang-dan-barang" element={<ProtectedRoute element={Lay} />} />
      <Route path="/rehabilitasi-lansia" element={<ProtectedRoute element={Lay} />} />
      <Route path="/rumah-singgah" element={<ProtectedRoute element={Lay} />} />
      <Route path="/rehabilitasi-anak-terlantar" element={<ProtectedRoute element={Lay} />} />
      <Route path="/penyandang-disabilitas" element={<ProtectedRoute element={Lay} />} />
      <Route path="/pengangkatan-anak" element={<ProtectedRoute element={Lay} />} />
      <Route path="/DTKS" element={<ProtectedRoute element={Lay} />} />
      <Route path="/PBI-JK" element={<ProtectedRoute element={Lay} />} />
      <Route path="/pengaduan-DSPM" element={<ProtectedRoute element={Pengaduan} />} />
      <Route path="/:layanan/edit-pengajuan/:nopel" element={<ProtectedRoute element={EditPengajuan} />} />
      <Route path="/:layanan/detail-pengajuan/:nopel" element={<ProtectedRoute element={EditPengajuan} />} />
      <Route path="/detail-pengaduan" element={<ProtectedRoute element={DetailPengaduan} />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;
