import { useState } from 'react';
import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';
import api from '../api';

function SubmitSantunanKematian({ disabled = false }) {
    const [selectedData, setSelectedData] = useState({
        ktp: null,
        surat_permohonan_santunan_kematian: null,
        akta_kematian: null,
        suket_ahli_waris: null,
        sktm: null,
        kk: null,
        rekening: null
    });
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (name, value) => {
        setSelectedData(prevState => ({ ...prevState, [name]: value }));
        setErrors(prevState => ({ ...prevState, [name]: null }));  // Clear error on input change
    };

    const validateInputs = () => {
        const newErrors = {};
        if (!selectedData.ktp) newErrors.ktp = 'KTP is required';
        if (!selectedData.surat_permohonan_santunan_kematian) newErrors.surat_permohonan_santunan_kematian = 'Surat is required';
        if (!selectedData.akta_kematian) newErrors.akta_kematian = 'Akta Kematian is required';
        if (!selectedData.suket_ahli_waris) newErrors.suket_ahli_waris = 'Surat is required';
        if (!selectedData.sktm) newErrors.sktm = 'SKTM is required';
        if (!selectedData.kk) newErrors.kk = 'KK is required';
        if (!selectedData.rekening) newErrors.rekening = 'Rekening is required';
        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    
        try {
            const token = localStorage.getItem('token');
    
            // Check if token is obtained from local storage
            if (token) {
                console.log('User token found:', token);
            } else {
                console.error('User token not found');
                // Show a message or redirect to the login page
                return;
            }
    
            const formData = new FormData();
            formData.append('ktp', selectedData.ktp);
            formData.append('surat_permohonan_santunan_kematian', selectedData.surat_permohonan_santunan_kematian);
            formData.append('akta_kematian', selectedData.akta_kematian);
            formData.append('suket_ahli_waris', selectedData.suket_ahli_waris);
            formData.append('sktm', selectedData.sktm);
            formData.append('kk', selectedData.kk);
            formData.append('rekening', selectedData.rekening);
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };
    
            const response = await api.post('/upload-Santunan-Kematian', formData, config);
            console.log(response.data);
            setShowModal(true);
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false); // Tutup modal saat tombol "OK" ditekan
        window.location.reload(); // Refresh halaman
    };

    return (
        <>
            <InputFile
                id="ktp"
                name="ktp"
                label='KTP'
                disabled={disabled}
                showDownloadButton={true}
                onChange={(e) => handleInputChange('ktp', e.target.files[0])}
                error={errors.ktp}
                moreInfo='pppppp'
            />
            <InputFile
                id="surat_permohonan_santunan_kematian"
                name="surat_permohonan_santunan_kematian"
                label='Surat Permohonan Kematian'
                disabled={disabled}
                showDownloadButton={true}
                onChange={(e) => handleInputChange('surat_permohonan_santunan_kematian', e.target.files[0])}
                error={errors.surat_permohonan_santunan_kematian}
            />
            <InputFile
                id="akta_kematian"
                name="akta_kematian"
                label='Akta Kematian'
                disabled={disabled}
                showDownloadButton={true}
                onChange={(e) => handleInputChange('akta_kematian', e.target.files[0])}
                error={errors.akta_kematian}
            />
            <InputFile
                id="suket_ahli_waris"
                name="suket_ahli_waris"
                label='Surat Keterangan Ahli Waris'
                disabled={disabled}
                showDownloadButton={true}
                onChange={(e) => handleInputChange('suket_ahli_waris', e.target.files[0])}
                error={errors.suket_ahli_waris}
            />
            <InputFile
                id="sktm"
                name="sktm"
                label='SKTM'
                disabled={disabled}
                showDownloadButton={true}
                onChange={(e) => handleInputChange('sktm', e.target.files[0])}
                error={errors.sktm}
            />
            <InputFile
                id="kk"
                name="kk"
                label='Kartu Keluarga (KK)'
                disabled={disabled}
                showDownloadButton={true}
                onChange={(e) => handleInputChange('kk', e.target.files[0])}
                error={errors.kk}
            />
            <InputFile
                id="rekening"
                name="rekening"
                label='Rekening'
                disabled={disabled}
                showDownloadButton={true}
                onChange={(e) => handleInputChange('rekening', e.target.files[0])}
                error={errors.rekening}
            />
            {!disabled && (
                <div className="mt-3 text-end">
                    <button className="btn btn-primary" style={{ fontSize: '.9rem' }} type="button" onClick={handleSubmit}>Kirim</button>
                </div>
            )}
            {/* Modal */}
            {showModal && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Sukses!</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                Data telah berhasil diinputkan.
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleCloseModal}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

SubmitSantunanKematian.propTypes = {
    disabled: PropTypes.bool
};

export default SubmitSantunanKematian;