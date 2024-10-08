import { useState, useEffect } from 'react';
import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';
import api from '../api';
import Swal from 'sweetalert2';

function SubmitRumahSinggah({ disabled = false }) {
    const [selectedData, setSelectedData] = useState({
        ktp: [],
        surat_rujukan: [],
        identitas_pmks: [],
        identitas_pelapor: [],
        berita_acara: [],
        surat_pernyataan: [],
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

    const handleInputChange = (name, files) => {
        setSelectedData(prevState => ({ ...prevState, [name]: files }));
        setErrors(prevState => ({ ...prevState, [name]: null }));  // Clear error on input change
    };

    const validateInputs = () => {
        const newErrors = {};
        const requiredFields = ['ktp', 'surat_rujukan', 'identitas_pmks', 'identitas_pelapor', 'berita_acara', 'surat_pernyataan', 'foto'];
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
            const fields = ['ktp', 'surat_rujukan', 'identitas_pmks', 'identitas_pelapor', 'berita_acara', 'surat_pernyataan', 'foto'];
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
    
            const response = await api.post('/upload-Rumah-Singgah', formData, config);
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
                id="surat_rujukan"
                name="surat_rujukan"
                label='Surat Rujukan'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('surat_rujukan', Array.from(e.target.files))}
                error={errors.surat_rujukan}
                moreInfo='dari instansi terkait/formulir serah terima dari masyarakat'
            />
            <InputFile
                id="identitas_pmks"
                name="identitas_pmks"
                label='Identitas PMKS/PPKS'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('identitas_pmks', Array.from(e.target.files))}
                error={errors.identitas_pmks}
                moreInfo='Penyandang Masalah Kesejahteraan Sosial (PMKS)/Pemerlu Pelayanan Kesejahteraan Sosial (PPKS)'
            />
            <InputFile
                id="identitas_pelapor"
                name="identitas_pelapor"
                label='Identitas Pelapor'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('identitas_pelapor', Array.from(e.target.files))}
                error={errors.identitas_pelapor	}
            />
            <InputFile
                id="berita_acara"
                name="berita_acara"
                label='Berita Acara Pemohon/Instansi'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('berita_acara', Array.from(e.target.files))}
                error={errors.berita_acara}
            />
            <InputFile
                name="surat_pernyataan"
                label='Surat Pernyataan'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('surat_pernyataan', Array.from(e.target.files))}
                error={errors.surat_pernyataan}
                showTemplateButton={true}
                id="1"
                table='template'
            />
            <InputFile
                id="foto"
                name="foto"
                label='Foto Kondisi Sekarang'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('foto', Array.from(e.target.files))}
                error={errors.foto}
                
            />
            {!disabled && (
                <div className="mt-3 text-end">
                    <button className="btn btn-primary" style={{ fontSize: '.9rem' }} type="button" onClick={handleSubmit}>Kirim</button>
                </div>
            )}
        </>
    );
}

SubmitRumahSinggah.propTypes = {
    disabled: PropTypes.bool
};

export default SubmitRumahSinggah;