import { useState, useEffect } from 'react';
import InputFile from "../Input Field/inputFile";
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import TextAreaLog from "../Input Field/textAreaLog";
import api from '../api';

function SubmitPengaduan({ disabled }) {
    const [selectedData, setSelectedData] = useState({
        masalah: '',
        harapan: '',
        foto: [],
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

    const handleFileChange = (name, files) => {
        setSelectedData(prevState => ({ ...prevState, [name]: files }));
        setErrors(prevState => ({ ...prevState, [name]: null }));
    };

    const handleInputChange = (name, value) => {
        setSelectedData(prevState => ({ ...prevState, [name]: value }));
        setErrors(prevState => ({ ...prevState, [name]: null }));  
    };

    const validateInputs = () => {
        const newErrors = {};
        const requiredFields = ['masalah', 'harapan'];
        for (const field of requiredFields) {
            if (!selectedData[field] || selectedData[field].trim().length === 0) {
                newErrors[field] = 'Field tidak boleh kosong';
            }
        }
        setErrors(newErrors);
        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            return;
        }
    
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
    
            formData.append('masalah', selectedData.masalah);
            formData.append('harapan', selectedData.harapan);
            formData.append('user_nik', userNIK);
    
            if (selectedData.foto.length > 0) {
                selectedData.foto.forEach((file, index) => {
                    formData.append(`foto`, file);
                });
            }
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };
    
            const response = await api.post('/upload-Pengaduan', formData, config);
    
            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Data Berhasil Diupload',
                    confirmButtonText: 'OK',
                    text: 'Klik ok',
                });
            } else {
                Swal.fire('Error', response.data.message || 'Kesalahan pada server', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Kesalahan pada server', 'error');
        }
    };
    

    return (
        <>
            <TextAreaLog
                label="Permasalahan yang Diadukan"
                placeholder="Tulis Permasalahan"
                name="masalah"
                col='col-lg-6'
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                error={errors.masalah}
            />
            <TextAreaLog
                label="Harapan"
                placeholder="Tulis Harapan"
                name="harapan"
                col='col-lg-6'
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                error={errors.harapan}
            />
            <InputFile
                id="foto"
                name="foto"
                label='Upload foto/gambar'
                disabled={disabled}
                onChange={(e) => handleFileChange('foto', Array.from(e.target.files))}
            />
            {!disabled && (
                <div className="mt-3 text-end">
                    <button className="btn btn-primary" type="button" onClick={handleSubmit}>Kirim</button>
                </div>
            )}
        </>
    );
}

SubmitPengaduan.propTypes = {
    disabled: PropTypes.bool
};

export default SubmitPengaduan;
