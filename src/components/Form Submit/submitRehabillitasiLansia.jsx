import { useState, useEffect } from 'react';
import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';
import api from '../api';
import Swal from 'sweetalert2';
// import InputFieldLog from '../Input Field/inputFieldLog';
import TextAreaLog from '../Input Field/textAreaLog';

function SubmitRehabilitasiLansia({ disabled = false }) {
    const [selectedData, setSelectedData] = useState({
        ktp: [],
        kk: [],
        kebutuhan: ''
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

    const handleFileChange = (name, value) => {
        setSelectedData(prevState => ({ ...prevState, [name]: value }));
        setErrors(prevState => ({ ...prevState, [name]: null })); 
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedData({ ...selectedData, [name]: value });
        setErrors(prevState => ({ ...prevState, [name]: null })); 
    };

    const validateInputs = () => {
        const newErrors = {};
        const requiredFields = ['ktp', 'kk', 'kebutuhan'];
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
            const fields = ['ktp', 'kk'];
            fields.forEach(field => {
                selectedData[field].forEach(file => {
                    formData.append(field, file);
                });
            });

            formData.append('kebutuhan', selectedData.kebutuhan);
            formData.append('user_nik', userNIK);
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };
    
            const response = await api.post('/upload-Rehabilitasi-Lansia', formData, config);
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
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    return (
        <>
            <InputFile
                id="ktp"
                name="ktp"
                label='KTP'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleFileChange('ktp', Array.from(e.target.files))}
                error={errors.ktp}
            />
            <InputFile
                id="kk"
                name="kk"
                label='Kartu Keluarga (KK)'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleFileChange('kk', Array.from(e.target.files))}
                error={errors.kk}
            />
            <TextAreaLog 
                label="Apa yang Dibutuhkan" 
                placeholder="Masukkan Kebutuhan" 
                name="kebutuhan" 
                value={selectedData.kebutuhan}
                onChange={handleInputChange} 
                error={errors.kebutuhan} 
                col='col-lg-6'
            />
            {!disabled && (
                <div className="mt-3 text-end">
                    <button className="btn btn-primary" style={{ fontSize: '.9rem' }} type="button" onClick={handleSubmit}>Kirim</button>
                </div>
            )}
        </>
    );
}

SubmitRehabilitasiLansia.propTypes = {
    disabled: PropTypes.bool
};

export default SubmitRehabilitasiLansia;