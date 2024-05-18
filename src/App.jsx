import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx'
import Profile from './pages/Profile/profile.jsx'
import Notifikasi from './pages/Notifikasi/notifikasi.jsx'
import Login from './pages/Login/login.jsx'
import Lay from './pages/Layanan/lay.jsx';
import DetailPengajuan from './pages/Detail Pengajuan/detailPengajuan.jsx';
import Pengaduan from './pages/Pengaduan/pengaduan.jsx';
import DetailPengaduan from './pages/Detail Pengajuan/detailPengaduan.jsx';
import Register from './pages/Login/register.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/home"index element={<Home/>} />
        <Route path="/profile"index element={<Profile/>} />
        <Route path="/notifikasi"index element={<Notifikasi/>} />
        <Route path="/login"index element={<Login/>} />
        <Route path="/bantuan-logistik"index element={<Lay/>} />
        <Route path="/santunan-kematian"index element={<Lay/>} />
        <Route path="/SKT"index element={<Lay/>} />
        <Route path="/SIO"index element={<Lay/>} />
        <Route path="/pengumpulan-uang-dan-barang"index element={<Lay/>} />
        <Route path="/rehabilitasi-lansia"index element={<Lay/>} />
        <Route path="/rumah-singgah"index element={<Lay/>} />
        <Route path="/rehabilitasi-anak-terlantar"index element={<Lay/>} />
        <Route path="/penyandang-disabilitas"index element={<Lay/>} />
        <Route path="/pengangkatan-anak"index element={<Lay/>} />
        <Route path="/DTKS"index element={<Lay/>} />
        <Route path="/PBI-JK"index element={<Lay/>} />
        <Route path="/pengaduan-DSPM"index element={<Pengaduan/>} />
        <Route path="/detail-pengajuan/:layanan"index element={<DetailPengajuan/>} />
        <Route path="/detail-pengaduan"index element={<DetailPengaduan/>} />
        <Route path="/register"index element={<Register/>} />
      </Routes>
    </>
  )
}

export default App
