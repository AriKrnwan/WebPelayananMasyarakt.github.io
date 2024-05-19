import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';

function FormDTKS({ disabled }) {
    return (
        <>
            <InputFile label='KTP Domisili Bontang' disabled={disabled} />
            <InputFile label='KK Domisili Bontang' disabled={disabled} />
            <div className="mt-3">
                <div className="btn btn-primary w-100">Kirim</div>
            </div>
        </>
    )
}

FormDTKS.propTypes = {
    disabled: PropTypes.bool,
    showAlert: PropTypes.bool
};

FormDTKS.defaultProps = {
    disabled: false,
    showAlert: true
};

export default FormDTKS