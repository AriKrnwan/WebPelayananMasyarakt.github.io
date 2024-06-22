import { useEffect, useState } from 'react';
import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';
import InputFieldLog from '../Input Field/inputFieldLog';
import { useNavigate } from 'react-router-dom';
import TextAreaLog from '../Input Field/textAreaLog';
import api from '../api';
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";

function FormSantunanKematian({ disabled }) {
    const { nopel } = useParams();
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const [ktpFile, setKtpFile] = useState(null);
    const [suratPermohonanFile, setSuratPermohonanFile] = useState(null);
    const [suketAktaFile, setAktaFile] = useState(null);
    const [ahliWarisFile, setAhliWarisFile] = useState(null);
    const [SKTMFile, setSKTMFile] = useState(null);
    const [KKFile, setKKFile] = useState(null);
    const [rekeningFile, setRekeningFile] = useState(null);
    const layanan = 'lay_santunan_kematian'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/lay-santunan-kematian/${nopel}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Data pengajuan yang berhasil diambil:', response.data);
                setData(response.data);
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
        formData.append('id', data.id);
        if (ktpFile) formData.append('ktp', ktpFile);
        if (suratPermohonanFile) formData.append('surat_permohonan_santunan_kematian', suratPermohonanFile);
        if (suketAktaFile) formData.append('akta_kematian', suketAktaFile);
        if (ahliWarisFile) formData.append('suket_ahli_waris', ahliWarisFile);
        if (SKTMFile) formData.append('sktm', SKTMFile);
        if (KKFile) formData.append('kk', KKFile);
        if (rekeningFile) formData.append('rekening', rekeningFile);

        try {
            const token = localStorage.getItem('token');
            const response = await api.put(`/update-santunan-kematian/${data.no_lay}`, formData, {
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
            await api.delete(`/delete-santunan-kematian/${data.no_lay}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(null);
            localStorage.removeItem('selectedPengajuan');
            Swal.fire("Berhasil dihapus!", "", "success");
            navigate('/santunan-kematian');
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
                        id="surat_permohonan_santunan_kematian"
                        name="surat_permohonan_santunan_kematian"
                        label="Surat Permohonan Santunan Kematian"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={data.id}
                        showDownloadButton={true}
                        onChange={(e) => setSuratPermohonanFile(e.target.files[0])}
                        table={layanan}
                    />
                    <InputFile
                        id="akta_kematian"
                        name="akta_kematian"
                        label="Akta Kematian"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={data.id}
                        showDownloadButton={true}
                        onChange={(e) => setAktaFile(e.target.files[0])}
                        table={layanan}
                    />
                    <InputFile
                        id="suket_ahli_waris"
                        name="suket_ahli_waris"
                        label="Surat Keterangan Ahli Waris"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={data.id}
                        showDownloadButton={true}
                        onChange={(e) => setAhliWarisFile(e.target.files[0])}
                        table={layanan}
                    />
                    <InputFile
                        id="sktm"
                        name="sktm"
                        label="SKTM"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={data.id}
                        showDownloadButton={true}
                        onChange={(e) => setSKTMFile(e.target.files[0])}
                        table={layanan}
                    />
                    <InputFile
                        id="kk"
                        name="kk"
                        label="Kartu Keluarga"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={data.id}
                        showDownloadButton={true}
                        onChange={(e) => setKKFile(e.target.files[0])}
                        table={layanan}
                    />
                    <InputFile
                        id="rekening"
                        name="rekening"
                        label="Rekening"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={data.id}
                        showDownloadButton={true}
                        onChange={(e) => setRekeningFile(e.target.files[0])}
                        table={layanan}
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

FormSantunanKematian.propTypes = {
    disabled: PropTypes.bool
};

FormSantunanKematian.defaultProps = {
    disabled: false
};

export default FormSantunanKematian;
