import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';

function FormSantunanKematian({ disabled }) {
    return (
        <>
            <InputFile label='Surat Permohonan Santunan Kematian' moreInfo='yang dibuat oleh pemohon' disabled={disabled} />
            <InputFile label='Surat Keterangan Ahli Waris' moreInfo='di tanda tangani oleh ahli waris dengan materai Rp. 10.000,-serta diketahui oleh Lurah dan Ketua RT setempat (asli) dan difotocopy serta dilegalisir oleh pihak kelurahan sebanyak 1lembar' disabled={disabled} />
            <InputFile label='Surat Keterangan Tidak Mampu (SKTM)' moreInfo='atas nama almarhum yang ditanda tangani oleh oleh lurahsetempat dan difotocopy 1 lembar' disabled={disabled} />
            <InputFile label='Foto Copy Akta Kematian' disabled={disabled} />
            <InputFile label='Foto Copy Kartu Keluarga (KK)' moreInfo='KK ahli waris dan almarhum/almarhumah' disabled={disabled} />
            <InputFile label='Foto Copy KTP' moreInfo='KTP ahli waris dan almarhum/almarhumah' disabled={disabled} />
            <InputFile label='Foto Copy Rekening' moreInfo='atas nama ahli waris' disabled={disabled} />
            <div className="mt-3">
                <div className="btn btn-primary w-100">Kirim</div>
            </div>
        </>
    )
}

FormSantunanKematian.propTypes = {
    disabled: PropTypes.bool,
    showAlert: PropTypes.bool
};

FormSantunanKematian.defaultProps = {
    disabled: false,
    showAlert: true
};

export default FormSantunanKematian