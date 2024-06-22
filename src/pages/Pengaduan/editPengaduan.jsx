import CollapsibleExample from '../../components/Navbar/navbar.jsx';
import Wallpaper2 from '../../components/Wallpaper/wallpaper2.jsx';
import Footer from '../../components/Footer/footer.jsx';
import AlertLayanan from '../../components/Alert/alertLayanan.jsx';
import FormPengaduan from '../../components/Form Layanan/formPengaduan.jsx';
// import { useEffect, useState } from 'react';
// import FormPengaduan from '../../components/Form Layanan/formPengaduan.jsx';

function EditPengaduan() {
    // const [data, setData] = useState(null);

    // useEffect(() => {
    //     // Ambil data dari localStorage
    //     const selectedData = localStorage.getItem('selectedPengajuan');
    //     console.log('Data yang diambil dari localStorage:', selectedData);
    //     console.log(selectedData.ktp);
    //     if (selectedData) {
    //         setData(JSON.parse(selectedData));
    //     }
    // }, []);

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
                            <div className="mb-3">
                                <AlertLayanan desc="Berkas yang diunggah akan diproses saat hari dan jam kerja berlangsung." showAlert />
                            </div>
                            <FormPengaduan />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default EditPengaduan;
