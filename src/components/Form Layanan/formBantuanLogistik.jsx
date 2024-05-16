import AlertLayanan from "../../components/Alert/alertLayanan";
import InputFile from "../../components/Input Field/inputFile";
import InputNumber from "../../components/Input Field/inputNumber";

function FormBantuanLogistik() {
    return (
        <>
            <div className="row border rounded py-3 mx-1">
                <div className="mb-3">
                    <AlertLayanan/>
                </div>
                <InputFile label='Surat Permohonan Bantuan Logistik' moreInfo='dari kelurahan' />
                <InputFile label='Dokumentasi Kejadian Bencana' />
                <InputNumber label='Jumlah Terdampak' placeholder="Masukkan jumlah" />
                <div className="mt-3">
                    <div className="btn btn-primary w-100">Kirim</div>
                </div>
            </div>
        </>
    )
}

export default FormBantuanLogistik

