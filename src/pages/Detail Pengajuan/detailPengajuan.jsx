import { useParams } from 'react-router-dom';
import FormBantuanLogistik from '../../components/Form Layanan/formBantuanLogistik';
import FormSantunanKematian from '../../components/Form Layanan/formSantunanKematian';
import CollapsibleExample from '../../components/Navbar/navbar';
import Wallpaper2 from '../../components/Wallpaper/wallpaper2';
import InputField from '../../components/Input Field/inputField';
import TextArea from '../../components/Input Field/textArea';
import Footer from '../../components/Footer/footer';
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

function DetailPengajuan() {
    const { layanan } = useParams();

    const renderForm = () => {
        switch (layanan) {
            case 'bantuan-logistik':
                return <FormBantuanLogistik disabled showAlert={false} showButton={false} />;
            case 'santunan-kematian':
                return <FormSantunanKematian disabled showAlert={false} showButton={false} />;
            case '/SKT':
                return <FormSKT disabled showAlert={false} showButton={false} />;
            case '/SIO':
                return <FormSIO disabled showAlert={false} showButton={false} />;
            case '/pengumpulan-uang-dan-barang':
                return <FormPUB disabled showAlert={false} showButton={false} />;
            case '/rehabilitasi-lansia':
                return <FormRehabLansia disabled showAlert={false} showButton={false} />;
            case '/rumah-singgah':
                return <FormRumahSinggah disabled showAlert={false} showButton={false} />;
            case '/rehabilitasi-anak-terlantar':
                return <FormRehabAnak disabled showAlert={false} showButton={false} />;
            case '/penyandang-disabilitas':
                return <FormPenyandangDisabilitas disabled showAlert={false} showButton={false} />;
            case '/pengangkatan-anak':
                return <FormPengangkatanAnak disabled showAlert={false} showButton={false} />;
            case '/PBI-JK':
                return <FormPBIJK disabled showAlert={false} showButton={false} />;
            case '/DTKS':
                return <FormDTKS disabled showAlert={false} showButton={false} />;
            default:
                return null;
        }
    };

    const getTitle = () => {
        switch (location.pathname) {
            case '/detail-pengajuan/bantuan-logistik':
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
                            <h6>Data Diri</h6>
                            <InputField label='NIK' disabled />
                            <InputField label='Nama' disabled />
                            <TextArea label='Alamat' disabled />
                            <InputField label='Email' disabled />
                            <InputField label='No Telepon' disabled />
                            <h6 className='mt-4'>Data Berkas</h6>
                            {renderForm()}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DetailPengajuan;
