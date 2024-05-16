import AlertLayanan from "../../components/Alert/alertLayanan";
import InputFile from "../../components/Input Field/inputFile";

function FormPUB() {
    return (
        <>
            <div className="row border rounded py-3 mx-1">
                <div className="mb-3">
                    <AlertLayanan/>
                </div>
                <InputFile label='Surat Keterangan Terdaftar bagi Ormas' moreInfo='dari Kementrian Hukum dan HAM' />
                <InputFile label='Surat Keterangan Terdaftar bagi LKS' moreInfo='dari Dinas Sosial' />
                <InputFile label='NPWP Lembaga' />
                <InputFile label='Bukti Setor PBB/Sewa Tempat' />
                <InputFile label='Nomor Rekening' moreInfo='Tempat penampungan dana' />
                <InputFile label='KTP Direktur/Ketua' />
                <InputFile label='Surat Keabsahan Legalitas' moreInfo='ditandatangani ketua' />
                <InputFile label='Surat Penyataan Bermaterai' moreInfo='yang menyatakan PUB tidak disalurkan untuk kegiatan radikalisme, terorisme, dan kegiatan yang bertentang dengan hukum' />
                <div className="mt-3">
                    <div className="btn btn-primary w-100">Kirim</div>
                </div>
            </div>
        </>
    )
}

export default FormPUB

