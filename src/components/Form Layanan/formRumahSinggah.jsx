import AlertLayanan from "../../components/Alert/alertLayanan";
import InputFile from "../../components/Input Field/inputFile";

function FormRumahSinggah() {
    return (
        <>
            <div className="row border rounded py-3 mx-1">
                <div className="mb-3">
                    <AlertLayanan/>
                </div>
                <InputFile label='Surat Rujukan dari Instansi Terkait' />
                <InputFile label='Identitas PMKS/PPKS' moreInfo='Penyandang Masalah Kesejahteraan Sosial (PMKS)/Pemerlu Pelayanan Kesejagteraan Sosial (PPKS)' />
                <InputFile label='Identitas Pelapor' />
                <div className="mt-3">
                    <div className="btn btn-primary w-100">Kirim</div>
                </div>
            </div>
        </>
    )
}

export default FormRumahSinggah

