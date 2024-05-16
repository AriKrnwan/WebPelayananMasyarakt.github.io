import AlertLayanan from "../../components/Alert/alertLayanan";
import InputFile from "../../components/Input Field/inputFile";

function FormSantunanKematian() {
    return (
        <>
            <div className="row mx-1 border rounded py-3">
                <div className="mb-3">
                    <AlertLayanan/>
                </div>
                <InputFile label='Surat Permohonan Santunan Kematian' moreInfo='yang dibuat oleh pemohon' />
                <InputFile label='Surat Keterangan Ahli Waris' moreInfo='di tanda tangani oleh ahli waris dengan materai Rp. 10.000,- serta diketahui oleh Lurah dan Ketua RT setempat (asli) dan difotocopy serta dilegalisir oleh pihak kelurahan sebanyak 1 lembar' />
                <InputFile label='Surat Keterangan Tidak Mampu (SKTM)' moreInfo='atas nama almarhum yang ditanda tangani oleh oleh lurah setempat dan difotocopy 1 lembar' />
                <InputFile label='Foto Copy Akta Kematian' />
                <InputFile label='Foto Copy Kartu Keluarga (KK)' moreInfo='KK ahli waris dan almarhum/almarhumah' />
                <InputFile label='Foto Copy KTP' moreInfo='KTP ahli waris dan almarhum/almarhumah' />
                <InputFile label='Foto Copy Rekening' moreInfo='atas nama ahli waris' />
                <div className="mt-3">
                    <div className="btn btn-primary w-100">Kirim</div>
                </div>
            </div>
        </>
    )
}

export default FormSantunanKematian