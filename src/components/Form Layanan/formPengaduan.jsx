import React, { useEffect, useState } from 'react';
import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';
import InputFieldLog from '../Input Field/inputFieldLog';
import { useNavigate, useParams } from 'react-router-dom';
import TextAreaLog from '../Input Field/textAreaLog';
import api from '../api';
import Swal from 'sweetalert2';

function FormPengaduan({ disabled }) {
    const { no_adu } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [fotoFile, setFotoFile] = useState(null);
    const [masalah, setMasalah] = useState('');
    const [harapan, setHarapan] = useState('');
    const [jawaban, setJawaban] = useState('');

    const layanan = 'pengaduan';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/lay-pengaduan/${no_adu}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Data pengajuan yang berhasil diambil:', response.data);
                setData(response.data);
                setMasalah(response.data.masalah || '');
                setHarapan(response.data.harapan || '');
                setJawaban(response.data.jawaban || '');
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized: Please log in first.');
                } else {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, [no_adu]);

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('masalah', masalah);
            formData.append('harapan', harapan);
            formData.append('jawaban', jawaban);
            if (fotoFile) {
                formData.append('foto', fotoFile);
            }

            console.log(formData);

            await api.put(`/update-pengaduan/${data.no_adu}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            Swal.fire("Berhasil diperbarui!", "", "success");
            // Lakukan navigasi atau refresh data jika diperlukan
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/delete-pengaduan/${data.no_adu}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(null);
            localStorage.removeItem('selectedPengajuan');
            Swal.fire("Berhasil dihapus!", "", "success");
            navigate('/pengaduan-DSPM');
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const calculateStatus = () => {
        if (data) {
            const { jawaban } = data;
            if (jawaban !== null) {
                return "Dijawab";
            } else {
                return "Belum Dijawab";
            }
        }
        return "Tidak Diketahui";
    };

    const showAlert = () => {
        Swal.fire({
            title: "Apakah Anda yakin untuk membatalkan pengajuan?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Iya",
            icon: 'question',
            confirmButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete();
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    const status = calculateStatus();

    return (
        <>
            {data && (
                <>
                    <InputFieldLog 
                        label='No. Pelayanan'
                        disabled
                        col='col-lg-6'
                        name='no_adu'
                        value={data.no_adu}
                    />
                    <InputFieldLog 
                        label='Tanggal Mengajukan'
                        disabled
                        col='col-lg-6'
                        name='submit_at'
                        value={formatDate(data.submit_at)}
                    />
                    <InputFieldLog 
                        label='Status'
                        disabled
                        col='col-lg-6'
                        value={status}
                    />
                    {(status === "Ditolak" || status === "Berkas Tidak Valid") && (
                        <TextAreaLog 
                            label='Alasan Ditolak'
                            disabled
                            name='reason'
                            value={data.reason}
                        />
                    )}
                    <h6 className='mt-4'>Data Berkas</h6>
                    <TextAreaLog
                        label="Permasalahan yang Diadukan"
                        placeholder="Tulis Permasalahan"
                        name="masalah"
                        col='col-lg-6'
                        value={masalah}
                        onChange={(e) => setMasalah(e.target.value)}
                        disabled={disabled || status !== "Belum Dijawab"}
                    />
                    <TextAreaLog
                        label="Harapan"
                        placeholder="Tulis Harapan"
                        name="harapan"
                        col='col-lg-6'
                        value={harapan}
                        onChange={(e) => setHarapan(e.target.value)}
                        disabled={disabled || status !== "Belum Dijawab"}
                    />
                    <InputFile
                        id="foto"
                        name="foto"
                        label='Upload foto/gambar'
                        disabled={disabled || status !== "Belum Dijawab"}
                        showDownloadButton={true}
                        filePath={data.id}
                        table={layanan}
                        onChange={(e) => setFotoFile(e.target.files[0])}
                    />
                    {status === "Dijawab" && (
                        <TextAreaLog
                            label="Jawaban"
                            placeholder="Jawaban"
                            name="jawaban"
                            col='col-lg-6'
                            value={jawaban}
                            onChange={(e) => setJawaban(e.target.value)}
                            disabled
                        />
                    )}
                    {!disabled && (
                        <div className="mt-3 text-end">
                            {status === "Belum Dijawab" && (
                                <>
                                    <button className="btn btn-danger me-2" style={{ fontSize: '.9rem' }} type="button" onClick={showAlert}>
                                        Batalkan Pengaduan
                                    </button>
                                    <button className="btn btn-primary" style={{ fontSize: '.9rem' }} type="button" onClick={handleUpdate}>
                                        Update Data
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
}

FormPengaduan.propTypes = {
    disabled: PropTypes.bool
};

FormPengaduan.defaultProps = {
    disabled: false
};

export default FormPengaduan;
