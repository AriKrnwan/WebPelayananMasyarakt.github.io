import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';

function FormRumahSinggah({ disabled }) {
    return (
        <>
            <InputFile label='Surat Rujukan dari Instansi Terkait' disabled={disabled} />
            <InputFile label='Identitas PMKS/PPKS' moreInfo='Penyandang Masalah Kesejahteraan Sosial (PMKS)/Pemerlu PelayananKesejagteraan Sosial (PPKS)' disabled={disabled} />
            <InputFile label='Identitas Pelapor' disabled={disabled} />
            <div className="mt-3">
                <div className="btn btn-primary w-100">Kirim</div>
            </div>
        </>
    )
}

FormRumahSinggah.propTypes = {
    disabled: PropTypes.bool,
    showAlert: PropTypes.bool
};

FormRumahSinggah.defaultProps = {
    disabled: false,
    showAlert: true
};

export default FormRumahSinggah

