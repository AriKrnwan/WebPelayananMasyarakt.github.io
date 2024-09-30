import { useEffect, useState } from 'react';
import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';
import InputFieldLog from '../Input Field/inputFieldLog';
import { useNavigate } from 'react-router-dom';
import TextAreaLog from '../Input Field/textAreaLog';
import api from '../api';
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";

function FormRehabLansia({ disabled }) {
    const { nopel } = useParams();
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const [files, setFiles] = useState({
        ktp: [],
        kk: [],
    });
    const [kebutuhan, setKebutuhan] = useState('');
    const layanan = 'lay_rehab_lansia'

    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        setFiles(prevFiles => ({
            ...prevFiles,
            [name]: Array.from(selectedFiles)
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/lay-rehabilitasi-lansia/${nopel}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Data pengajuan yang berhasil diambil:', response.data);
                setData(response.data);
                setKebutuhan(response.data.kebutuhan || '');
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized: Please log in first.');
                } else {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, [nopel]);

    const handleUpdate = async () => {
        const hasFiles = Object.values(files).some(fileArray => fileArray.length > 0);
        const isFieldFilled = typeof kebutuhan === 'string' ? kebutuhan.trim() !== '' : kebutuhan !== '';
        
        if (!hasFiles && !isFieldFilled) {
            Swal.fire({
                title: 'Field tidak terisi',
                text: 'Masukkan Field untuk mengupdate',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        let formData = new FormData();
        Object.keys(files).forEach(fileType => {
            files[fileType].forEach(file => {
                formData.append(fileType, file);
            });
        });
        formData.append('kebutuhan', kebutuhan);
        formData.append('id', data.id);

        try {
            const token = localStorage.getItem('token');
            const response = await api.put(`/update-rehabilitasi-lansia/${data.no_lay}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Data validated successfully:', response.data);
    
            Swal.fire({
                title: "Berhasil mengupdate data",
                text: "Tekan ok",
                icon: "success"
            });
        } catch (error) {
            console.error('Error updating data:', error);
            alert('Terjadi kesalahan saat memperbarui data');
        }
    };
    

    const handleDownload = async () => {
        try {
            const downloadURL = `/download-file/${layanan}/${data.id}/product`;
            console.log('Download URL:', downloadURL);
    
            const response = await api.get(downloadURL);
    
            if (Array.isArray(response.data)) {
                // If response is an array of URLs, download each file
                for (let fileURL of response.data) {
                    const fileResponse = await api.get(fileURL, { responseType: 'blob' });
                    if (fileResponse.data instanceof Blob) {
                        const fileBlobUrl = window.URL.createObjectURL(fileResponse.data);
                        const downloadLink = document.createElement('a');
                        downloadLink.href = fileBlobUrl;
                        downloadLink.setAttribute('download', fileURL.split('/').pop());
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                    }
                }
            } else {
                console.error('Unexpected response data:', response.data);
            }
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/delete-rehabilitasi-lansia/${data.no_lay}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(null);
            localStorage.removeItem('selectedPengajuan');
            Swal.fire("Berhasil dihapus!", "", "success");
            navigate('/rehabilitasi-lansia');
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
            const { submit_at, valid_at, reject_at, accept_at } = data;
            if (submit_at && !valid_at && !reject_at && !accept_at) {
                return "Menunggu Validasi";
            } else if (submit_at && valid_at && !reject_at && !accept_at) {
                return "Berkas Diproses";
            } else if (submit_at && valid_at && reject_at && !accept_at) {
                return "Ditolak";
            } else if (submit_at && valid_at && !reject_at && accept_at) {
                return "Diterima";
            } else if (submit_at && !valid_at && reject_at && !accept_at) {
                return "Berkas Tidak Valid";
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
                        name='no_lay'
                        value={data.no_lay}
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
                    <InputFile
                        name="ktp"
                        label="KTP"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        id={data.id}
                        showDownloadButton={true}
                        moreInfo='KTP ahli waris'
                        onChange={handleFileChange}
                        table={layanan}
                    />
                    <InputFile
                        name="kk"
                        label="Kartu Keluarga (KK)"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        id={data.id}
                        showDownloadButton={true}
                        onChange={handleFileChange}
                        table={layanan}
                    />
                    <TextAreaLog
                        label="Apa yang Dibutuhkan"
                        placeholder="Masukkan Kebutuhan"
                        name="kebutuhan"
                        col='col-lg-6'
                        value={kebutuhan}
                        onChange={(e) => setKebutuhan(e.target.value)}
                        disabled={disabled || status !== "Menunggu Validasi"}
                    />
                    {!disabled && (
                        <div className="mt-3 text-end">
                            {status === "Menunggu Validasi" && (
                                <>
                                    <button className="btn btn-danger me-2" style={{ fontSize: '.9rem' }} type="button" onClick={showAlert}>
                                        Batalkan Pengajuan
                                    </button>
                                    <button className="btn btn-primary" style={{ fontSize: '.9rem' }} type="button" onClick={handleUpdate}>
                                        Update Data
                                    </button>
                                </>
                            )}
                            {status === "Diterima" && data.product && (
                                <button className="btn btn-success" style={{ fontSize: '.9rem' }} type="button" onClick={handleDownload}>
                                    Download Produk
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
}

FormRehabLansia.propTypes = {
    disabled: PropTypes.bool
};

FormRehabLansia.defaultProps = {
    disabled: false
};

export default FormRehabLansia;
