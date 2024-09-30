import { useState, useEffect } from 'react';
import InputFile from "../Input Field/inputFile";
import PropTypes from 'prop-types';
import api from '../api';
import Swal from 'sweetalert2';

function SubmitSIO({ disabled = false }) {
    const [selectedData, setSelectedData] = useState({
        ktp: [],
        surat_permohonan_pengajuan_lks: [],
        akta_notaris_pendirian: [],
        adart: [],
        struktur_organisasi: [],
        suket_domisili: [],
        biodata: [],
        proker: [],
        npwp: [],
        skt: []
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
        const requiredFields = ['ktp', 'surat_permohonan_pengajuan_lks', 'akta_notaris_pendirian', 'adart', 'struktur_organisasi', 'suket_domisili', 'biodata', 'proker', 'npwp', 'skt'];
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
            const fields = ['ktp', 'surat_permohonan_pengajuan_lks', 'akta_notaris_pendirian', 'adart', 'struktur_organisasi', 'suket_domisili', 'biodata', 'proker', 'npwp', 'skt'];
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
    
            const response = await api.post('/upload-Sio', formData, config);
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
                id="surat_permohonan_pengajuan_lks"
                name="surat_permohonan_pengajuan_lks"
                label='Surat Permohonan Pengajuan LKS'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('surat_permohonan_pengajuan_lks', Array.from(e.target.files))}
                error={errors.surat_permohonan_pengajuan_lks}
                moreInfo='Lembaga Kesejahteraan Sosial (LKS)'
            />
            <InputFile
                id="akta_notaris_pendirian"
                name="akta_notaris_pendirian"
                label='Akta Notaris Pendirian'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('akta_notaris_pendirian', Array.from(e.target.files))}
                error={errors.akta_notaris_pendirian}
                moreInfo='yang disahkan oleh Menteri Hukum dan HAM'
            />
            <InputFile
                id="adart"
                name="adart"
                label='Anggaran Dasar dan Anggaran Dasar Rumah Tangga'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('adart', Array.from(e.target.files))}
                error={errors.adart}
            />
            <InputFile
                id="struktur_organisasi"
                name="struktur_organisasi"
                label='Struktur Organisasi'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('struktur_organisasi', Array.from(e.target.files))}
                error={errors.struktur_organisasi}
            />
            <InputFile
                id="suket_domisili"
                name="suket_domisili"
                label='Surat Keterangan Domisili'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('suket_domisili', Array.from(e.target.files))}
                error={errors.suket_domisili}
                moreInfo='dari Kelurahan setempat'
            />
            <InputFile
                id="biodata"
                name="biodata"
                label='Biodata Pengurus dan Anggota'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('biodata', Array.from(e.target.files))}
                error={errors.biodata}
                moreInfo='berisikan Nama, Alamat, dan Telepon'
            />
            <InputFile
                id="proker"
                name="proker"
                label='Program Kerja'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('proker', Array.from(e.target.files))}
                error={errors.proker}
                moreInfo='untuk pelaksanaan kegiatan'
            />
            <InputFile
                id="npwp"
                name="npwp"
                label='NPWP Yayasan/Lembaga/Organisasi'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('npwp', Array.from(e.target.files))}
                error={errors.npwp}
            />
            <InputFile
                id="skt"
                name="skt"
                label='SKT'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('skt', Array.from(e.target.files))}
                error={errors.skt}
            />
            {!disabled && (
                <div className="mt-3 text-end">
                    <button className="btn btn-primary" style={{ fontSize: '.9rem' }} type="button" onClick={handleSubmit}>Kirim</button>
                </div>
            )}
        </>
    );
}

SubmitSIO.propTypes = {
    disabled: PropTypes.bool
};

export default SubmitSIO;