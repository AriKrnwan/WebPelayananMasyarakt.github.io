import SidebarAdmin from "../components admin/sidebar";
import Topbar from "../components admin/topbar";
import DetailBantuanLogistik from "./DetailLayanan/detailBantuanLogistik";
import DetailPUB from "./DetailLayanan/detailPUB";
import DetailRumahSinggah from "./DetailLayanan/detailRumahSinggah";
import DetailSIO from "./DetailLayanan/detailSIO";
import DetailSKT from "./DetailLayanan/detailSKT";
import DetailSantunanKematian from "./DetailLayanan/detailSantunanKematian";
import { useParams } from "react-router-dom";
import DetailRehabLansia from "./DetailLayanan/formRehabLansia";
import DetailRehabAnak from "./DetailLayanan/detailRehabAnak";
import DetailPenyandangDisabilitas from "./DetailLayanan/detailPenyandangDisabilitas";
import DetailAngkatAnak from "./DetailLayanan/detailAngkatAnak";
import DetailDTKS from "./DetailLayanan/detailDTKS";
import DetailPBIJK from "./DetailLayanan/detailPBIJK";

function DetailData() {
    const { layananType } = useParams();

    // Fungsi untuk merender form berdasarkan layananType
    const renderForm = () => {
        switch (layananType) {
            case "bantuan-logistik":
                return <DetailBantuanLogistik />;
            case "santunan-kematian":
                return <DetailSantunanKematian />;
            case "SKT":
                return <DetailSKT />;
            case "SIO":
                return <DetailSIO />;
            case "pengumpulan-uang-dan-barang":
                return <DetailPUB />;
            case "rumah-singgah":
                return <DetailRumahSinggah />;
            case "rehabilitasi-lansia":
                return <DetailRehabLansia />;
            case "rehabilitasi-anak-terlantar":
                return <DetailRehabAnak />;
            case "penyandang-disabilitas":
                return <DetailPenyandangDisabilitas />;
            case "pengangkatan-anak":
                return <DetailAngkatAnak />;
            case "DTKS":
                return <DetailDTKS />;
            case "PBI-JK":
                return <DetailPBIJK />;
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

export default DetailData;
