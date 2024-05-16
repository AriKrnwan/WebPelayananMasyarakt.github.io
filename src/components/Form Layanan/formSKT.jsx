import AlertLayanan from "../../components/Alert/alertLayanan";
import InputFile from "../../components/Input Field/inputFile";

function FormSKT() {
    return (
        <>
            <div className="row border rounded py-3 mx-1">
                <div className="mb-3">
                    <AlertLayanan/>
                </div>
                <InputFile label='Surat Permohonan Pengajuan Pendaftaran LKS' moreInfo='Lembaga Kesejahteraan Sosial (LKS)' />
                <InputFile label='Akta Notaris Pendirian' moreInfo='yang disahkan oleh Menteri Hukum dan HAM' />
                <InputFile label='Anggaran Dasar dan Anggaran Rumah Tangga' />
                <InputFile label='Struktur Organisasi Lembaga' />
                <InputFile label='Surat Keteranagan Domisili' moreInfo='dari Kelurahan Setempat' />
                <InputFile label='Biodata Pengurus dan Anggota' moreInfo='nama, alamat, dan telepon' />
                <InputFile label='Program Kerja untuk pelaksanaan kegiatan' />
                <InputFile label='NPWP Yayasan/Lembaga/Organisasi' />
                <div className="mt-3">
                    <div className="btn btn-primary w-100">Kirim</div>
                </div>
            </div>
        </>
    )
}

export default FormSKT

