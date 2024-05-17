import AlertLayanan from "../../components/Alert/alertLayanan";
import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';

function FormRehabAnak({ disabled, showAlert }) {
    return (
        <>
            <div className="mb-3">
                <AlertLayanan showAlert={showAlert} />
            </div>
            <InputFile label='Identitas Kota Bontang' disabled={disabled} />
            <InputFile label='Surat Keterangan dari Kelurahan/Stakeholder' disabled={disabled} />
            <InputFile label='Identitas Pelapor' disabled={disabled} />
            <div className="mt-3">
                <div className="btn btn-primary w-100">Kirim</div>
            </div>
        </>
    )
}

FormRehabAnak.propTypes = {
    disabled: PropTypes.bool,
    showAlert: PropTypes.bool
};

FormRehabAnak.defaultProps = {
    disabled: false,
    showAlert: true
};

export default FormRehabAnak

