import AlertLayanan from "../../components/Alert/alertLayanan";
import InputFile from "../../components/Input Field/inputFile";

function FormPengangkatanAnak() {
    return (
        <>
            <div className="row border rounded py-3 mx-1">
                <div className="mb-3">
                    <AlertLayanan/>
                </div>
                <InputFile label='Surat Keterangan Fisik dan Kejiwaan' />
                <InputFile label='Surat Keterangan Bebas Narkoba' />
                <InputFile label='SKCK' moreInfo='Bukti berkelakuan baik' />
                <InputFile label='Surat Keterangan Penghasilan' />
                <InputFile label='Persetujuan atau Ijin Tertulis' moreInfo='dari keluarga CAA' />
                <InputFile label='KK' />
                <InputFile label='KTP' />
                <InputFile label='Akte Kelahiran CAA' />
                <InputFile label='Akte Nikah' />
                <InputFile label='Foto Ukuran 4x6' />
                <InputFile label='Form Pernyataan' moreInfo='di atas materai 10.000 adanya laporan sosial dari pekerja sosial' />
                <div className="mt-3">
                    <div className="btn btn-primary w-100">Kirim</div>
                </div>
            </div>
        </>
    )
}

export default FormPengangkatanAnak

