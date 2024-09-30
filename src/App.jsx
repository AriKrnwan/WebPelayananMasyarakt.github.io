// App.js
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home.jsx';
import Profile from './pages/Profile/profile.jsx';
import Notifikasi from './pages/Notifikasi/notifikasi.jsx';
import Login from './pages/Login/login.jsx';
import Lay from './pages/Layanan/lay.jsx';
import EditPengajuan from './pages/Detail Pengajuan/editPengajuan.jsx';
import Pengaduan from './pages/Pengaduan/pengaduan.jsx';
import Register from './pages/Login/register.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import LupaPassword from './pages/Lupa Password/lupaPassword.jsx';
import DetailInfo from './pages/Detail Info/detailInfo.jsx';
import Dashboard from './pages admin/dashboard.jsx';
import LayAdminSide from './pages admin/layanan.jsx';
import TambahData from './pages admin/tambahData.jsx';
import DetailData from './pages admin/detailData.jsx';
import ProtectedAdmin from './components/ProtectedRoute/ProtectedAdmin.jsx';
import Users from './pages admin/users.jsx';
import TambahUser from './pages admin/Detail User/tambahUser.jsx';
import DetailUser from './pages admin/Detail User/detailUser.jsx';
import EditPengaduan from './pages/Pengaduan/editPengaduan.jsx';
import PengaduanAdminSide from './pages admin/pengaduan.jsx';
import DetailPengaduan from './pages admin/Detail Pengaduan/detailPengaduan.jsx';
import FormAdminPengaduan from './pages admin/Detail Pengaduan/formPengaduan.jsx';
import InformasiAdminSide from './pages admin/informasi.jsx';
import FormAdminInformasi from './pages admin/Detail Informasi/formInformasi.jsx';
import DetailInformasi from './pages admin/Detail Informasi/detailInformasi.jsx';
import ProfileAdmin from './pages admin/profileAdmin.jsx';
import Template from './pages admin/template.jsx';
import moreInfo from './components/Informasi/more-info.jsx';
import ProtectedKadis from './components/ProtectedRoute/ProtextedKadis.jsx';
// import FormPengaduan from './components/Form Layanan/formPengaduan.jsx';
// import FormAdminPengaduan from './components/Form Layanan/formPengaduan.jsx';

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/Home" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/lupa-password" element={<LupaPassword />} />

      {/* ROUTE USER */}
      {/* <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/notifikasi" element={<Notifikasi />} />
      <Route path="/bantuan-logistik" element={<Lay />} />
      <Route path="/santunan-kematian" element={<Lay />} />
      <Route path="/SKT" element={<Lay />} />
      <Route path="/SIO" element={<Lay />} />
      <Route path="/pengumpulan-uang-dan-barang" element={<Lay />} />
      <Route path="/rehabilitasi-lansia" element={<Lay />} />
      <Route path="/rumah-singgah" element={<Lay />} />
      <Route path="/rehabilitasi-anak-terlantar" element={<Lay />} />
      <Route path="/penyandang-disabilitas" element={<Lay />} />
      <Route path="/pengangkatan-anak" element={<Lay />} />
      <Route path="/DTKS" element={<Lay />} />
      <Route path="/PBI-JK" element={<Lay />} />
      <Route path="/pengaduan-DSPM" element={<Pengaduan />} />
      <Route path="/:layanan/edit-pengajuan/:nopel" element={<EditPengajuan />} />
      <Route path="/:layanan/detail-pengajuan/:nopel" element={<EditPengajuan />} />
      <Route path="/detail-info/:id" element={<DetailInfo />} />
      <Route path="pengaduan-DSPM/edit-pengaduan/:no_adu" element={<EditPengaduan />} />
      <Route path="pengaduan-DSPM/detail-pengaduan/:no_adu" element={<EditPengaduan />} /> */}
      <Route path="/home" element={<ProtectedRoute element={Home} />} />
      <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
      <Route path="/notifikasi" element={<ProtectedRoute element={Notifikasi} />} />
      <Route path="/bantuan-logistik" element={<ProtectedRoute element={Lay} />} />
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
      <Route path="/detail-info/:id" element={<ProtectedRoute element={DetailInfo} />} />
      <Route path="/informasi" element={<ProtectedRoute element={moreInfo} />} />
      <Route path="pengaduan-DSPM/edit-pengaduan/:no_adu" element={<ProtectedRoute element={EditPengaduan} />} />
      <Route path="pengaduan-DSPM/detail-pengaduan/:no_adu" element={<ProtectedRoute element={EditPengaduan} />} />

      {/* ROUTE ADMIN */}
      <Route path="/admin/dashboard" element={<ProtectedAdmin element={Dashboard} />} />
      <Route path="/admin/layanan/:layananType" element={<ProtectedAdmin element={LayAdminSide} />} />
      <Route path="/admin/layanan/:layananType/tambah-data" element={<ProtectedAdmin element={TambahData} />} />
      <Route path="/admin/layanan/:layananType/detail/:nopel" element={<ProtectedAdmin element={DetailData} />} />
      <Route path="/admin/layanan/:layananType/edit/:nopel" element={<ProtectedAdmin element={DetailData} />} />
      <Route path="/admin/layanan/:layananType/template" element={<ProtectedAdmin element={Template} />} />
      <Route path="/admin/pengaduan-DSPM" element={<ProtectedAdmin element={PengaduanAdminSide} />} />
      <Route path="/admin/pengaduan-DSPM/tambah-data" element={<ProtectedAdmin element={FormAdminPengaduan} />} />
      <Route path="/admin/pengaduan-DSPM/detail/:no_adu" element={<ProtectedAdmin element={DetailPengaduan} />} />
      <Route path="/admin/pengaduan-DSPM/edit/:no_adu" element={<ProtectedAdmin element={DetailPengaduan} />} />
      <Route path="/admin/users" element={<ProtectedAdmin element={Users} />} />
      <Route path="/admin/users/tambah-user" element={<ProtectedAdmin element={TambahUser} />} />
      <Route path="/admin/users/detail-user/:nik" element={<ProtectedAdmin element={DetailUser} />} />
      <Route path="/admin/informasi" element={<ProtectedAdmin element={InformasiAdminSide} />} />
      <Route path="/admin/informasi/tambah-informasi" element={<ProtectedAdmin element={FormAdminInformasi} />} />
      <Route path="/admin/informasi/edit/:id" element={<ProtectedAdmin element={DetailInformasi} />} />
      <Route path="/admin/profile" element={<ProtectedAdmin element={ProfileAdmin} />} />

      {/* ROUTE KADIS */}
      <Route path="/kadis/dashboard" element={<ProtectedKadis element={Dashboard} />} />
      <Route path="/kadis/layanan/:layananType" element={<ProtectedKadis element={LayAdminSide} />} />
      <Route path="/kadis/pengaduan-DSPM" element={<ProtectedKadis element={PengaduanAdminSide} />} />
      <Route path="/kadis/users" element={<ProtectedKadis element={Users} />} />
      <Route path="/kadis/informasi" element={<ProtectedKadis element={InformasiAdminSide} />} />
      <Route path="/kadis/profile" element={<ProtectedKadis element={ProfileAdmin} />} />
      <Route path="/kadis/users/detail-user/:nik" element={<ProtectedKadis element={DetailUser} />} />
      <Route path="/kadis/layanan/:layananType/detail/:nopel" element={<ProtectedKadis element={DetailData} />} />
      <Route path="/kadis/pengaduan-DSPM/detail/:no_adu" element={<ProtectedKadis element={DetailPengaduan} />} />
    </Routes>
  );
}

export default App;
