import { useState } from "react";
import InputFieldLog from "../../components/Input Field/inputFieldLog";
import InputFile from "../../components/Input Field/inputFile";
import TextAreaLog from "../../components/Input Field/textAreaLog";
import api from "../../components/api";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

function FormAdminPUB() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        NIK: "",
        namaLengkap: "",
        alamat: "",
        kecamatan: "",
        kelurahan: "",
        rt: "",
        email: "",
        noTelepon: "",
        jml_tedampak: "",
        alasan: "",
        produk_layanan: null,
        ktp: [],
        suket_ormas: [],
        suket_lks: [],
        npwp: [],
        bukti_setor: [],
        rekening: [],
        surat_legal: [],
        surat_pernyataan_bermaterai: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files });
    };

    const handleKirimNIK = async () => {
        try {
            const response = await api.get(`/getUserByNIK/${formData.NIK}`);
            const data = response.data;
            setFormData({
                ...formData,
                namaLengkap: data.full_name || "",
                alamat: data.alamat || "",
                kecamatan: data.kecamatan || "",
                kelurahan: data.kelurahan || "",
                rt: data.rt || "",
                email: data.email || "",
                noTelepon: data.no_telp || ""
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "NIK Tidak Ada",
            });
        }
    };

    const handleSubmit = async () => {
        // Validation checks
        if (!formData.NIK || formData.ktp.length === 0 || formData.suket_ormas.length === 0 || formData.suket_lks.length === 0 || formData.npwp === 0 || formData.bukti_setor === 0 || formData.rekening === 0 || formData.surat_legal === 0 || formData.surat_pernyataan_bermaterai === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Harap mengisi semua field yang diperlukan',
            });
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('NIK', formData.NIK);
        formDataToSend.append('ktp', formData.ktp[0]);
        formDataToSend.append('suket_ormas', formData.suket_ormas[0]);
        formDataToSend.append('suket_lks', formData.suket_lks[0]);
        formDataToSend.append('npwp', formData.suket_lks[0]);
        formDataToSend.append('bukti_setor', formData.bukti_setor[0]);
        formDataToSend.append('rekening', formData.rekening[0]);
        formDataToSend.append('surat_legal', formData.surat_legal[0]);
        formDataToSend.append('surat_pernyataan_bermaterai', formData.surat_pernyataan_bermaterai[0]);

        try {
            const token = localStorage.getItem('token');
            const response = await api.post('/admin-upload-PUB', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Data submitted successfully:", response.data);
            Swal.fire({
                title: "Good job!",
                text: "Data berhasil dikirim!",
                icon: "success"
            });
            navigate('/admin/layanan/pengumpulan-uang-dan-barang');
        } catch (error) {
            console.error("Error submitting form data:", error);
        }
    };

    return (
        <>
            <h6 className="mt-4">Data Pemohon</h6>
            <div className="col-lg-6 d-flex flex-column">
                <InputFieldLog 
                    label="NIK"
                    name="NIK"
                    placeholder="Masukkan NIK"
                    value={formData.NIK}
                    onChange={handleChange}
                />
                <div>
                    <div className="btn btn-primary" onClick={handleKirimNIK} style={{fontSize: '.9rem', marginTop: '-8px'}}>Pilih</div>
                </div>
            </div>
            <InputFieldLog 
                label="Nama Lengkap"
                name="namaLengkap"
                col="col-lg-6"
                placeholder="Nama Lengkap"
                value={formData.namaLengkap}
                onChange={handleChange}
                disabled
            />
            <TextAreaLog
                label="Alamat"
                name="alamat"
                col="col-lg-6"
                placeholder="Alamat"
                value={formData.alamat}
                onChange={handleChange}
                disabled
            />
            <InputFieldLog 
                label="Kecamatan"
                name="kecamatan"
                col="col-lg-6"
                placeholder="Kecamatan"
                value={formData.kecamatan}
                onChange={handleChange}
                disabled
            />
            <InputFieldLog 
                label="Kelurahan"
                name="kelurahan"
                col="col-lg-6"
                placeholder="Kelurahan"
                value={formData.kelurahan}
                onChange={handleChange}
                disabled
            />
            <InputFieldLog 
                label="RT"
                name="rt"
                col="col-lg-6"
                placeholder="RT"
                value={formData.rt}
                onChange={handleChange}
                disabled
            />
            <InputFieldLog 
                label="Email"
                name="email"
                col="col-lg-6"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                disabled
            />
            <InputFieldLog 
                label="No. Telepon"
                name="noTelepon"
                col="col-lg-6"
                placeholder="No. Telepon"
                value={formData.noTelepon}
                onChange={handleChange}
                disabled
            />
            <h6 className="mt-4">Berkas Pemohon</h6>
            <InputFile
                label="KTP"
                name="ktp"
                onChange={handleFileChange}
            />
            <InputFile
                label="Surat Keterangan Terdaftar bagi Ormas"
                name="suket_ormas"
                onChange={handleFileChange}
            />
            <InputFile
                label="Surat Keterangan Terdaftar bagi LKS"
                name="suket_lks"
                onChange={handleFileChange}
            />
            <InputFile
                label="NPWP Lembaga"
                name="npwp"
                onChange={handleFileChange}
            />
            <InputFile
                label="Bukti Setor/Sewa Tempat"
                name="bukti_setor"
                onChange={handleFileChange}
            />
            <InputFile
                label="Nomor Rekening/Tempat Penampungan Dana"
                name="rekening"
                onChange={handleFileChange}
            />
            <InputFile
                label="Surat Keabsahan Legalitas"
                name="surat_legal"
                onChange={handleFileChange}
            />
            <InputFile
                label="Surat Pernyataan Bermaterai"
                name="surat_pernyataan_bermaterai"
                onChange={handleFileChange}
            />
            <div className="text-end mt-3">
                <div className="btn btn-primary" onClick={handleSubmit} style={{fontSize: '.9rem'}}>Kirim</div>
            </div>
        </>
    );
}

export default FormAdminPUB;
