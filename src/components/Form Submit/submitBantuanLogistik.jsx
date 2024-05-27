import { useState } from 'react';
import InputFile from "../../components/Input Field/inputFile";
import InputNumber from "../../components/Input Field/inputNumber";
import PropTypes from 'prop-types';
import AlertLogErr from '../Alert/alertLogErr';
import api from '../api';

function SubmitBantuanLogistik({ disabled = false }) {
    const [selectedData, setSelectedData] = useState({
        ktp: null,
        surat_permohonan_bantuan_logistik: null,
        dokumentasi_bencana: null,
        jml_tedampak: ''
    });
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [noLay, setNoLay] = useState('');

    const handleInputChange = (name, value) => {
        setSelectedData(prevState => ({ ...prevState, [name]: value }));
        setErrors(prevState => ({ ...prevState, [name]: null }));  // Clear error on input change
    };

    const validateInputs = () => {
        const newErrors = {};
        if (!selectedData.ktp) newErrors.ktp = 'KTP is required';
        if (!selectedData.surat_permohonan_bantuan_logistik) newErrors.surat_permohonan_bantuan_logistik = 'Surat is required';
        if (!selectedData.dokumentasi_bencana) newErrors.dokumentasi_bencana = 'Dokumentasi is required';
        if (!selectedData.jml_tedampak) newErrors.jml_tedampak = 'Jumlah Terdampak is required';
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
            formData.append('surat_permohonan_bantuan_logistik', selectedData.surat_permohonan_bantuan_logistik);
            formData.append('dokumentasi_bencana', selectedData.dokumentasi_bencana);
            formData.append('jml_tedampak', selectedData.jml_tedampak);
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };
    
            const response = await api.post('/upload-Bantuan-Logistik', formData, config);
            console.log(response.data);
            setShowAlert(true);
            setNoLay(response.data.no_lay);
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    return (
        <>
            <div className="col-lg-12">
                <AlertLogErr
                    desc={`Berkas berhasil diupload. No. Lay: ${noLay}`}
                    variant='success'
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                />
            </div>
            <InputFile
                id="ktp"
                name="ktp"
                label='KTP'
                disabled={disabled}
                showDownloadButton={true}
                onChange={(e) => handleInputChange('ktp', e.target.files[0])}
                error={errors.ktp}
            />
            <InputFile
                id="surat"
                name="surat_permohonan_bantuan_logistik"
                label='Surat Permohonan Bantuan Logistik'
                disabled={disabled}
                showDownloadButton={true}
                onChange={(e) => handleInputChange('surat_permohonan_bantuan_logistik', e.target.files[0])}
                error={errors.surat_permohonan_bantuan_logistik}
            />
            <InputFile
                id="dokumentasi"
                name="dokumentasi_bencana"
                label='Dokumentasi Kejadian Bencana'
                disabled={disabled}
                showDownloadButton={true}
                onChange={(e) => handleInputChange('dokumentasi_bencana', e.target.files[0])}
                error={errors.dokumentasi_bencana}
            />
            <InputNumber
                label='Jumlah Terdampak'
                name="jml_tedampak"
                placeholder="Masukkan jumlah"
                disabled={disabled}
                value={selectedData.jml_tedampak}
                onChange={handleInputChange}
                error={errors.jml_tedampak}
            />
            {!disabled && (
                <div className="mt-3 text-end">
                    <button className="btn btn-primary" style={{ fontSize: '.9rem' }} type="button" onClick={handleSubmit}>Kirim</button>
                </div>
            )}
        </>
    );
}

SubmitBantuanLogistik.propTypes = {
    disabled: PropTypes.bool
};

export default SubmitBantuanLogistik;
