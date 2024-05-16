import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from "../../components/Footer/footer";
import CollapsibleExample from "../../components/Navbar/navbar";
import Wallpaper2 from "../../components/Wallpaper/wallpaper2";
import '../../components/Form Layanan/formLayanan.css';
import TableLayanan from "../../components/Table Layanan/tableLayanan.jsx";
import SidebarLay from "../../components/Sidebar/sidebarLay.jsx";
import FormBantuanLogistik from '../../components/Form Layanan/formBantuanLogistik.jsx';
import FormSantunanKematian from '../../components/Form Layanan/formSantunanKematian.jsx';
import FormSKT from '../../components/Form Layanan/formSKT.jsx';
import FormSIO from '../../components/Form Layanan/formSIO.jsx';
import FormPUB from '../../components/Form Layanan/formPUB.jsx';
import FormRehabLansia from '../../components/Form Layanan/formRehabLansia.jsx';
import FormRumahSinggah from '../../components/Form Layanan/formRumahSinggah.jsx';
import FormRehabAnak from '../../components/Form Layanan/formRehabAnak.jsx';
import FormPenyandangDisabilitas from '../../components/Form Layanan/formPenyandangDisabilitas.jsx';
import FormPengangkatanAnak from '../../components/Form Layanan/formPengakatanAnak.jsx';

function Lay() {
    const [activeTab, setActiveTab] = useState('Pengajuan');
    const location = useLocation();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const renderForm = () => {
        switch (location.pathname) {
            case '/bantuan-logistik':
                return <FormBantuanLogistik />;
            case '/santunan-kematian':
                return <FormSantunanKematian />;
            case '/SKT':
                return <FormSKT />;
            case '/SIO':
                return <FormSIO />;
            case '/pengumpulan-uang-dan-barang':
                return <FormPUB />;
            case '/rehabilitasi-lansia':
                return <FormRehabLansia />;
            case '/rumah-singgah':
                return <FormRumahSinggah />;
            case '/rehabilitasi-anak-terlantar':
                return <FormRehabAnak />;
            case '/penyandang-disabilitas':
                return <FormPenyandangDisabilitas />;
            case '/pengangkatan-anak':
                return <FormPengangkatanAnak />;
            default:
                return null;
        }
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
            default:
                return 'Pelayanan Publik';
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const getDummyData = () => {
        switch (location.pathname) {
            case '/bantuan-logistik':
                return [
                    { id: 1, tanggal: '2024-05-12', status: 'Selesai' },
                    { id: 2, tanggal: '2024-05-13', status: 'Proses' },
                    { id: 3, tanggal: '2024-05-14', status: 'Selesai' }
                ];
            case '/santunan-kematian':
                return [
                    { id: 1, tanggal: '2024-05-12', status: 'Proses' },
                    { id: 2, tanggal: '2024-05-13', status: 'Proses' },
                    { id: 3, tanggal: '2024-05-14', status: 'Selesai' }
                ];
            // Tambahkan kasus untuk path lainnya dan data dummy yang sesuai di sini
            default:
                return [];
        }
    };
    
    const dummyData = getDummyData();

    return (
        <>
            <CollapsibleExample/>
            <div className="bg position-relative">
                <Wallpaper2/>
            </div>
            <div className="container">
                <div className="wrap-prof">
                    <div className="form-profile row rounded border p-4 g-1 g-lg-2 mx-auto" style={{backgroundColor: 'white'}}>
                        <h4 className='text-center ubuntu-sans-medium mb-3'>{getTitle()}</h4>
                        <div className="col-lg-3 mx-auto">
                            <SidebarLay activeTab={activeTab} handleTabClick={handleTabClick} />
                        </div>
                        <div className="col-lg-9 mx-auto">
                            {activeTab === 'Pengajuan' ? (
                                renderForm()
                            ) : (
                                <TableLayanan data={dummyData} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Lay;
