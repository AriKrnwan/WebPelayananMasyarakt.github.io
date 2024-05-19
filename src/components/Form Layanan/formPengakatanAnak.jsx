import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';

function FormPengangkatanAnak({ disabled }) {
    return (
        <>
            <InputFile label='Surat Keterangan Fisik dan Kejiwaan' disabled={disabled} />
            <InputFile label='Surat Keterangan Bebas Narkoba' disabled={disabled} />
            <InputFile label='SKCK' moreInfo='Bukti berkelakuan baik' disabled={disabled} />
            <InputFile label='Surat Keterangan Penghasilan' disabled={disabled} />
            <InputFile label='Persetujuan atau Ijin Tertulis' moreInfo='dari keluarga CAA' disabled={disabled} />
            <InputFile label='KK' disabled={disabled} />
            <InputFile label='KTP' disabled={disabled} />
            <InputFile label='Akte Kelahiran CAA' disabled={disabled} />
            <InputFile label='Akte Nikah' disabled={disabled} />
            <InputFile label='Foto Ukuran 4x6' disabled={disabled} />
            <InputFile label='Form Pernyataan' moreInfo='di atas materai 10.000 adanya laporan sosial dari pekerja sosial' disabled={disabled} />
            <div className="mt-3">
                <div className="btn btn-primary w-100">Kirim</div>
            </div>
        </>
    )
}

FormPengangkatanAnak.propTypes = {
    disabled: PropTypes.bool,
    showAlert: PropTypes.bool
};

FormPengangkatanAnak.defaultProps = {
    disabled: false,
    showAlert: true
};

export default FormPengangkatanAnak

