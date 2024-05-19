import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';

function FormPenyandangDisabilitas({ disabled }) {
    return (
        <>
            <InputFile label='Akta Kelahiran/Kartu Identitas Anak(KIA)/KTP' disabled={disabled} />
            <InputFile label='Kartu Keluarga (KK)' disabled={disabled} />
            <InputFile label='BPJS KIS' disabled={disabled} />
            <div className="mt-3">
                <div className="btn btn-primary w-100">Kirim</div>
            </div>
        </>
    )
}

FormPenyandangDisabilitas.propTypes = {
    disabled: PropTypes.bool,
    showAlert: PropTypes.bool
};

FormPenyandangDisabilitas.defaultProps = {
    disabled: false,
    showAlert: true
};

export default FormPenyandangDisabilitas

