import { useEffect, useState } from 'react';
import InputFile from "../../components/Input Field/inputFile";
import PropTypes from 'prop-types';
import InputFieldLog from '../Input Field/inputFieldLog';
import { useNavigate } from 'react-router-dom';
import TextAreaLog from '../Input Field/textAreaLog';
import api from '../api';
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";

function FormPengangkatanAnak({ disabled }) {
    const { nopel } = useParams();
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const [ktpFile, setKtpFile] = useState(null);
    const [fisikFile, setFisikFile] = useState(null);
    const [narkobaFile, setNarkobaFile] = useState(null);
    const [skckFile, setSKCKFile] = useState(null);
    const [penghasilanFile, setPenghasilanFile] = useState(null);
    const [izinFile, setIzinFile] = useState(null);
    const [kkFile, setKKFile] = useState(null);
    const [aktaLahirFile, setAktaLahirFile] = useState(null);
    const [aktaNikahFile, setAktaNikahFile] = useState(null);
    const [fotoFile, setFotoFile] = useState(null);
    const [pernyataanFile, setPernyataanFile] = useState(null);
    const layanan = 'lay_angkat_anak'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/lay-pengangkatan-anak/${nopel}`, {
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
        if (fisikFile) formData.append('suket_fisik_jiwa', fisikFile);
        if (narkobaFile) formData.append('suket_narkoba', narkobaFile);
        if (skckFile) formData.append('skck', skckFile);
        if (penghasilanFile) formData.append('suket_penghasilan', penghasilanFile);
        if (izinFile) formData.append('izin_tertulis', izinFile);
        if (kkFile) formData.append('kk', kkFile);
        if (aktaLahirFile) formData.append('akta_kelahiran', aktaLahirFile);
        if (aktaNikahFile) formData.append('akta_nikah', aktaNikahFile);
        if (fotoFile) formData.append('foto', fotoFile);
        if (pernyataanFile) formData.append('form_pernyataan', setPernyataanFile);

        try {
            const token = localStorage.getItem('token');
            const response = await api.put(`/update-pengangkatan-anak/${data.no_lay}`, formData, {
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
            await api.delete(`/delete-pengangkatan-anak/${data.no_lay}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(null);
            localStorage.removeItem('selectedPengajuan');
            Swal.fire("Berhasil dihapus!", "", "success");
            navigate('/pengangkatan-anak');
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
                        id="suket_fisik_jiwa"
                        name="suket_fisik_jiwa"
                        label="Surat Keterangan Fisik dan Kejiwaan"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={data.id}
                        showDownloadButton={true}
                        onChange={(e) => setFisikFile(e.target.files[0])}
                        table={layanan}
                    />
                    <InputFile
                        id="suket_narkoba"
                        name="suket_narkoba"
                        label="Surat Keterangan Bebas Narkoba"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={data.id}
                        showDownloadButton={true}
                        onChange={(e) => setNarkobaFile(e.target.files[0])}
                        table={layanan}
                    />
                    <InputFile
                        id="skck"
                        name="skck"
                        label="SKCK"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={data.id}
                        showDownloadButton={true}
                        onChange={(e) => setSKCKFile(e.target.files[0])}
                        table={layanan}
                    />
                    <InputFile
                        id="suket_penghasilan"
                        name="suket_penghasilan"
                        label="Surat Keterangan Penghasilan"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={data.id}
                        showDownloadButton={true}
                        onChange={(e) => setPenghasilanFile(e.target.files[0])}
                        table={layanan}
                    />
                    <InputFile
                        id="izin_tertulis"
                        name="izin_tertulis"
                        label="Persetujuan atau Izin Tertulis"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={data.id}
                        showDownloadButton={true}
                        onChange={(e) => setIzinFile(e.target.files[0])}
                        table={layanan}
                    />
                    <InputFile
                        id="kk"
                        name="kk"
                        label="KK Calon Anak Angkat(CAA)"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={data.id}
                        showDownloadButton={true}
                        onChange={(e) => setKKFile(e.target.files[0])}
                        table={layanan}
                    />
                    <InputFile
                        id="akta_kelahiran"
                        name="akta_kelahiran"
                        label="Akta Kelahiran CAA"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={data.id}
                        showDownloadButton={true}
                        onChange={(e) => setAktaLahirFile(e.target.files[0])}
                        table={layanan}
                    />
                    <InputFile
                        id="akta_nikah"
                        name="akta_nikah"
                        label="Akta Nikah"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={data.id}
                        showDownloadButton={true}
                        onChange={(e) => setAktaNikahFile(e.target.files[0])}
                        table={layanan}
                    />
                    <InputFile
                        id="foto"
                        name="foto"
                        label="Foto"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={data.id}
                        showDownloadButton={true}
                        onChange={(e) => setFotoFile(e.target.files[0])}
                        table={layanan}
                    />
                    <InputFile
                        id="form_pernyataan"
                        name="form_pernyataan"
                        label="Form Pernyataan"
                        disabled={disabled || status !== "Menunggu Validasi"}
                        filePath={data.id}
                        showDownloadButton={true}
                        onChange={(e) => setPernyataanFile(e.target.files[0])}
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

FormPengangkatanAnak.propTypes = {
    disabled: PropTypes.bool
};

FormPengangkatanAnak.defaultProps = {
    disabled: false
};

export default FormPengangkatanAnak;
