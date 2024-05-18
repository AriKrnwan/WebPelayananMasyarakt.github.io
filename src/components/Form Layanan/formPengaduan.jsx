import AlertLayanan from "../../components/Alert/alertLayanan";
import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';
import TextArea from "../Input Field/textArea";

function FormPengaduan({ disabled, showAlert }) {
    return (
        <>
            <div className="mb-3">
                <AlertLayanan showAlert={showAlert} />
            </div>
            <TextArea label="Permasalahan yang Diadukan" placeholder="Tulis Permasalahan" disabled={disabled} />
            <TextArea label="Harapan" placeholder="Tulis Harapan" disabled={disabled} />
            <InputFile label='Upload foto/gambar' disabled={disabled} />
            {!disabled && (
                <div className="mt-3">
                    <div className="btn btn-primary w-100">Kirim</div>
                </div>
            )}
        </>
    );
}

FormPengaduan.propTypes = {
    disabled: PropTypes.bool,
    showAlert: PropTypes.bool
};

FormPengaduan.defaultProps = {
    disabled: false,
    showAlert: true
};

export default FormPengaduan;
