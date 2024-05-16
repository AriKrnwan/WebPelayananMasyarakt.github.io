import { useParams } from 'react-router-dom';
import FormBantuanLogistik from '../../components/Form Layanan/formBantuanLogistik';
import FormSantunanKematian from '../../components/Form Layanan/formSantunanKematian';
import CollapsibleExample from '../../components/Navbar/navbar';
import Wallpaper2 from '../../components/Wallpaper/wallpaper2';

function DetailPengajuan() {
    const { layanan } = useParams();

    const renderForm = () => {
        switch (layanan) {
            case 'bantuan-logistik':
                return <FormBantuanLogistik disabled showAlert={false} showButton={false} />;
            case 'santunan-kematian':
                return <FormSantunanKematian disabled showAlert={false} />;
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
                    <div className="form-profile row rounded border p-4 g-1 g-lg-2" style={{ backgroundColor: 'white' }}>
                        {renderForm()}
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailPengajuan;
