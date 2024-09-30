import { useState, useEffect } from 'react';
import InputFile from "../Input Field/inputFile";
import PropTypes from 'prop-types';
import api from '../api';
import Swal from 'sweetalert2';

function SubmitPUB({ disabled = false }) {
    const [selectedData, setSelectedData] = useState({
        ktp: [],
        suket_ormas: [],
        suket_lks: [],
        npwp: [],
        bukti_setor: [],
        rekening: [],
        surat_legal: [],
        surat_pernyataan_bermaterai: []
    });
    const [userNIK, setUserNIK] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.NIK) {
            setUserNIK(user.NIK);
        } else {
            console.error('User NIK not found in local storage');
        }
    }, []);

    const handleInputChange = (name, files) => {
        setSelectedData(prevState => ({ ...prevState, [name]: files }));
        setErrors(prevState => ({ ...prevState, [name]: null }));  // Clear error on input change
    };

    const validateInputs = () => {
        const newErrors = {};
        const requiredFields = ['ktp', 'suket_ormas', 'suket_lks', 'npwp', 'bukti_setor', 'rekening', 'surat_legal', 'surat_pernyataan_bermaterai'];
        for (const field of requiredFields) {
            if (selectedData[field].length === 0) newErrors[field] = `${field.toUpperCase()} is required`;
        }
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
            if (!token) {
                console.error('User token not found');
                // Show a message or redirect to the login page
                return;
            }
    
            const formData = new FormData();
            const fields = ['ktp', 'suket_ormas', 'suket_lks', 'npwp', 'bukti_setor', 'rekening', 'surat_legal', 'surat_pernyataan_bermaterai'];
            fields.forEach(field => {
                selectedData[field].forEach(file => {
                    formData.append(field, file);
                });
            });

            formData.append('user_nik', userNIK);
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };
    
            const response = await api.post('/upload-Pub', formData, config);
            console.log(response.data);

            // Show success alert
            Swal.fire({
                icon: "success",
                title: "Data Berhasil Diupload",
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: "OK",
                denyButtonText: `Don't save`,
                text: "Klik ok",
            })
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    return (
        <>
            <InputFile
                id="ktp"
                name="ktp"
                label='KTP Pemohon'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('ktp', Array.from(e.target.files))}
                error={errors.ktp}
            />
            <InputFile
                id="suket_ormas"
                name="suket_ormas"
                label='Surat Keterangan Terdaftar bagi Ormas'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('suket_ormas', Array.from(e.target.files))}
                error={errors.suket_ormas}
                moreInfo='dari Kementrian Hukum dan HAM'
            />
            <InputFile
                id="suket_lks"
                name="suket_lks"
                label='Surat Keterangan Terdaftar bagi LKS'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('suket_lks', Array.from(e.target.files))}
                error={errors.suket_lks}
                moreInfo='dari Dinas Sosial'
            />
            <InputFile
                id="npwp"
                name="npwp"
                label='NPWP Lembaga'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('npwp', Array.from(e.target.files))}
                error={errors.npwp}
            />
            <InputFile
                id="bukti_setor"
                name="bukti_setor"
                label='Bukti Setor/Sewa Tempat'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('bukti_setor', Array.from(e.target.files))}
                error={errors.bukti_setor}
            />
            <InputFile
                id="rekening"
                name="rekening"
                label='Nomor Rekening/Tempat Penampungan Dana'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('rekening', Array.from(e.target.files))}
                error={errors.rekening}
            />
            <InputFile
                id="surat_legal"
                name="surat_legal"
                label='Surat Keabsahan Legalitas '
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('surat_legal', Array.from(e.target.files))}
                error={errors.surat_legal}
                moreInfo='ditandatangani ketua'
            />
            <InputFile
                id="surat_pernyataan_bermaterai"
                name="surat_pernyataan_bermaterai"
                label='Surat Penyataan Bermaterai'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('surat_pernyataan_bermaterai', Array.from(e.target.files))}
                error={errors.surat_pernyataan_bermaterai}
                moreInfo='yang menyatakan PUB tidak disalurkan untuk kegiatan radikalisme, terorisme, dan kegiatan yang bertentang dengan hukum'
            />
            {!disabled && (
                <div className="mt-3 text-end">
                    <button className="btn btn-primary" style={{ fontSize: '.9rem' }} type="button" onClick={handleSubmit}>Kirim</button>
                </div>
            )}
        </>
    );
}

SubmitPUB.propTypes = {
    disabled: PropTypes.bool
};

export default SubmitPUB;