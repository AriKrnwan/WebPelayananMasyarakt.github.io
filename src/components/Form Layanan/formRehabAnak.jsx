import AlertLayanan from "../../components/Alert/alertLayanan";
import InputFile from "../../components/Input Field/inputFile";

function FormRehabAnak() {
    return (
        <>
            <div className="row border rounded py-3 mx-1">
                <div className="mb-3">
                    <AlertLayanan/>
                </div>
                <InputFile label='Identitas Kota Bontang' />
                <InputFile label='Surat Keterangan dari Kelurahan/Stakeholder' />
                <InputFile label='Identitas Pelapor' />
                <div className="mt-3">
                    <div className="btn btn-primary w-100">Kirim</div>
                </div>
            </div>
        </>
    )
}

export default FormRehabAnak

