import { useParams } from 'react-router-dom';
import FormBantuanLogistik from '../../components/Form Layanan/formBantuanLogistik.jsx';
import FormSantunanKematian from '../../components/Form Layanan/formSantunanKematian.jsx';
import CollapsibleExample from '../../components/Navbar/navbar.jsx';
import Wallpaper2 from '../../components/Wallpaper/wallpaper2.jsx';
import Footer from '../../components/Footer/footer.jsx';
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
import AlertLayanan from '../../components/Alert/alertLayanan.jsx';
import FormPengaduan from '../../components/Form Layanan/formPengaduan.jsx';

function EditPengajuan() {
    const { layanan } = useParams();

    const renderForm = () => {
        switch (layanan) {
            case 'bantuan-logistik':
                return <FormBantuanLogistik />;
            case 'santunan-kematian':
                return <FormSantunanKematian />;
            case 'SKT':
                return <FormSKT />;
            case 'SIO':
                return <FormSIO />;
            case 'pengumpulan-uang-dan-barang':
                return <FormPUB />;
            case 'rehabilitasi-lansia':
                return <FormRehabLansia />;
            case 'rumah-singgah':
                return <FormRumahSinggah />;
            case 'rehabilitasi-anak-terlantar':
                return <FormRehabAnak />;
            case 'penyandang-disabilitas':
                return <FormPenyandangDisabilitas />;
            case 'pengangkatan-anak':
                return <FormPengangkatanAnak />;
            case 'PBI-JK':
                return <FormPBIJK />;
            case 'DTKS':
                return <FormDTKS />;
            case 'pengaduan':
                return <FormPengaduan />;
            default:
                return null;
        }
    };

    const getTitle = () => {
        switch (layanan) {
            case 'bantuan-logistik':
                return 'Pelayanan Bantuan Logistik Korban Bencana';
            case '/detail-pengajuan/santunan-kematian':
                return 'Pelayanan Pemberian Santunan Kematian';
            case '/detail-pengajuan/SKT':
                return 'Pelayanan Surat Keterangan Terdaftar (SKT)';
            case '/detail-pengajuan/SIO':
                return 'Pelayanan Surat Izin Operasional (SIO)';
            case '/detail-pengajuan/pengumpulan-uang-dan-barang':
                return 'Pelayanan Rekomendasi Pengumpulan Uang dan Barang';
            case '/detail-pengajuan/rehabilitasi-lansia':
                return 'Pelayanan Rehabilitasi Sosial Lanjut Usia';
            case '/detail-pengajuan/rumah-singgah':
                return 'Pelayanan Rumah Singgah';
            case '/detail-pengajuan/rehabilitasi-anak-terlantar':
                return 'Pelayanan Rekomendasi Rehabilitasi Sosial Dasar Anak Terlantar';
            case '/detail-pengajuan/penyandang-disabilitas':
                return 'Pelayanan Data dan Pengaduan Penyandang Disabilitas';
            case '/detail-pengajuan/pengangkatan-anak':
                return 'Pelayanan Penertiban Rekomendasi Usulan Calon Pengangkatan Anak';
            case '/detail-pengajuan/PBI-JK':
                return 'Pelayanan Penanganan Pengaduan Penerima Bantuan Iuran-Jaminan Kesehatan (PBI-JK)';
            case '/detail-pengajuan/DTKS':
                return 'Pelayanan Surat Keterangan Data Terpadu Kesejahteraan Sosial';
            default:
                return 'Pelayanan Publik';
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
                    <div className="form-profile row rounded border p-4 g-1 g-lg-2" style={{ backgroundColor: 'white' }}>
                        <h4 className='text-center ubuntu-sans-medium mb-3'>{getTitle()}</h4>
                        <div className="row border rounded py-4 mx-auto">
                            <div className="mb-3">
                                <AlertLayanan desc="Berkas yang diunggah akan diproses saat hari dan jam kerja berlangsung." showAlert />
                            </div>
                            {renderForm()}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default EditPengajuan;
