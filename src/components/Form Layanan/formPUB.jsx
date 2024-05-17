import AlertLayanan from "../../components/Alert/alertLayanan";
import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';

function FormPUB({ disabled, showAlert }) {
    return (
        <>
            <div className="mb-3">
                <AlertLayanan showAlert={showAlert} />
            </div>
            <InputFile label='Surat Keterangan Terdaftar bagi Ormas' moreInfo='dari Kementrian Hukum dan HAM' disabled={disabled} />
            <InputFile label='Surat Keterangan Terdaftar bagi LKS' moreInfo='dari Dinas Sosial' disabled={disabled} />
            <InputFile label='NPWP Lembaga' disabled={disabled} />
            <InputFile label='Bukti Setor PBB/Sewa Tempat' disabled={disabled} />
            <InputFile label='Nomor Rekening' moreInfo='Tempat penampungan dana' disabled={disabled} />
            <InputFile label='KTP Direktur/Ketua' disabled={disabled} />
            <InputFile label='Surat Keabsahan Legalitas' moreInfo='ditandatangani ketua' disabled={disabled} />
            <InputFile label='Surat Penyataan Bermaterai' moreInfo='yang menyatakan PUB tidak disalurkan untuk kegiatan radikalisme terorisme, dan kegiatan yang bertentang dengan hukum' disabled={disabled} />
            <div className="mt-3">
                <div className="btn btn-primary w-100">Kirim</div>
            </div>
        </>
    )
}

FormPUB.propTypes = {
    disabled: PropTypes.bool,
    showAlert: PropTypes.bool
};

FormPUB.defaultProps = {
    disabled: false,
    showAlert: true
};

export default FormPUB

