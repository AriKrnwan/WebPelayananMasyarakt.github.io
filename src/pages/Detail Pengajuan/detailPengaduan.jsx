import CollapsibleExample from '../../components/Navbar/navbar';
import Wallpaper2 from '../../components/Wallpaper/wallpaper2';
import InputField from '../../components/Input Field/inputField';
import TextArea from '../../components/Input Field/textArea';
import Footer from '../../components/Footer/footer';
import FormPengaduan from '../../components/Form Layanan/formPengaduan';
import { useEffect } from 'react';

function DetailPengaduan() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <CollapsibleExample />
            <div className="bg position-relative">
                <Wallpaper2 />
            </div>
            <div className="container">
                <div className="wrap-prof">
                    <div className="form-profile row rounded border p-4 g-1 g-lg-2" style={{ backgroundColor: 'white' }}>
                        <h4 className='text-center ubuntu-sans-medium mb-3'>Pengaduan DSPM</h4>
                        <div className="row border rounded py-4 mx-auto">
                            <h6>Data Diri</h6>
                            <InputField label='NIK' disabled />
                            <InputField label='Nama' disabled />
                            <TextArea label='Alamat' disabled />
                            <InputField label='Email' disabled />
                            <InputField label='No Telepon' disabled />
                            <h6 className='mt-4 mb-0'>Data Berkas</h6>
                            <FormPengaduan showAlert={false} showButton={false} disabled />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DetailPengaduan;
