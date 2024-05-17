import AlertLayanan from "../../components/Alert/alertLayanan";
import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';

function FormSIO({ disabled, showAlert }) {
    return (
        <>
            <div className="mb-3">
                <AlertLayanan showAlert={showAlert} />
            </div>
            <InputFile label='Surat Permohonan Pengajuan Pendaftaran LKS' moreInfo='Lembaga Kesejahteraan Sosial (LKS)' disabled={disabled} />
            <InputFile label='Akta Notaris Pendirian' moreInfo='yang disahkan oleh Menteri Hukum dan HAM' disabled={disabled} />
            <InputFile label='Anggaran Dasar dan Anggaran Rumah Tangga' disabled={disabled} />
            <InputFile label='Struktur Organisasi Lembaga' disabled={disabled} />
            <InputFile label='Surat Keteranagan Domisili' moreInfo='dari Kelurahan Setempat' disabled={disabled} />
            <InputFile label='Biodata Pengurus dan Anggota' moreInfo='nama, alamat, dan telepon' disabled={disabled} />
            <InputFile label='Program Kerja untuk pelaksanaan kegiatan' disabled={disabled} />
            <InputFile label='NPWP Yayasan/Lembaga/Organisasi' disabled={disabled} />
            <InputFile label='Surat Keterangan Terdaftar' disabled={disabled} />
            <div className="mt-3">
                <div className="btn btn-primary w-100">Kirim</div>
            </div>
        </>
    )
}

FormSIO.propTypes = {
    disabled: PropTypes.bool,
    showAlert: PropTypes.bool
};

FormSIO.defaultProps = {
    disabled: false,
    showAlert: true
};

export default FormSIO

