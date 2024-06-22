import { useState, useEffect } from 'react';
import InputFile from "../Input Field/inputFile";
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import TextAreaLog from "../Input Field/textAreaLog";
import axios from 'axios';
import api from '../api';

function SubmitPengaduan({ disabled }) {
    const [formData, setFormData] = useState({
        masalah: '',
        harapan: '',
        foto: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const handleSubmit = async () => {
        const form = new FormData();
        form.append('masalah', formData.masalah);
        form.append('harapan', formData.harapan);
        form.append('foto', formData.foto);

        console.log('Form data:', formData);

        try {
            const token = localStorage.getItem('token');
            const response = await api.post('/upload-Pengaduan', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });

            console.log('Response:', response);

            if (response.status === 201) {
                Swal.fire('Success', 'Data telah disimpan', 'success');
            } else {
                Swal.fire('Error', response.data.message || 'Kesalahan pada server', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
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
                onChange={handleInputChange}
            />
            <TextAreaLog
                label="Harapan"
                placeholder="Tulis Harapan"
                name="harapan"
                col='col-lg-6'
                onChange={handleInputChange}
            />
            <InputFile
                id="foto"
                name="foto"
                label='Upload foto/gambar'
                disabled={disabled}
                onChange={handleFileChange}
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
