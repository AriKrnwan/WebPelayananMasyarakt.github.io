import AlertLayanan from "../../components/Alert/alertLayanan";
import InputFile from "../../components/Input Field/inputFile";

function FormPenyandangDisabilitas() {
    return (
        <>
            <div className="row border rounded py-3 mx-1">
                <div className="mb-3">
                    <AlertLayanan/>
                </div>
                <InputFile label='Akta Kelahiran/Kartu Identitas Anak(KIA)/KTP' />
                <InputFile label='Kartu Keluarga (KK)' />
                <InputFile label='BPJS KIS' />
                <div className="mt-3">
                    <div className="btn btn-primary w-100">Kirim</div>
                </div>
            </div>
        </>
    )
}

export default FormPenyandangDisabilitas

