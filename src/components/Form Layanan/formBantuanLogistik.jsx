import InputFile from "../../components/Input Field/inputFile";
import InputNumber from "../../components/Input Field/inputNumber";
import PropTypes from 'prop-types';

function FormBantuanLogistik({ disabled }) {
    return (
        <>
            <InputFile label='Surat Permohonan Bantuan Logistik' moreInfo='dari kelurahan' disabled={disabled} />
            <InputFile label='Dokumentasi Kejadian Bencana' disabled={disabled} />
            <InputNumber label='Jumlah Terdampak' placeholder="Masukkan jumlah" disabled={disabled} />
            {!disabled && (
                <div className="mt-3">
                    <div className="btn btn-primary w-100">Kirim</div>
                </div>
            )}
        </>
    );
}

FormBantuanLogistik.propTypes = {
    disabled: PropTypes.bool,
    showAlert: PropTypes.bool
};

FormBantuanLogistik.defaultProps = {
    disabled: false,
    showAlert: true
};

export default FormBantuanLogistik;
