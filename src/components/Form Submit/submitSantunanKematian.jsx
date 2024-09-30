import { useState, useEffect } from 'react';
import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';
import api from '../api';
import Swal from 'sweetalert2';

function SubmitSantunanKematian({ disabled = false }) {
    const [selectedData, setSelectedData] = useState({
        ktp: [],
        surat_permohonan_santunan_kematian: [],
        akta_kematian: [],
        suket_ahli_waris: [],
        sktm: [],
        kk: [],
        rekening: []
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
        const requiredFields = ['ktp', 'surat_permohonan_santunan_kematian', 'akta_kematian', 'suket_ahli_waris', 'sktm', 'kk', 'rekening'];
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
            const fields = ['ktp', 'surat_permohonan_santunan_kematian', 'akta_kematian', 'suket_ahli_waris', 'sktm', 'kk', 'rekening'];
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
    
            const response = await api.post('/upload-Santunan-Kematian', formData, config);
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
                moreInfo='KTP ahli waris dan almarhum/almarhumah'
            />
            <InputFile
                id="surat_permohonan_santunan_kematian"
                name="surat_permohonan_santunan_kematian"
                label='Surat Permohonan Santunan Kematian'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('surat_permohonan_santunan_kematian', Array.from(e.target.files))}
                error={errors.surat_permohonan_santunan_kematian}
                moreInfo='yang dibuat oleh pemohon'
            />
            <InputFile
                id="akta_kematian"
                name="akta_kematian"
                label='Akta Kematian'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('akta_kematian', Array.from(e.target.files))}
                error={errors.akta_kematian}
                moreInfo='yang disahkan oleh Menteri Hukum dan HAM'
            />
            <InputFile
                id="suket_ahli_waris"
                name="suket_ahli_waris"
                label='Surat Keterangan Ahli Waris'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('suket_ahli_waris', Array.from(e.target.files))}
                error={errors.suket_ahli_waris}
                moreInfo='yang ditanda tangani ahli waris dengan materai Rp. 10.000,- serta diketahui oleh Lurah dan Ketua RT setempat (asli)'
            />
            <InputFile
                id="sktm"
                name="sktm"
                label='Surat Keterangan Tidak Mampu (SKTM)'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('sktm', Array.from(e.target.files))}
                error={errors.sktm}
                moreInfo='atas nama almarhum yang ditandatangani oleh lurah setempat'
            />
            <InputFile
                id="kk"
                name="kk"
                label='Kartu Keluarga (KK)'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('kk', Array.from(e.target.files))}
                error={errors.kk}
                moreInfo='KK ahli waris dan almarhum/almarhumah '
            />
            <InputFile
                id="rekening"
                name="rekening"
                label='Rekening'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('rekening', Array.from(e.target.files))}
                error={errors.rekening}
                moreInfo='atas nama ahli waris'
            />
            {!disabled && (
                <div className="mt-3 text-end">
                    <button className="btn btn-primary" style={{ fontSize: '.9rem' }} type="button" onClick={handleSubmit}>Kirim</button>
                </div>
            )}
        </>
    );
}

SubmitSantunanKematian.propTypes = {
    disabled: PropTypes.bool
};

export default SubmitSantunanKematian;