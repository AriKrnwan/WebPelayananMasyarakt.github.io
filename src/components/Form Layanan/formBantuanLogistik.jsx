import { useEffect, useState } from 'react';
import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';
import InputFieldLog from '../Input Field/inputFieldLog';
import { useNavigate } from 'react-router-dom';
import TextAreaLog from '../Input Field/textAreaLog';
import api from '../api';
import Swal from 'sweetalert2';
import InputNumber from '../Input Field/inputNumber';
import { useParams } from "react-router-dom";

function FormBantuanLogistik({ disabled }) {
    const { nopel } = useParams();
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const [ktpFile, setKtpFile] = useState(null);
    const [jmlTerdampak, setJmlTerdampak] = useState('');
    const [suratPermohonanFile, setSuratPermohonanFile] = useState(null);
    const [dokumentasiBencanaFile, setDokumentasiBencanaFile] = useState(null);
    const layanan = 'lay_bantuan_logistik'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/lay-bantuan-logistik/${nopel}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Data pengajuan yang berhasil diambil:', response.data);
                setData(response.data);
                setJmlTerdampak(response.data.jml_tedampak || '');
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
        let formData = new FormData();
        formData.append('jml_tedampak', jmlTerdampak);
        formData.append('id', data.id);
        if (ktpFile) formData.append('ktp', ktpFile);
        if (suratPermohonanFile) formData.append('surat_permohonan_bantuan_logistik', suratPermohonanFile);
        if (dokumentasiBencanaFile) formData.append('dokumentasi_bencana', dokumentasiBencanaFile);

        try {
            const token = localStorage.getItem('token');
            const response = await api.put(`/update-bantuan-logistik/${data.no_lay}`, formData, {
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
            const response = await api.get(`/download-file/${layanan}/${data.id}/product`, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            const fileName = 'files.zip';
            link.setAttribute('download', fileName);

            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/delete-bantuan-logistik/${data.no_lay}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(null);
            localStorage.removeItem('selectedPengajuan');
            Swal.fire("Berhasil dihapus!", "", "success");
            navigate('/bantuan-logistik');
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
                        id="ktp"
                        name="ktp"
                        label="KTP"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={data.id}
                        showDownloadButton={true}
                        moreInfo='KTP ahli waris'
                        onChange={(e) => setKtpFile(e.target.files[0])}
                        table={layanan}
                    />
                    <InputFile
                        id="surat_permohonan_bantuan_logistik"
                        name="surat_permohonan_bantuan_logistik"
                        label="Surat Permohonan Bantuan Logistik"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={data.id}
                        showDownloadButton={true}
                        onChange={(e) => setSuratPermohonanFile(e.target.files[0])}
                        table={layanan}
                    />
                    <InputFile
                        id="dokumentasi_bencana"
                        name="dokumentasi_bencana"
                        label="Akta Kematian"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={data.id}
                        showDownloadButton={true}
                        onChange={(e) => setDokumentasiBencanaFile(e.target.files[0])}
                        table={layanan}
                    />
                    <InputNumber
                        name="jml_tedampak"
                        placeholder="Masukkan jumlah"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        value={jmlTerdampak}
                        onChange={(name, value) => setJmlTerdampak(value)}
                        label="Jumlah Terdampak"
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

FormBantuanLogistik.propTypes = {
    disabled: PropTypes.bool
};

FormBantuanLogistik.defaultProps = {
    disabled: false
};

export default FormBantuanLogistik;
