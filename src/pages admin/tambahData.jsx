import SidebarAdmin from "../components admin/sidebar";
import Topbar from "../components admin/topbar";
import FormAdminAngkatAnak from "./FormLayanan/formAngkatAnak";
import FormAdminBantuanLogistik from "./FormLayanan/formBantuanLogistik";
import FormAdminDTKS from "./FormLayanan/formDTKS";
import FormAdminPBIJK from "./FormLayanan/formPBIJK";
import FormAdminPUB from "./FormLayanan/formPUB";
import FormAdminDisabilitas from "./FormLayanan/formPenyandangDisabilitas";
import FormAdminRehabAnak from "./FormLayanan/formRehabAnak";
import FormAdminRehabLansia from "./FormLayanan/formRehabLansia";
import FormAdminRumahSinggah from "./FormLayanan/formRumahSinggah";
import FormAdminSIO from "./FormLayanan/formSIO";
import FormAdminSKT from "./FormLayanan/formSKT";
import FormAdminSantunanKematian from "./FormLayanan/formSantunanKematian"; // Import form Santunan Kematian
import { useParams } from "react-router-dom";

function TambahData() {
    const { layananType } = useParams();

    // Fungsi untuk merender form berdasarkan layananType
    const renderForm = () => {
        switch (layananType) {
            case "bantuan-logistik":
                return <FormAdminBantuanLogistik isTambahData={true} />;
            case "santunan-kematian":
                return <FormAdminSantunanKematian />;
            case "SKT":
                return <FormAdminSKT />;
            case "SIO":
                return <FormAdminSIO />;
            case "pengumpulan-uang-dan-barang":
                return <FormAdminPUB />;
            case "rumah-singgah":
                return <FormAdminRumahSinggah />;
            case "rehabilitasi-lansia":
                return <FormAdminRehabLansia />;
            case "rehabilitasi-anak-terlantar":
                return <FormAdminRehabAnak />;
            case "penyandang-disabilitas":
                return <FormAdminDisabilitas />;
            case "pengangkatan-anak":
                return <FormAdminAngkatAnak />;
            case "DTKS":
                return <FormAdminDTKS />;
            case "PBI-JK":
                return <FormAdminPBIJK />;
            default:
                return <div>Form tidak ditemukan</div>;
        }
    };

    return(
        <>
            <div style={{backgroundColor: '#f5f5f5'}}>
                <div className="row m-0">
                    <div className="col-2 p-0">
                        <SidebarAdmin />
                    </div>
                    <div className="col-10 p-0 main-content min-vh-100">
                        <Topbar />
                        <div className="bg-white m-3 rounded border p-4">
                            <div>
                                <h5 className="ubuntu-sans-medium">
                                    Tambah Data Layanan {layananType.replace(/-/g, ' ')}
                                </h5>
                            </div>
                            <div className="row">
                                {renderForm()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TambahData;
