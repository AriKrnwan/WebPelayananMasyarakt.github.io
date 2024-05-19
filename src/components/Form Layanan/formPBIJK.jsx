import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';

function FormPBIJK({ disabled }) {
    return (
        <>
            <InputFile label='KTP/KK Domisili Bontang' disabled={disabled} />
            <InputFile label='Surat Keterangan Rawat Inap' disabled={disabled} />
            <div className="mt-3">
                <div className="btn btn-primary w-100">Kirim</div>
            </div>
        </>
    )
}

FormPBIJK.propTypes = {
    disabled: PropTypes.bool,
    showAlert: PropTypes.bool
};

FormPBIJK.defaultProps = {
    disabled: false,
    showAlert: true
};

export default FormPBIJK

