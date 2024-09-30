import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from "../../components/Footer/footer";
import CollapsibleExample from "../../components/Navbar/navbar";
import Wallpaper2 from "../../components/Wallpaper/wallpaper2";
import '../../components/Form Layanan/formLayanan.css';
import TableLayanan from "../../components/Table Layanan/tableLayanan.jsx";
import SidebarLay from "../../components/Sidebar/sidebarLay.jsx";
import AlertLayanan from '../../components/Alert/alertLayanan.jsx';
import SubmitBantuanLogistik from '../../components/Form Submit/submitBantuanLogistik.jsx';
import api from '../../components/api.jsx';
import SubmitSantunanKematian from '../../components/Form Submit/submitSantunanKematian.jsx';
import SubmitSKT from '../../components/Form Submit/submitSKT.jsx';
import SubmitSIO from '../../components/Form Submit/submitSIO.jsx';
import SubmitPUB from '../../components/Form Submit/submitPUB.jsx';
import SubmitRumahSinggah from '../../components/Form Submit/submitRumahSinggah.jsx';
import SubmitRehabilitasiLansia from '../../components/Form Submit/submitRehabillitasiLansia.jsx';
import SubmitRehabAnak from '../../components/Form Submit/submitRehabAnak.jsx';
import SubmitPenyandangDisabilitas from '../../components/Form Submit/submitPenyandangDisabilitas.jsx';
import SubmitPengangkatanAnak from '../../components/Form Submit/submitPengangkatanAnak.jsx';
import SubmitDTKS from '../../components/Form Submit/submitDTKS.jsx';
import SubmitPBIJK from '../../components/Form Submit/submitPBIJK.jsx';
import SubmitPengaduan from '../../components/Form Submit/submitPengaduan.jsx';

function Lay() {
    const [activeTab, setActiveTab] = useState('Pengajuan');
    const [dataProses, setDataProses] = useState([]);
    const [dataSelesai, setDataSelesai] = useState([]);
    const location = useLocation();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const getLayananName = () => {
        const path = location.pathname;
        return path.substring(1); // Remove the leading slash
    };

    const getTitle = () => {
        switch (location.pathname) {
            case '/bantuan-logistik':
                return 'Pelayanan Bantuan Logistik Korban Bencana';
            case '/santunan-kematian':
                return 'Pelayanan Pemberian Santunan Kematian';
            case '/SKT':
                return 'Pelayanan Surat Keterangan Terdaftar (SKT)';
            case '/SIO':
                return 'Pelayanan Surat Izin Operasional (SIO)';
            case '/pengumpulan-uang-dan-barang':
                return 'Pelayanan Rekomendasi Pengumpulan Uang dan Barang';
            case '/rehabilitasi-lansia':
                return 'Pelayanan Rehabilitasi Sosial Lanjut Usia';
            case '/rumah-singgah':
                return 'Pelayanan Rumah Singgah';
            case '/rehabilitasi-anak-terlantar':
                return 'Pelayanan Rekomendasi Rehabilitasi Sosial Dasar Anak Terlantar';
            case '/penyandang-disabilitas':
                return 'Pelayanan Data dan Pengaduan Penyandang Disabilitas';
            case '/pengangkatan-anak':
                return 'Pelayanan Penertiban Rekomendasi Usulan Calon Pengangkatan Anak';
            case '/PBI-JK':
                return 'Pelayanan Penanganan Pengaduan Penerima Bantuan Iuran-Jaminan Kesehatan (PBI-JK)';
            case '/DTKS':
                return 'Pelayanan Surat Keterangan Data Terpadu Kesejahteraan Sosial';
            default:
                return 'Pelayanan Publik';
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        // Get user data from local storage
        const userData = JSON.parse(localStorage.getItem('user'));

        if (!userData) {
            // Redirect to login page or show an alert
            console.error('User not logged in');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await api.get(`/lay-${getLayananName()}`, {
                    params: { user_nik: userData.NIK },
                    headers: { Authorization: `Bearer ${userData.token}` }
                });

                const fetchedData = response.data.map(item => {
                    let status;
                    if (item.submit_at && !item.valid_at && !item.reject_at && !item.accept_at) {
                        status = 'Menunggu Validasi';
                    } else if (item.submit_at && item.valid_at && !item.reject_at && !item.accept_at) {
                        status = 'Berkas Diproses';
                    } else if (item.submit_at && item.valid_at && item.reject_at && !item.accept_at) {
                        status = 'Ditolak';
                    } else if (item.submit_at && item.valid_at && !item.reject_at && item.accept_at) {
                        status = 'Diterima';
                    } else if (item.submit_at && !item.valid_at && item.reject_at && !item.accept_at) {
                        status = 'Berkas Tidak Valid';
                    } else {
                        status = 'Status tidak valid';
                    }

                    return {
                        id: item.id,
                        nopel: item.no_lay,
                        tanggal: item.submit_at,
                        status: status
                    };
                });

                setDataProses(fetchedData.filter(item => item.status === 'Menunggu Validasi' || item.status === 'Berkas Diproses'));
                setDataSelesai(fetchedData.filter(item => item.status === 'Ditolak' || item.status === 'Diterima' || item.status === 'Berkas Tidak Valid'));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const interval = setInterval(() => {
            fetchData();
        }, 5000); // Polling setiap 5 detik

        return () => clearInterval(interval); // Cleanup saat komponen di-unmount
    }, [location.pathname]);

    const renderForm = () => {
        switch (location.pathname) {
            case '/bantuan-logistik':
                return <SubmitBantuanLogistik />;
            case '/santunan-kematian':
                return <SubmitSantunanKematian />;
            case '/SKT':
                return <SubmitSKT />;
            case '/SIO':
                return <SubmitSIO />;
            case '/pengumpulan-uang-dan-barang':
                return <SubmitPUB />;
            case '/rehabilitasi-lansia':
                return <SubmitRehabilitasiLansia />;
            case '/rumah-singgah':
                return <SubmitRumahSinggah />;
            case '/rehabilitasi-anak-terlantar':
                return <SubmitRehabAnak />;
            case '/penyandang-disabilitas':
                return <SubmitPenyandangDisabilitas />;
            case '/pengangkatan-anak':
                return <SubmitPengangkatanAnak />;
            case '/PBI-JK':
                return <SubmitPBIJK />;
            case '/DTKS':
                return <SubmitDTKS />;
            case '/pengaduan-DSPM':
                return <SubmitPengaduan />;
            default:
                return null;
        }
    };

    return (
        <>
            <CollapsibleExample />
            <div className="bg position-relative">
                <Wallpaper2 />
            </div>
            <div className="container">
                <div className="wrap-prof">
                    <div className="form-profile row rounded border p-4 g-1 g-lg-2 mx-auto" style={{ backgroundColor: 'white' }}>
                        <h4 className='text-center ubuntu-sans-medium mb-3'>{getTitle()}</h4>
                        <div className="col-lg-3 mx-auto">
                            <SidebarLay activeTab={activeTab} handleTabClick={handleTabClick} />
                        </div>
                        <div className="col-lg-9 mx-auto">
                            <div className="row border rounded py-3 mx-1">
                                {activeTab === 'Pengajuan' ? (
                                    <>
                                        <div className="mb-3">
                                            <AlertLayanan desc="Berkas yang diunggah akan diproses saat hari dan jam kerja berlangsung." showAlert />
                                        </div>
                                        {renderForm()}
                                    </>
                                ) : activeTab === 'Proses' ? (
                                    <TableLayanan data={dataProses} layanan={getLayananName()} />
                                ) : (
                                    <TableLayanan data={dataSelesai} layanan={getLayananName()} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Lay;
