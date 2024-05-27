import { useEffect, useState } from 'react';
import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';
import InputFieldLog from '../Input Field/inputFieldLog';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import TextAreaLog from '../Input Field/textAreaLog';
import AlertLogErr from '../Alert/alertLogErr';
import apiConfig from '../../config/config';
import api from '../api';

function FormSantunanKematian({ disabled }) {
    const [selectedData, setSelectedData] = useState(null);
    const [ktpFile, setKtpFile] = useState(null);
    const [suratFile, setSuratFile] = useState(null);
    const [aktaFile, setAktaFile] = useState(null);
    const [suketFile, setSuketFile] = useState(null);
    const [sktmFile, setSKTMFile] = useState(null);
    const [kkFile, setKKFile] = useState(null);
    const [rekeningFile, setRekeningFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    // State untuk alert
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('success');

    useEffect(() => {
        const storedData = localStorage.getItem('selectedPengajuan');
        if (storedData) {
            setSelectedData(JSON.parse(storedData));
        }
    }, []);

    const downloadFile = (filePath) => {
        window.open(`${apiConfig.baseURL}/download-file?path=${filePath}`);
    };

    const downloadProduct = () => {
        if (selectedData && selectedData.product) {
            window.open(`${apiConfig.baseURL}/download-file?path=${selectedData.product}`);
        } else {
            alert('File produk tidak tersedia.');
        }
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target; 
    //     setSelectedData({
    //         ...selectedData,
    //         [name]: value
    //     });
    // };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === "ktp") setKtpFile(files[0]);
        if (name === "surat_permohonan_santunan_kematian") setSuratFile(files[0]);
        if (name === "akta_kematian") setAktaFile(files[0]);
        if (name === "suket_ahli_waris") setSuketFile(files[0]);
        if (name === "sktm") setSKTMFile(files[0]);
        if (name === "kk") setKKFile(files[0]);
        if (name === "rekening") setRekeningFile(files[0]);
    };

    const handleSubmit = async () => {
        if (!selectedData || !selectedData.no_lay) {
            alert('Data tidak valid');
            return;
        }

        const formData = new FormData();
        if (ktpFile) formData.append('ktp', ktpFile);
        if (suratFile) formData.append('surat_permohonan_santunan_kematian', suratFile);
        if (aktaFile) formData.append('akta_kematian', aktaFile);
        if (suketFile) formData.append('suket_ahli_waris', suketFile);
        if (sktmFile) formData.append('sktm', sktmFile);
        if (kkFile) formData.append('kk', kkFile);
        if (rekeningFile) formData.append('rekening', rekeningFile);
        formData.append('no_lay', selectedData.no_lay);
        formData.append('submit_at', selectedData.submit_at);
        formData.append('valid_at', selectedData.valid_at);
        formData.append('reject_at', selectedData.reject_at);
        formData.append('accept_at', selectedData.accept_at);
        formData.append('reason', selectedData.reason);
        formData.append('product', selectedData.product);

        try {
            const token = localStorage.getItem('token');
            const response = await api.put(`/update-Santunan-Kematian/${selectedData.no_lay}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            // Update state with the new data
            const updatedData = { ...selectedData, ...response.data };
            setSelectedData(updatedData);
            localStorage.setItem('selectedPengajuan', JSON.stringify(updatedData)); // Simpan data terbaru ke localStorage

            // Tampilkan alert sukses
            setAlertMessage('Data berhasil diperbarui');
            setAlertVariant('success');
            setShowAlert(true);
        } catch (error) {
            console.error('Error updating data:', error);
            // Tampilkan alert error
            setAlertMessage('Terjadi kesalahan saat memperbarui data');
            setAlertVariant('danger');
            setShowAlert(true);
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/delete-santunan-kematian/${selectedData.no_lay}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSelectedData(null);
            localStorage.removeItem('selectedPengajuan');
            setShowModal(false);
            navigate('/santunan-kematian');
        } catch (error) {
            console.error('Error deleting data:', error);
            alert('Terjadi kesalahan saat menghapus data');
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
        if (selectedData) {
            const { submit_at, valid_at, reject_at, accept_at } = selectedData;
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

    const status = calculateStatus();

    return (
        <>
            <div className="mb-3">
                <AlertLogErr desc={alertMessage} variant={alertVariant} showAlert={showAlert} setShowAlert={setShowAlert} />
            </div>
            {selectedData && (
                <>
                    <InputFieldLog 
                        label='No. Pelayanan'
                        disabled
                        col='col-lg-6'
                        name='no_lay'
                        value={selectedData.no_lay}
                    />
                    <InputFieldLog 
                        label='Tanggal'
                        disabled
                        col='col-lg-6'
                        name='submit_at'
                        value={formatDate(selectedData.submit_at)}
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
                            value={selectedData.reason}
                        />
                    )}
                    <h6 className='mt-4'>Data Berkas</h6>
                    <InputFile
                        id="ktp"
                        name="ktp"
                        label="KTP"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={selectedData.ktp}
                        onDownload={downloadFile}
                        onChange={handleFileChange}
                        showDownloadButton={true}
                        moreInfo='KTP ahli waris'
                    />
                    <InputFile
                        id="surat_permohonan_santunan_kematian"
                        name="surat_permohonan_santunan_kematian"
                        label="Surat Permohonan Santunan Kematian"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={selectedData.surat_permohonan_santunan_kematian}
                        onDownload={downloadFile}
                        onChange={handleFileChange}
                        showDownloadButton={true}
                    />
                    <InputFile
                        id="akta_kematian"
                        name="akta_kematian"
                        label="Akta Kematian"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={selectedData.akta_kematian}
                        onDownload={downloadFile}
                        onChange={handleFileChange}
                        showDownloadButton={true}
                    />
                    <InputFile
                        id="suket_ahli_waris"
                        name="suket_ahli_waris"
                        label="Surat Keterangan Ahli Waris"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={selectedData.suket_ahli_waris}
                        onDownload={downloadFile}
                        onChange={handleFileChange}
                        showDownloadButton={true}
                    />
                    <InputFile
                        id="sktm"
                        name="sktm"
                        label="SKTM"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={selectedData.sktm}
                        onDownload={downloadFile}
                        onChange={handleFileChange}
                        showDownloadButton={true}
                    />
                    <InputFile
                        id="kk"
                        name="kk"
                        label="Kartu Keluarga (KK)"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={selectedData.kk}
                        onDownload={downloadFile}
                        onChange={handleFileChange}
                        showDownloadButton={true}
                    />
                    <InputFile
                        id="rekening"
                        name="rekening"
                        label="Rekening"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={selectedData.rekening}
                        onDownload={downloadFile}
                        onChange={handleFileChange}
                        showDownloadButton={true}
                    />
                    {!disabled && (
                        <div className="mt-3 text-end">
                            {status === "Menunggu Validasi" && (
                                <>
                                    <button className="btn btn-danger me-2" style={{ fontSize: '.9rem' }} type="button" onClick={() => setShowModal(true)}>
                                        Batalkan Pengajuan
                                    </button>
                                    <button className="btn btn-primary" style={{ fontSize: '.9rem' }} type="button" onClick={handleSubmit}>
                                        Update Data
                                    </button>
                                </>
                            )}
                            {status === "Diterima" && selectedData.product && (
                                <button className="btn btn-success" style={{ fontSize: '.9rem' }} type="button" onClick={downloadProduct}>
                                    Download Produk
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Konfirmasi Penghapusan</Modal.Title>
                </Modal.Header>
                <Modal.Body>Apakah Anda yakin ingin membatalkan pengajuan ini?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Batal
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Batalkan Pengajuan
                    </Button>
                </Modal.Footer>
            </Modal>
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
