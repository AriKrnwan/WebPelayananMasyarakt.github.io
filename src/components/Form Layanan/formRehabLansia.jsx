import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';

function FormRehabLansia({ disabled }) {
    return (
        <>
            <InputFile label='Fotocopy KTP' disabled={disabled} />
            <InputFile label='Fotocopy KK' disabled={disabled} />
            <div className="mt-3">
                <div className="btn btn-primary w-100">Kirim</div>
            </div>
        </>
    )
}

FormRehabLansia.propTypes = {
    disabled: PropTypes.bool,
    showAlert: PropTypes.bool
};

FormRehabLansia.defaultProps = {
    disabled: false,
    showAlert: true
};

export default FormRehabLansia

