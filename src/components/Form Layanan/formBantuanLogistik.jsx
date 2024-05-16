import AlertLayanan from "../../components/Alert/alertLayanan";
import InputFile from "../../components/Input Field/inputFile";
import InputNumber from "../../components/Input Field/inputNumber";
import PropTypes from 'prop-types';

function FormBantuanLogistik({ disabled, showAlert }) {
    return (
        <>
            <div className="row border rounded py-3 mx-1">
                <div className="mb-3">
                    <AlertLayanan showAlert={showAlert} />
                </div>
                <InputFile label='Surat Permohonan Bantuan Logistik' moreInfo='dari kelurahan' disabled={disabled} />
                <InputFile label='Dokumentasi Kejadian Bencana' disabled={disabled} />
                <InputNumber label='Jumlah Terdampak' placeholder="Masukkan jumlah" disabled={disabled} />
                {!disabled && (
                    <div className="mt-3">
                        <div className="btn btn-primary w-100">Kirim</div>
                    </div>
                )}
            </div>
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
