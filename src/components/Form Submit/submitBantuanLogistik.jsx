import { useState, useEffect } from 'react';
import InputFile from "../../components/Input Field/inputFile";
// import PropTypes from 'prop-types';
import api from '../api';
import Swal from 'sweetalert2';
import InputNumber from '../Input Field/inputNumber';

function SubmitBantuanLogistik() {
    const [selectedData, setSelectedData] = useState({
        ktp: [],
        surat_permohonan_bantuan_logistik: [],
        dokumentasi_bencana: [],
        jml_tedampak: ''
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
        const requiredFields = ['ktp', 'surat_permohonan_bantuan_logistik', 'dokumentasi_bencana', 'jml_tedampak'];
        for (const field of requiredFields) {
            if (!selectedData[field] || selectedData[field].length === 0) {
                newErrors[field] = 'Field tidak boleh kosong';
            }
        }
        setErrors(newErrors); // Update state errors with newErrors
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
            if (!token) {
                console.error('User token not found');
                return;
            }
    
            const formData = new FormData();
            const fields = ['ktp', 'surat_permohonan_bantuan_logistik', 'dokumentasi_bencana'];
            fields.forEach(field => {
                selectedData[field].forEach(file => {
                    formData.append(field, file);
                });
            });

            // Append the jumlah terdampak
            formData.append('jml_tedampak', selectedData.jml_tedampak);

            // Append the user NIK
            if (userNIK) {
                formData.append('user_nik', userNIK);
            } else {
                console.error('User NIK not found');
                return;
            }
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };
    
            const response = await api.post('/upload-Bantuan-Logistik', formData, config);
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
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
        }
    };

    return (
        <>
            <InputFile
                id="ktp"
                name="ktp"
                label='KTP Pemohon'
                showDownloadButton={false}
                onChange={(e) => handleFileChange('ktp', Array.from(e.target.files))}
                error={errors.ktp} // Pastikan errors.ktp di sini sesuai dengan validasi
            />
            <InputFile
                id="surat_permohonan_bantuan_logistik"
                name="surat_permohonan_bantuan_logistik"
                label='Surat Permohonan Bantuan Logistik'
                showDownloadButton={false}
                onChange={(e) => handleFileChange('surat_permohonan_bantuan_logistik', Array.from(e.target.files))}
                error={errors.surat_permohonan_bantuan_logistik} // Pastikan errors.surat_permohonan_bantuan_logistik di sini sesuai dengan validasi
            />
            <InputFile
                id="dokumentasi_bencana"
                name="dokumentasi_bencana"
                label='Dokumentasi Bencana'
                showDownloadButton={false}
                onChange={(e) => handleFileChange('dokumentasi_bencana', Array.from(e.target.files))}
                error={errors.dokumentasi_bencana} // Pastikan errors.dokumentasi_bencana di sini sesuai dengan validasi
            />
            <InputNumber
                label='Jumlah Terdampak'
                name="jml_tedampak"
                placeholder="Masukkan jumlah"
                value={selectedData.jml_tedampak}
                onChange={handleInputChange} 
                error={errors.jml_tedampak}
            />
            {/* {!disabled && ( */}
                <div className="mt-3 text-end">
                    <button className="btn btn-primary" style={{ fontSize: '.9rem' }} type="button" onClick={handleSubmit}>Kirim</button>
                </div>
            {/* )} */}
        </>
    );
}

// SubmitBantuanLogistik.propTypes = {
//     disabled: PropTypes.bool
// };

export default SubmitBantuanLogistik;
