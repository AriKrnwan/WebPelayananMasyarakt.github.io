import { useState, useEffect } from 'react';
import InputFile from "../Input Field/inputFile";
import PropTypes from 'prop-types';
import api from '../api';
import Swal from 'sweetalert2';

function SubmitPengangkatanAnak({ disabled = false }) {
    const [selectedData, setSelectedData] = useState({
        ktp: [],
        suket_fisik_jiwa: [],
        suket_narkoba: [],
        skck: [],
        suket_penghasilan: [],
        izin_tertulis: [],
        kk: [],
        akta_kelahiran: [],
        akta_nikah: [],
        foto: [],
        form_pernyataan: []
    });
    const [errors, setErrors] = useState({});
    const [userNIK, setUserNIK] = useState(null);

    const handleInputChange = (name, files) => {
        setSelectedData(prevState => ({ ...prevState, [name]: files }));
        setErrors(prevState => ({ ...prevState, [name]: null }));  // Clear error on input change
    };
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.NIK) {
            setUserNIK(user.NIK);
        } else {
            console.error('User NIK not found in local storage');
        }
    }, []);

    const validateInputs = () => {
        const newErrors = {};
        const requiredFields = ['ktp', 'suket_fisik_jiwa', 'suket_narkoba', 'skck', 'suket_penghasilan', 'izin_tertulis', 'kk', 'akta_kelahiran', 'akta_nikah', 'foto', 'form_pernyataan'];
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
            const fields = ['ktp', 'suket_fisik_jiwa', 'suket_narkoba', 'skck', 'suket_penghasilan', 'izin_tertulis', 'kk', 'akta_kelahiran', 'akta_nikah', 'foto', 'form_pernyataan'];
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
    
            const response = await api.post('/upload-Pengangkatan-Anak', formData, config);
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
                id="suket_fisik_jiwa"
                name="suket_fisik_jiwa"
                label='Surat Keterangan Fisik dan Kejiwaan'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('suket_fisik_jiwa', Array.from(e.target.files))}
                error={errors.suket_fisik_jiwa}
                moreInfo='Sehat Jasmani dan Rohani'
            />
            <InputFile
                id="suket_narkoba"
                name="suket_narkoba"
                label='Surat Keterangan Bebas Narkoba'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('suket_narkoba', Array.from(e.target.files))}
                error={errors.suket_narkoba}
            />
            <InputFile
                id="skck"
                name="skck"
                label='SKCK'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('skck', Array.from(e.target.files))}
                error={errors.skck}
                moreInfo='Berkelakuan Baik'
            />
            <InputFile
                id="suket_penghasilan"
                name="suket_penghasilan"
                label='Surat Keterangan Penghasilan'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('suket_penghasilan', Array.from(e.target.files))}
                error={errors.suket_penghasilan}
            />
            <InputFile
                id="izin_tertulis"
                name="izin_tertulis"
                label='Persetujuan atau Izin Tertulis'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('izin_tertulis', Array.from(e.target.files))}
                error={errors.izin_tertulis}
                moreInfo='dari Keluarga CAA'
            />
            <InputFile
                id="kk"
                name="kk"
                label='KK Calon Anak Angkat(CAA) '
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('kk', Array.from(e.target.files))}
                error={errors.kk}
                moreInfo='berisikan Nama, Alamat, dan Telepon'
            />
            <InputFile
                id="akta_kelahiran"
                name="akta_kelahiran"
                label='Akta Kelahiran CAA'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('akta_kelahiran', Array.from(e.target.files))}
                error={errors.akta_kelahiran}
                moreInfo='untuk pelaksanaan kegiatan'
            />
            <InputFile
                id="akta_nikah"
                name="akta_nikah"
                label='Akte Nikah'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('akta_nikah', Array.from(e.target.files))}
                error={errors.akta_nikah}
            />
            <InputFile
                id="foto"
                name="foto"
                label='Foto'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('foto', Array.from(e.target.files))}
                error={errors.foto}
                moreInfo='ukuran 4x6'
            />
            <InputFile
                id="form_pernyataan"
                name="form_pernyataan"
                label='Form Pernyataan'
                disabled={disabled}
                showDownloadButton={false}
                onChange={(e) => handleInputChange('form_pernyataan', Array.from(e.target.files))}
                error={errors.form_pernyataan}
                moreInfo='di atas materai 10.000 adanya laporan sosial dari pekerja sosial'
            />
            {!disabled && (
                <div className="mt-3 text-end">
                    <button className="btn btn-primary" style={{ fontSize: '.9rem' }} type="button" onClick={handleSubmit}>Kirim</button>
                </div>
            )}
        </>
    );
}

SubmitPengangkatanAnak.propTypes = {
    disabled: PropTypes.bool
};

export default SubmitPengangkatanAnak;