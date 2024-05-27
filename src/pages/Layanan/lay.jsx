import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from "../../components/Footer/footer";
import CollapsibleExample from "../../components/Navbar/navbar";
import Wallpaper2 from "../../components/Wallpaper/wallpaper2";
import '../../components/Form Layanan/formLayanan.css';
import TableLayanan from "../../components/Table Layanan/tableLayanan.jsx";
import SidebarLay from "../../components/Sidebar/sidebarLay.jsx";
import FormSKT from '../../components/Form Layanan/formSKT.jsx';
import FormSIO from '../../components/Form Layanan/formSIO.jsx';
import FormPUB from '../../components/Form Layanan/formPUB.jsx';
import FormRehabLansia from '../../components/Form Layanan/formRehabLansia.jsx';
import FormRumahSinggah from '../../components/Form Layanan/formRumahSinggah.jsx';
import FormRehabAnak from '../../components/Form Layanan/formRehabAnak.jsx';
import FormPenyandangDisabilitas from '../../components/Form Layanan/formPenyandangDisabilitas.jsx';
import FormPengangkatanAnak from '../../components/Form Layanan/formPengakatanAnak.jsx';
import FormPBIJK from '../../components/Form Layanan/formPBIJK.jsx';
import FormDTKS from '../../components/Form Layanan/formDTKS.jsx';
import FormPengaduan from '../../components/Form Layanan/formPengaduan.jsx';
import AlertLayanan from '../../components/Alert/alertLayanan.jsx';
import SubmitBantuanLogistik from '../../components/Form Submit/submitBantuanLogistik.jsx';
import api from '../../components/api.jsx';
import SubmitSantunanKematian from '../../components/Form Submit/submitSantunanKematian.jsx';

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

    const renderForm = () => {
        switch (location.pathname) {
            case '/bantuan-logistik':
                return <SubmitBantuanLogistik />;
            case '/santunan-kematian':
                return <SubmitSantunanKematian />;
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
            case '/PBI-JK':
                return <FormPBIJK />;
            case '/DTKS':
                return <FormDTKS />;
            case '/pengaduan-DSPM':
                return <FormPengaduan />;
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

        const fetchData = (endpoint) => {
            api.get(endpoint, {
                params: { user_id: userData.id },
                headers: { Authorization: `Bearer ${userData.token}` }
            })
            .then(response => {
                console.log('Data dari backend:', response.data);
                const fetchedData = response.data.map(item => {
                    // Tentukan status berdasarkan nilai kolom-kolom di database
                    let status;
                    if (item.submit_at && !item.valid_at && !item.reject_at && !item.accept_at) {
                        status = 'Menunggu Validasi';
                    } else if (item.submit_at && item.valid_at && !item.reject_at && !item.accept_at) {
                        status = 'Berkas Diproses';
                    } else if (item.submit_at && item.valid_at && item.reject_at && !item.accept_at) {
                        status = 'Ditolak';
                    } else if (item.submit_at && item.valid_at && !item.reject_at && item.accept_at) {
                        status = 'Diterima';
                    } else if (item.submit_at && !item.valid_at && item.reject_at && !item.accept_at){
                        status = 'Berkas Tidak Valid'; // Handle jika kondisi tidak sesuai
                    } else {
                        status = 'Status tidak valid'; // Handle jika kondisi tidak sesuai
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
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        };

        if (location.pathname === '/bantuan-logistik') {
            fetchData('/lay-bantuan-logistik');
        } else if (location.pathname === '/santunan-kematian') {
            fetchData('/lay-santunan-kematian');
        }
    }, [location.pathname]);

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
